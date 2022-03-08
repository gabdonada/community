import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyCode } from "../../../components/copyCodeIcon/copyCode";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';
import { Location } from '../../../components/googleMaps/Location';
import moment from 'moment';
import { Button } from '../../../components/button/Button';
import { ButtonDanger } from '../../../components/button/ButtonDanger';

type EventParms = {
    id: string;
}

export function EventoIndex(){

    const { user } = useAuth()

    const [ author, setAuthor] = useState('');
    const [ titulo , setTitulo ] = useState('');
    const [ categoria , setCategoria ] = useState('');
    const [ dateS , setDateS ] = useState('');
    const [ dateE , setDateE ] = useState('');
    const [ descricao , setDescricao ] = useState('');
    //const [ localizacao , setLocalizacao ] = useState('');

    async function handleDenounce(){

        const faqRef = database.ref(`faq/${user?.id}`); //fiding FAQ reference in DB.

        const firebaseFaq = await faqRef.push({
            authorId: user?.id,
            name: user?.name,
            status: "Aberto",
            title: "Denuncia Evento - "+titulo+" - ID "+params.id,
            email: user?.userEmail,
            category: "Denuncia",
            description: "Denúncia do Evento '"+titulo+"' ID do evento: "+params.id
        });

        alert("Denúncia criada com sucesso.")
    }


    const params = useParams<EventParms>();

    useEffect(()=>{
        //console.log(params.id)

        const eventRef = database.ref(`eventos/${params.id}`)

        eventRef.once('value', evento =>{
            //console.log(evento.val());

            const eventValue = evento.val();
            
            setAuthor(eventValue.authorID)
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
                <header className='d-flex justify-content-center'>
                    <h1>{titulo}</h1>
                </header>

                <div className="card-body d-flex flex-column gap-3">
                    
                    <h3>Categoria: {categoria}</h3>
                    <h3>Data de Inicio: {moment(dateS).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Data Final: {moment(dateE).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Descrição: {descricao}</h3>
                    <h3>Localização:</h3><br/>
                    <div>
                        <Location/>
                    </div>

                </div>

                { user ?  (
                    <div className='d-flex gap-4'>
                        { user.id === author ? (
                            <div> <ButtonDanger>Cancelar Evento</ButtonDanger></div>
                        ):(
                            <div> </div>
                        )}
                            <Button onClick={handleContMe}> Confirmar Presença</Button> {/**Atualizar funcionalidade */}
                            <CopyCode id={params.id || 'No Code'} textBut={'Copiar ID'} />
                            <Button onClick={handleDenounce}>Denunciar ou Relatar Problema</Button> {/**Atualizar funcionalidade */}
                        </div>
                    
                    
                ) : (
                    <span>Para confirmar prenença, <button>faça seu login</button>.</span>
                )}
            </div>

            <Footer/>
        </div>
    )
}