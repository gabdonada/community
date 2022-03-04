import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyCode } from "../../../components/copyCodeIcon/copyCode";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';
import { Location } from '../../../components/googleMaps/Location';
import moment from 'moment';

type EventParms = {
    id: string;
}

export function EventoIndex(){

    const { user } = useAuth()

    const [ titulo , setTitulo ] = useState('');
    const [ categoria , setCategoria ] = useState('');
    const [ dateS , setDateS ] = useState('');
    const [ dateE , setDateE ] = useState('');
    const [ descricao , setDescricao ] = useState('');
    //const [ localizacao , setLocalizacao ] = useState('');


    const params = useParams<EventParms>();

    useEffect(()=>{
        //console.log(params.id)
        const eventRef = database.ref(`eventos/${params.id}`)

        eventRef.once('value', evento =>{
            //console.log(evento.val());

            const eventValue = evento.val();

            setTitulo(eventValue.title)
            setCategoria(eventValue.category)
            setDateS(eventValue.startDate)
            setDateE(eventValue.endDate)
            setDescricao(eventValue.description)
        })
    },[params.id]) //in case that the user changes the event, the number will be updated


    async function handleContMe() {
        if(!user){
            throw new Error("Você deve estar logado para confirmar presença");
        }

        const userConfirmation = {
            confirmedBy: user.id
        }

        await database.ref(`/eventos/${params.id}/confirmados`).push(userConfirmation)
    }




    
    return(
        <div>
            <NavBar/>

            <div className="card m-5 d-flex flex-column min-vh-100 p-4">
                <header className='d-flex justify-content-between'>
                <div className="dropdown">
                    <button type="button" className="btn border-dark rounded-circle" data-bs-toggle="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    </button>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Denunciar ou Relatar Problema</a></li>
                    <li><a className="dropdown-item" href="#">Link 2</a></li>
                    <li><a className="dropdown-item" href="#">Link 3</a></li>
                    </ul>
                </div>
                    <h1>{titulo}</h1>
                    <CopyCode id={params.id || 'No Code'} /> {/** Testar */}
                </header>

                <div className='card-body'>
                    <h3>Categoria: {categoria}</h3>
                    <h3>Data de Inicio: {moment(dateS).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Data Final: {moment(dateE).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Descrição: {descricao}</h3>
                    <h3>Localização:</h3><br />
                    <div>
                        <Location/>
                    </div>

                </div>

                { user ?  ( 
                    <div>
                        <button> Confirmar Presença</button>
                    </div>
                ) : (
                    <span>Para confirmar prenença, <button>faça seu login</button>.</span>
                )}
            </div>

            <Footer/>
        </div>
    )
}