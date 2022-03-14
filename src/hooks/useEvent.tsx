import { Settings } from "http2";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
}

type Confirmados = Record<string, {
    id: string,
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}>

export function useEvent(eventID: string){

    const { user } = useAuth();
    const [ evento, setEvento ] = useState<EventType>();
    const [ confirmados, setConfirmados ] = useState<Confirmados[]>([]);



    useEffect(()=>{
        const eventRef = database.ref(`eventos/${eventID}`)

        eventRef.once('value', evento =>{
            //console.log(evento.val());
            const eventValue = evento.val();
            const firebaseConfirmados:Confirmados = eventValue.confirmados ?? {}

            const parsedConfirmados = Object.entries(firebaseConfirmados).map( ([key, value])=>{
                return {
                    id: key,
                    confirmedByUserID: value.confirmedByUserID,
                    confirmedByUserName: value.confirmedByUserName,
                    confirmedByUserAvatar: value.confirmedByUserAvatar
                }
            })

            //setConfirmados(parsedConfirmados);

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
            }
            setEvento(vari)
            
            //setCountConfirm(Object.values(eventValue.confirmados ?? {}).length)
            //setHasConfirm(Object.values(eventValue.confirmados ?? {}).some(confirmado => confirmado.confirmedByUserID === user?.id))
        })

        return () =>{
            eventRef.off('value');//it will remove ALL event listeners for the useEffect
        }

    },[eventID, user?.id]) //in case that the user changes the event, the number will be updated

    return{evento, confirmados}
}