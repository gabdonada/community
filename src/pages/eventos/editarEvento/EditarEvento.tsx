import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { FormEvent, useState } from "react";

import moment from "moment";

import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { Button } from '../../../components/button/Button';
import { useEvent } from '../../../hooks/useEvent';


type EventParms = {
    id: string;
}


export function EditarEvento(){

    const params = useParams<EventParms>();
    const eventID = params.id;

    const { user } = useAuth()
    const { evento } = useEvent(eventID || "");

    const navigate = useNavigate(); //use to navigate to other pages

    const [ titulo, setTitulo ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ dateS, setDateS ] = useState<string>(moment().format("YYYY-MM-DDThh:mm"));
    const [ dateE, setDateE ] = useState<string>(moment().format("YYYY-MM-DDThh:mm"));
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

        if(user?.id !== evento?.author.authorId){
            alert("Você deve estar logado como criador do evento para altera-lo")
            return;
        }
        if(evento === undefined){
            let alert = window.confirm("Evento informado inexistente.")
            if(alert){
                navigate('/home')
                return;
            }else{
                return;
            }
        }

        if(titulo.trim().length < 5){
            alert("Titulo deve conter mais de 5 caracteres.");
        }else if(moment(dateS).isAfter(dateE)){ 
            alert("Data inicial deve ser menor que a final.")
        }else if(descricao.length < 15 && evento?.descricao.length < 15){
            alert("Descrição deve conter mais de 15 caracteres.");
        }else if(!user){
            alert("Você deve estar logado para executar a tarefa.");
        }else{

            const eventRef = database.ref(`eventos/`); //refering 'eventos' in DB.

            if(eventID === undefined){
                alert("Erro ao atualizar, ID invalido")
                return;
            }
            const firebaseEvent = await eventRef.child(eventID).set({
                author: {
                    authorId: user?.id,
                    authorName: user.name,
                    authorAvatar: user.avatar 
                },
                title: chanTi ? titulo : evento?.titulo,
                category: chanCat ? categoria : evento?.categoria ,
                startDate: chanDS ? dateS : evento?.dateS ,
                endDate: chanDe ? dateE : evento?.dateE ,
                description: chanDesc ? descricao : evento?.descricao ,
                canceled: false,
                online: chanOn ? online : evento?.online ,
                presencial: chanPre ? presencial : evento?.presencial ,
                state: chanEst ? estado : evento?.estado ,
                city: chanCi ? cidade : evento?.cidade ,
                district: chanBai ? bairro : evento?.bairro ,
                street: chanRua ? rua : evento?.rua ,
                url: chanLin ? link : evento?.url 
            });

            navigate(`/Evento/${eventID}`)
        }   
    }


    
    return(
        <div>
            <NavBar/>
                <div className="m-5 d-flex flex-column">
                            <form onSubmit={handleCreateEvent}>
                                <label className="form-label">Título do Evento</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o título do evento..."
                                        onChange={event => {setTitulo(event.target.value); handleChangeTi()}}
                                        value={titulo || chanTi ? titulo : evento?.titulo }/>
                                
                                <label className="form-label mt-4">Categoria</label>
                                    <select 
                                        required
                                        className="form-select"
                                        onChange={event => {setCategoria(event.target.value); handleChangeCat()}}
                                        value={categoria || chanCat ? categoria : evento?.categoria}>
                                        <option value="">Selecione...</option>
                                        <option value="Ação social racional com relação a fins">Ação social racional com relação a fins</option>
                                        <option value="Ação social racional com relação a valores">Ação social racional com relação a valores</option>
                                        <option value="Ação social afetiva">Ação social afetiva</option>
                                        <option value="Ação social tradicional">Ação social tradicional</option>
                                    </select>

                                <label className="form-label mt-4">Selecione Data e Horário de Início</label>

                                    <input 
                                        required
                                        type="datetime-local" 
                                        className="form-control"
                                        onChange={event => {setDateS(event.target.value); handleChangeDS()}}
                                        value={dateS || chanDS ? dateS : evento?.dateS}/>

                                <label className="form-label mt-4">Selecione Data e Horário do Final</label>

                                    <input 
                                        required
                                        type="datetime-local" 
                                        className="form-control"
                                        onChange={event => {setDateE(event.target.value); handleChangeDE()}}
                                        value={dateE || chanDe ? dateE : evento?.dateE}/>

                                
                                <label className="form-label mt-4">Localização</label>
                               {/** <div className="opacity-50"><p>Permita localização para auto preenchimento</p></div>*/} 
                                <br />
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => {setOnline(event.target.checked); handleChangeOn()}}
                                        checked={online || chanOn ? online : evento?.online}/>
                                    <label className="form-label m-1">Online</label> <br />
                                    
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => {setPresencial(event.target.checked); handleChangePre()}}
                                        checked={presencial || chanPre ? presencial : evento?.presencial}/>
                                    <label className="form-label m-1">Presencial</label> <br />
                                    
                                {presencial === true ?
                                (
                                    <div>
                                        <label className="form-label mt-4">Estado</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setEstado(event.target.value); handleChangeEst()}}
                                                value={estado || chanEst ? estado : evento?.estado}/>

                                        <label className="form-label mt-4">Cidade</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setCidade(event.target.value); handleChangeCi()}}
                                                value={cidade || chanCi ? cidade : evento?.cidade}/>

                                        <label className="form-label mt-4">Bairro</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setBairro(event.target.value); handleChangeBai()}}
                                                value={bairro || chanBai ? bairro : evento?.bairro}/>

                                        <label className="form-label mt-4">Rua</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => {setRua(event.target.value); handleChangeRua()}}
                                                value={rua || chanRua ? rua : evento?.rua}/>
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
                                                value={link || chanLin ? link : evento?.url}/>
                                    </div>
                                ):(
                                    <div></div>
                                )}
                                

                                <label className="form-label mt-4">Descrição</label>
                                <textarea className="form-control" 
                                    onChange={event => {setDescricao(event.target.value); handleChangeDesc()}}
                                    value={descricao || chanDesc ? descricao : evento?.descricao}></textarea>

                                <br />
                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">Compartilhar</Button>
                                </div>
                            
                            </form>
                </div>
        </div>
    )
}