import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { FormEvent, useState } from "react";

import moment from "moment";

import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { Button } from '../../../components/button/Button';
import { useEvent } from '../../../hooks/useEvent';
import { useGetRecurso } from '../../../hooks/recursos/useGetRecurso';


type EventParms = {
    id: string;
}


export function EditarRecurso(){

    const params = useParams<EventParms>();
    const recursoID = params.id;

    const { user } = useAuth()
    const { recurso } = useGetRecurso(recursoID || "");

    const navigate = useNavigate(); //use to navigate to other pages

    const [ titulo, setTitulo ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ tipo, setTipo ] = useState('');
    const [ dateS, setDateS ] = useState<string>(moment().format("YYYY-MM-DD"));
    const [ dateE, setDateE ] = useState<string>(moment().format("YYYY-MM-DD"));
    const [ descricao, setDescricao ] = useState('');
    const [ estado, setEstado ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ bairro, setBairro ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ online, setOnline] = useState(false);
    const [ presencial, setPresencial] = useState(false);
    const [ link, setLink] = useState('');

    const [ chanTi, setChanTi ] = useState(false);
    const [ chanCat, setChanCat ] = useState(false);
    const [ chanTip, setChanTip ] = useState(false);
    const [ chanDS, setChanDS ] = useState(false);
    const [ chanDe, setChanDE ] = useState(false);
    const [ chanDesc, setChanDesc ] = useState(false);
    const [ chanEst, setChanEst ] = useState(false);
    const [ chanCi, setChanCi ] = useState(false);
    const [ chanBai, setChanBai ] = useState(false);
    const [ chanRua, setChanRua ] = useState(false);
    const [ chanOn, setChanOn] = useState(false);
    const [ chanPre, setChanPre] = useState(false);
    const [ chanLin, setChanLin] = useState(false);


    async function handleChangeTi() {
        setChanTi(true)
    }
    async function handleChangeCat() {
        setChanCat(true)
    }
    async function handleChangeTip() {
        setChanTip(true)
    }
    async function handleChangeDS() {
        setChanDS(true)
    }
    async function handleChangeDE() {
        setChanDE(true)
    }
    async function handleChangeDesc() {
        setChanDesc(true)
    }
    async function handleChangeEst() {
        setChanEst(true)
    }
    async function handleChangeCi() {
        setChanCi(true)
    }
    async function handleChangeBai() {
        setChanBai(true)
    }
    async function handleChangeRua() {
        setChanRua(true)
    }
    async function handleChangeOn() {
        setChanOn(true)
    }
    async function handleChangePre() {
        setChanPre(true)
    }
    async function handleChangeLin() {
        setChanLin(true)
    }



    async function handleCreateEvent(event: FormEvent) {
        event.preventDefault()

        if(user?.id !== recurso?.author.authorId){
            alert("Você deve estar logado como criador do recurso para altera-lo")
            return;
        }
        if(recurso === undefined ||  recurso === undefined){
            let alert = window.confirm("Recurso informado inexistente.")
            if(alert){
                navigate('/home')
                return;
            }else{
                return;
            }
        }

        if(moment(dateS).isAfter(dateE)){ 
            alert("Data inicial deve ser menor que a final.")
        }else if(descricao.length < 15 && recurso?.descricao.length < 15){
            alert("Descrição deve conter mais de 15 caracteres.");
        }else if(!user){
            alert("Você deve estar logado para executar a tarefa.");
        }else{

            const eventRef = database.ref(`recursos/`); //refering 'recurso' in DB.

            if(recursoID === undefined){
                alert("Erro ao atualizar, ID invalido")
                return;
            }
            const firebaseEvent = await eventRef.child(recursoID).set({
                author: {
                    authorId: user?.id,
                    authorName: user.name,
                    authorAvatar: user.avatar 
                },
                title: chanTi ? titulo : recurso?.titulo,
                category: chanCat ? categoria : recurso?.categoria ,
                type: chanTip ? tipo : recurso?.tipo ,
                startDate: chanDS ? dateS : recurso?.dateS ,
                endDate: chanDe ? dateE : recurso?.dateE ,
                description: chanDesc ? descricao : recurso?.descricao ,
                canceled: false,
                online: chanOn ? online : recurso?.online ,
                presencial: chanPre ? presencial : recurso?.presencial ,
                state: chanEst ? estado : recurso?.estado ,
                city: chanCi ? cidade : recurso?.cidade ,
                district: chanBai ? bairro : recurso?.bairro ,
                street: chanRua ? rua : recurso?.rua ,
                url: chanLin ? link : recurso?.url 
            });

            navigate(`/Recurso/${recursoID}`)
        }   
    }


    
    return(
        <div>
            <NavBar/>
                <div className="m-5 d-flex flex-column">
                            <form onSubmit={handleCreateEvent}>
                                <label className="form-label">Título do Recurso</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o título do recurso..."
                                        onChange={event => {setTitulo(event.target.value); handleChangeTi()}}
                                        value={titulo || chanTi ? titulo : recurso?.titulo }/>
                                
                                <label className="form-label mt-4">Categoria</label>
                                    <select 
                                        required
                                        className="form-select"
                                        onChange={event => {setTipo(event.target.value); handleChangeTip()}}
                                        value={tipo || chanCat ? tipo : recurso?.tipo}>
                                        <option value="">Selecione...</option>
                                        <option value="Disponibilizo">Disponibilizo</option>
                                        <option value="Procuro">Procuro</option>
                                    </select>

                                <label className="form-label mt-4">Categoria</label>
                                    <select 
                                        required
                                        className="form-select"
                                        onChange={event => {setCategoria(event.target.value); handleChangeCat()}}
                                        value={categoria || chanCat ? categoria : recurso?.categoria}>
                                        <option value="">Selecione...</option>
                                        <option value="Alimentos">Alimentos</option>
                                        <option value="Mão de Obra">Mão de Obra</option>
                                        <option value="Monetário">Monetário</option>
                                        <option value="Roupas">Roupas</option>
                                        <option value="Tempo">Tempo</option>
                                    </select>

                                <label className="form-label mt-4">Selecione Data e Horário de Início</label>

                                    <input 
                                        required
                                        type="datetime-local" 
                                        className="form-control"
                                        onChange={event => {setDateS(event.target.value); handleChangeDS()}}
                                        value={dateS || chanDS ? dateS : recurso?.dateS}/>

                                <label className="form-label mt-4">Selecione Data e Horário do Final</label>

                                    <input 
                                        required
                                        type="datetime-local" 
                                        className="form-control"
                                        onChange={event => {setDateE(event.target.value); handleChangeDE()}}
                                        value={dateE || chanDe ? dateE : recurso?.dateE}/>

                                
                                <label className="form-label mt-4">Localização</label>
                               {/** <div className="opacity-50"><p>Permita localização para auto preenchimento</p></div>*/} 
                                <br />
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => {setOnline(event.target.checked); handleChangeOn()}}
                                        checked={online || chanOn ? online : recurso?.online}/>
                                    <label className="form-label m-1">Online</label> <br />
                                    
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => {setPresencial(event.target.checked); handleChangePre()}}
                                        checked={presencial || chanPre ? presencial : recurso?.presencial}/>
                                    <label className="form-label m-1">Presencial</label> <br />
                                    
                                {presencial === true ?
                                (
                                    <div>
                                        <label className="form-label mt-4">Estado</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setEstado(event.target.value); handleChangeEst()}}
                                                value={estado || chanEst ? estado : recurso?.estado}/>

                                        <label className="form-label mt-4">Cidade</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setCidade(event.target.value); handleChangeCi()}}
                                                value={cidade || chanCi ? cidade : recurso?.cidade}/>

                                        <label className="form-label mt-4">Bairro</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setBairro(event.target.value); handleChangeBai()}}
                                                value={bairro || chanBai ? bairro : recurso?.bairro}/>

                                        <label className="form-label mt-4">Rua</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setRua(event.target.value); handleChangeRua()}}
                                                value={rua || chanRua ? rua : recurso?.rua}/>
                                    </div>
                                ):(
                                    <div></div>
                                )}

                                {online === true ?
                                (
                                    <div>
                                        <label className="form-label mt-4">Link</label>
                                        <input 
                                                type="url" 
                                                placeholder="https://exemplo.com.br"
                                                className="form-control"
                                                onChange={event => {setLink(event.target.value); handleChangeLin()}}
                                                value={link || chanLin ? link : recurso?.url}/>
                                    </div>
                                ):(
                                    <div></div>
                                )}
                                

                                <label className="form-label mt-4">Descrição</label>
                                <textarea className="form-control" 
                                    onChange={event => {setDescricao(event.target.value); handleChangeDesc()}}
                                    value={descricao || chanDesc ? descricao : recurso?.descricao}></textarea>

                                <br />
                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">Compartilhar</Button>
                                </div>
                            
                            </form>
                </div>
        </div>
    )
}