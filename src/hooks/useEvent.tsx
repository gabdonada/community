import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type EventType = {
    id: string,
    autorID: string,
    autorNome: string,
    titulo: string,
    categoria: string,
    dateS: string,
    dateE: string,
    descricao: string,
    cancelado: string,
    confirmCount: number,
    confirmadosList: Record<string,{
        confirmedByUserID: string,
        confirmedByUserName: string,
        confirmedByUserAvatar: string
    }>
}

export function useEvent(eventID: string){

    const [ evento, setEvento ] = useState<EventType>()

    useEffect(()=>{
        const eventRef = database.ref(`eventos/${eventID}`)

        eventRef.once('value', evento =>{
            //console.log(evento.val());
            const eventValue = evento.val();

            const vari:EventType = {
                id: eventValue.key,
                autorID: eventValue.authorID,
                autorNome: eventValue.authorName,
                titulo: eventValue.title,
                categoria: eventValue.category,
                dateS: eventValue.startDate,
                dateE: eventValue.endDate,
                descricao: eventValue.description,
                cancelado: eventValue.canceled,
                confirmCount: eventValue.confirmados.length,
                confirmadosList: {
                    confirmedByUserID: eventValue.confirmados.confirmedByUserID
                }
            }

            setEvento(vari)
            
            //setCountConfirm(Object.values(eventValue.confirmados ?? {}).length)
            //setHasConfirm(Object.values(eventValue.confirmados ?? {}).some(confirmado => confirmado.confirmedByUserID === user?.id))
        })
    },[eventID]) //in case that the user changes the event, the number will be updated

    return{evento}
}