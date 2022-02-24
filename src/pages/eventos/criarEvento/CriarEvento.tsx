import { useNavigate } from 'react-router-dom'

import { FormEvent, useState } from "react";

import moment from "moment";

import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { Button } from '../../../components/button/Button';



export function CriarEvento(){

    const { user } = useAuth()

    const navigate = useNavigate(); //use to navigate to other pages

    const [ titulo, setTitulo ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [dateS, setDateS] = useState<string>(moment().format("YYYY-MM-DDThh:mm"));
    const [dateE, setDateE] = useState<string>(moment().format("YYYY-MM-DDThh:mm"));
    const [ descricao, setDescricao ] = useState('');
    const [ longitude, setLongitude ] = useState(0);
    const [ latitude, setLatitude ] = useState(0);

    async function handleCreateEvent(event: FormEvent) {
        event.preventDefault();

        if(titulo.trim().length < 5){
            alert("Titulo deve conter mais de 5 caracteries.");
        }else if(categoria === ''){
            alert("Você deve selecionar uma categoria valida.")
        }else if( dateS < dateE){
            alert("Data inicial deve ser menor que a final.")
        }else if(descricao.length < 15){
            alert("Descrição deve conter mais de 15 caracteries.");
        }else if(!user){
            alert("Você deve estar logado para executar a tarefa.");
        }else{

            const eventRef = database.ref('eventos'); //fiding eventos reference in DB.

            const firebaseEvent = await eventRef.push({
                authorID: user?.id,
                title: titulo,
                category: categoria,
                startDate: dateS,
                //endDate: dateE,
                description: descricao,
                //localization: localizacao
            });

            navigate(`/Evento/${firebaseEvent.key}`)
        }   
    }


    
    return(
        <div>
            <NavBar/>
                <div className="card m-5 d-flex flex-column min-vh-100">
                    <div className="card-body">
                        <div className="m-3">
                            <form onSubmit={handleCreateEvent}>
                                <label className="form-label">Título do Evento</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o título do evento..."
                                        onChange={event => setTitulo(event.target.value)}
                                        value={titulo}/>
                                
                                <label className="form-label mt-4">Categoria</label>
                                    <select 
                                        className="form-select"
                                        onChange={event => setCategoria(event.target.value)}
                                        value={categoria}>
                                        <option value="">Selecione...</option>
                                        <option value="Acadêmico | Educacional">Acadêmico | Educacional</option>
                                        <option value="Entretenimento">Entretenimento</option>
                                        <option value="Esportivo">Esportivo</option>
                                        <option value="Religioso">Religioso</option>
                                        <option value="Social">Social</option>
                                    </select>

                                <label className="form-label mt-4">Selecione Datas e Horario</label>

                                
                                    <div >
                                        <input 
                                            type="datetime-local" 
                                            className="form-control"
                                            onChange={event => setDateS(event.target.value)}
                                            value={dateS}/>

                                        <button> Remove date</button>
                                    </div>
                            
                                <button> Add Date </button>

                                <label className="form-label mt-4">Descrição</label>
                                <textarea className="form-control" 
                                    onChange={event => setDescricao(event.target.value)}
                                    value={descricao}></textarea>

                                <label className="form-label mt-4">Localização</label>

                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">Submit</Button>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}