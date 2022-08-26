import { useNavigate } from 'react-router-dom'

import { FormEvent, useState } from "react";

import moment from "moment";

import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { Button } from '../../../components/button/Button';



export function CriarRecurso(){

    const { user } = useAuth()

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


    async function handleCreateRecurso(event: FormEvent) {
        event.preventDefault()

        if(titulo.trim().length < 5){
            alert("Titulo deve conter mais de 5 caracteries.");
        }else if(categoria === ''){
            alert("Você deve selecionar uma categoria valida.")
        }else if(moment(dateS).isAfter(dateE)){ 
            alert("Data inicial deve ser menor que a final.")
        }else if(descricao.length < 15){
            alert("Descrição deve conter mais de 15 caracteries.");
        }else if(!user){
            alert("Você deve estar logado para executar a tarefa.");

        }else if(presencial === true && estado === ''){
            alert("Você deve informar o estado");
        }else if(presencial === true && cidade === ''){
            alert("Você deve informar a cidade");
        }else if(presencial === true && bairro === ''){
            alert("Você deve informar o bairro");
        }else if(presencial === true && rua === ''){
            alert("Você deve informar a rua");
        }else if(online === true && link === ''){
            alert("Você deve informar o link");
        }else{
            try{
                const recursosRef = database.ref('recursos'); //refering 'recursos' in DB.

                const firebaseEvent = await recursosRef.push({
                    author: {
                        authorId: user?.id,
                        authorName: user.name,
                        authorAvatar: user.avatar 
                    },
                    title: titulo,
                    type: tipo,
                    category: categoria,
                    startDate: dateS,
                    endDate: dateE,
                    description: descricao,
                    canceled: false,
                    online: online,
                    presencial: presencial,
                    state: estado,
                    city: cidade,
                    district: bairro,
                    street: rua,
                    url: link
                });

            navigate(`/recurso/${firebaseEvent.key}`)

            }catch(e){
                alert("Erro ao registrar: "+e)
            }


        }   
    }


    
    return(
        <div>
            <NavBar/>
                <div className="m-5 d-flex flex-column">
                            <form onSubmit={handleCreateRecurso}>
                                <label className="form-label">Título do Recurso</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o título do Recurso..."
                                        onChange={event => setTitulo(event.target.value)}
                                        value={titulo}/>
                                
                                <label className="form-label mt-4">Tipo</label>
                                    <select 
                                        required
                                        className="form-select"
                                        onChange={event => setTipo(event.target.value)}
                                        value={tipo}>
                                        <option value="">Selecione...</option>
                                        <option value="Disponibilizo">Disponibilizo</option>
                                        <option value="Procuro">Procuro</option>
                                    </select>

                                <label className="form-label mt-4">Categoria</label>
                                    <select 
                                        required
                                        className="form-select"
                                        onChange={event => setCategoria(event.target.value)}
                                        value={categoria}>
                                        <option value="">Selecione...</option>
                                        <option value="Alimentos">Alimentos</option>
                                        <option value="Mão de Obra">Mão de Obra</option>
                                        <option value="Monetário">Monetário</option>
                                        <option value="Roupas">Roupas</option>
                                        <option value="Tempo">Tempo</option>
                                    </select>

                                <label className="form-label mt-4">Selecione Inicial</label>

                                    <input 
                                        type="date" 
                                        className="form-control"
                                        onChange={event => setDateS(event.target.value)}
                                        value={dateS}/>

                                <label className="form-label mt-4">Selecione Data Final</label>

                                    <input 
                                        type="date" 
                                        className="form-control"
                                        onChange={event => setDateE(event.target.value)}
                                        value={dateE}/>

                                
                                <label className="form-label mt-4">Localização</label>
                               {/** <div className="opacity-50"><p>Permita localização para auto preenchimento</p></div>*/} 
                                <br />
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => setOnline(event.target.checked)}
                                        checked={online}/>
                                    <label className="form-label m-1">Online</label> <br />
                                    
                                    <input 
                                        type="checkbox" 
                                        className=""
                                        onChange={event => setPresencial(event.target.checked)}
                                        checked={presencial}/>
                                    <label className="form-label m-1">Presencial</label> <br />
                                    
                                {presencial === true ?
                                (
                                    <div>
                                        <label className="form-label mt-4">Estado</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => setEstado(event.target.value)}
                                                value={estado}/>

                                        <label className="form-label mt-4">Cidade</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => setCidade(event.target.value)}
                                                value={cidade}/>

                                        <label className="form-label mt-4">Bairro</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => setBairro(event.target.value)}
                                                value={bairro}/>

                                        <label className="form-label mt-4">Rua</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                onChange={event => setRua(event.target.value)}
                                                value={rua}/>
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
                                                onChange={event => setLink(event.target.value)}
                                                value={link}/>
                                    </div>
                                ):(
                                    <div></div>
                                )}
                                

                                <label className="form-label mt-4">Descrição</label>
                                <textarea className="form-control" 
                                    onChange={event => setDescricao(event.target.value)}
                                    value={descricao}></textarea>

                                <br />
                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">Compartilhar</Button>
                                </div>
                            
                            </form>
                </div>
        </div>
    )
}