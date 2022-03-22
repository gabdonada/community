import { FormEvent, useEffect, useState } from 'react';
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
import { useEvent } from '../../../hooks/useEvent';
import { preventDefault } from 'ol/events/Event';

type EventParms = {
    id: string;
}

export function EventoIndex(){

    const { user } = useAuth()
    const params = useParams<EventParms>();

    const eventID = params.id;
    const { evento, confirmados } = useEvent(eventID || "");

    async function handleEventCancelation() {
        const eventRef = database.ref(`evento/${eventID}`);

        await eventRef.child(eventID || '').update({
            canceled: 'Y'
        })
    }
    

    async function handleDenounce(){

        const faqRef = database.ref(`faq/${user?.id}`); //fiding FAQ reference in DB.

        await faqRef.push({
            authorId: user?.id,
            name: user?.name,
            status: "Aberto",
            title: "Denuncia Evento - "+evento?.titulo+" - ID "+params.id,
            email: user?.userEmail,
            category: "Denuncia",
            description: "Denúncia do Evento '"+evento?.titulo+"' ID do evento: "+params.id 
        });

        alert("Denúncia criada com sucesso.")
    }




    async function handleContMe(){

        if(!user){
            throw new Error("Você deve estar logado para confirmar presença");
        }

        const userConfirmation = {
            confirmedByUserID: user.id,
            confirmedByUserName: user.name,
            confirmedByUserAvatar: user.avatar
        }

        if(evento?.likeIDfromCurrentUser === undefined){
            await database.ref(`/eventos/${params.id}/confirmados`).push(userConfirmation)
            alert("Presença confirmada")
        }else{
            await database.ref(`/eventos/${params.id}/confirmados/${evento?.likeIDfromCurrentUser.id}`).remove()
            alert("Presença removida")
        }
        
    }




    
    return(
        <div>
            <NavBar/>

            <div className="card m-5 d-flex flex-column min-vh-100 p-4">
                <header className='d-flex justify-content-center'>
                    <h1>{evento?.titulo} - {evento?.confirmadosN} Confirmado(s)</h1>
                </header>

                <div className="card-body d-flex flex-column gap-3">
                    
                    <h3>Categoria: {evento?.categoria}</h3>
                    <h3>Data de Inicio: {moment(evento?.dateS).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Data Final: {moment(evento?.dateE).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Descrição: {evento?.descricao.split("\n").map(line=><div>{line}</div>)} </h3>
                    <h3>Localização: </h3><br/>
                    <div>
                        <Location/>
                    </div>

                    <p>Criado por: {evento?.autorNome}</p>

                </div>

                { user ?  (
                    <div className='d-flex gap-4'>
                        { user.id === evento?.autorID ? (
                            <div> <ButtonDanger onClick={handleEventCancelation}>Cancelar Evento</ButtonDanger></div>
                        ):(
                            <div> </div>
                        )}
                        <form onSubmit={handleContMe}>

                        
                            {moment(evento?.dateE).isAfter() ? (
                                evento?.likeIDfromCurrentUser === undefined ? 
                                <Button type={'submit'}> Confirmar Presença</Button>
                                : <Button type={'submit'}> Remover Presença</Button>
                                
                            ):(
                                <div></div>
                            )}
                        </form>
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