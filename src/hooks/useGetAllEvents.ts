import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseEventos = Record<string, {
    id: string,
    authorID: string,
    authorName: string,
    category: string,
    startDate: string,
    endDate: string,
    title: string,
    canceled: string,
    confirmados: object
}>

type ConfirmadosFirebase = Record<string, {
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}>


type Evento = {
    id: string,
    autorID: string,
    autorNome: string,
    categoria: string,
    dataInicio: string,
    dataFinal: string,
    titulo: string,
    cancelado: string,
    confirmNumb: number
}

export function useGetAllEvents(){
    const [eventValues, setEventValues] = useState<Evento[]>([]);

    useEffect(() =>{
        const eventRef = database.ref(`eventos`);

        eventRef.once('value', evento => {
            //console.log(evento.val())
            const databaseEventos = evento.val();

            const firebaseEvent: FirebaseEventos = databaseEventos ?? {};
            
            const parsedEventos = Object.entries(firebaseEvent).map(([key, value])=>{
                return{
                    id: key,
                    autorID: value.authorID,
                    autorNome: value.authorName,
                    categoria: value.category,
                    dataInicio: value.startDate,
                    dataFinal: value.endDate,
                    titulo: value.title,
                    cancelado: value.canceled,
                    confirmNumb: Object.entries(value.confirmados ?? {}).length
                }
            }) 
            
            console.log(parsedEventos)
            setEventValues(parsedEventos);
        })

    }, [])


    return{eventValues}
}