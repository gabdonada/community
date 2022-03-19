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
    likeIDfromCurrentUser: Confirmados | undefined,
    confirmadosN: number
}

type ConfirmadosFirebase = Record<string, {
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}>

type Confirmados = {
    id: string,
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}

export function useEvent(eventID: string){

    const { user } = useAuth();
    const [ evento, setEvento ] = useState<EventType>();
    const [ confirmados, setConfirmados ] = useState<Confirmados[]>([]);



    useEffect(()=>{
        const eventRef = database.ref(`eventos/${eventID}`)
        

        eventRef.once('value', eventDetails =>{
            const databaseEvent = eventDetails.val();
            const datebaseEventConfirm:ConfirmadosFirebase = databaseEvent.confirmados ?? {}

            const parsedConfirm = Object.entries(datebaseEventConfirm).map( ([key, value])=>{
                return{
                    id: key,
                    confirmedByUserID: value.confirmedByUserID,
                    confirmedByUserName: value.confirmedByUserName,
                    confirmedByUserAvatar: value.confirmedByUserAvatar
                }
            })

            const vari:EventType = {
                id: databaseEvent.key,
                autorID: databaseEvent.authorID,
                autorNome: databaseEvent.authorName,
                titulo: databaseEvent.title,
                categoria: databaseEvent.category,
                dateS: databaseEvent.startDate,
                dateE: databaseEvent.endDate,
                descricao: databaseEvent.description,
                cancelado: databaseEvent.canceled,
                likeIDfromCurrentUser: parsedConfirm.find(element => element.confirmedByUserID === user?.id),
                confirmadosN: Object.entries(databaseEvent.confirmados ?? {}).length
            }
            
            setEvento(vari)
            setConfirmados(parsedConfirm)
        })

        return () =>{
            eventRef.off('value');//it will remove ALL event listeners for the useEffect
        }

    },[eventID, user?.id]) //in case that the user changes the event, the number will be updated

    return{evento, confirmados}
}