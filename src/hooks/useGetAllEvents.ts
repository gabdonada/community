import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";
import moment from "moment";



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

//eventType is the guy that will tell us if we should return all events or just mine
export function useGetAllEvents(date: string, categoria: string, estado: string, cidade: string, eventType: string){
    const [eventValues, setEventValues] = useState<Evento[]>([]);

    const { user } = useAuth();

    async function processFilters(results: Evento[]) {
        if(date === "" && categoria === "" && estado === "" && cidade === "" && eventType === "all"){
            let takeToShare:Evento[] = []
            await results.forEach(element => {
                if(moment(element.dataFinal).isAfter() && element.cancelado !="Y"){
                    takeToShare.push(element)
                }
            });
            
            await setEventValues(takeToShare)
        }

        if(date === "" && categoria === "" && estado === "" && cidade === "" && eventType === "mine"){
            let takeToShare:Evento[] = []
            await results.forEach(element => {
                if(element.autorID === user?.id){    
                    takeToShare.push(element)
                }
            });
            
            await setEventValues(takeToShare)
        }
    }
    

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
            
            //console.log(parsedEventos)
            processFilters(parsedEventos);
        })

        

    }, [user])


    return{eventValues}
}