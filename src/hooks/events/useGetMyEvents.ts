import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";


type FirebaseEventos = Record<string, {
    id: string,
    authorID: string,
    authorName: string,
    category: string,
    startDate: string,
    endDate: string,
    title: string,
    canceled: string,
    state: string,
    street: string,
    url: string,
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
    estado: string,
    cidade: string,
    url: string,
    confirmNumb: number
}

//eventType is the guy that will tell us if we should return all events or just mine
export function useGetMyEvents(date: string, categoria: string, estado: string, cidade: string, cancelado: boolean){
    const [eventValues, setEventValues] = useState<Evento[]>([]);
    const [ loading, segLoading ] = useState(true)

    const { user } = useAuth();

    async function processFilters(results: Evento[]) {
        let takeToShare:Evento[] = []        
        await results.forEach(element => {
            if(element.autorID === user?.id ){
                takeToShare.push(element)
            }
        });

        await setEventValues(takeToShare)
        await segLoading(false)
    }

    useEffect(() =>{
        if(user != undefined){
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
                        estado: value.state,
                        cidade: value.street,
                        url: value.url,
                        confirmNumb: Object.entries(value.confirmados ?? {}).length
                    }
                }) 
                
                //console.log(parsedEventos)
                processFilters(parsedEventos);

                
            })
    
        }  

    }, [user, date, categoria, estado, cidade, cancelado])


    return{eventValues, setEventValues, loading}
}