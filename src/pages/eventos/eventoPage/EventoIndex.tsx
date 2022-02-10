import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyCode } from "../../../components/copyCodeIcon/copyCode";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';

type EventParms = {
    id: string;
}

export function EventoIndex(){

    const { user } = useAuth()

    const [ titulo , setTitulo ] = useState('');
    const [ categoria , setCategoria ] = useState('');
    const [ dateS , setDateS ] = useState('');
    //const [ dateE , setDateE ] = useState('');
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

            <div className="card m-5 d-flex flex-column min-vh-100">
                <header className='d-flex'>
                    <button>...</button>
                    <h1>{titulo}</h1>
                    <CopyCode id={params.id || 'No Code'} /> {/** Testar */}
                </header>

                <div className='card-body'>
                    <h3>Categoria: {categoria}</h3>
                    <h3>Data de Inicio: {dateS}</h3>
                    <h3>Descrição: {descricao}</h3>

                </div>


                { user ? (
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