import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import moment from "moment";
import { useAuth } from "./useAuth";



type FirebaseEventos = Record<string, {
    id: string,
    author:{
        authorId: string,
        authorName: string,
        authorAvatar: string
    },
    category: string,
    startDate: string,
    endDate: string,
    title: string,
    canceled: boolean,
    state: string,
    city: string,
    url: string,
    confirmados: object
}>

type Evento = {
    id: string,
    author: {
        authorId: string,
        authorName: string,
        authorAvatar: string
    },
    categoria: string,
    dataInicio: string,
    dataFinal: string,
    titulo: string,
    cancelado: boolean,
    estado: string,
    cidade: string,
    url: string,
    confirmNumb: number
}

export function useGetTopEvents(quant: number, date: string, categoria: string, estado: string, cidade: string, cancelado: boolean){

    const { user } = useAuth();
    
    const [topEvents, setTopEvents] = useState<Evento[]>([]);
    const [topEventsSelected, setTopEventsSelected] = useState<Evento[]>([]);

    const [loading, setLoading] = useState(true)
    
    async function organizeEvents(eventValues: Evento[]){
        //organazing events by confirmed users

        let topAllEvents:Evento[] = <Evento[]>[];
        

        await eventValues.forEach(element =>{
            if(element.confirmNumb > 0 && moment(element.dataFinal).isAfter() && element.cancelado === false){
                topAllEvents.push(element)
            }
        })

        await topAllEvents.sort((a,b) => b.confirmNumb - a.confirmNumb)
        await setTopEvents(topAllEvents)

        //organazing events by quantity selected
        let topSelected = topAllEvents;
        await topSelected.sort((a,b) => b.confirmNumb - a.confirmNumb).slice(0,3);
        await setTopEventsSelected(topSelected);
        
        await setLoading(false)
        
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
                    author: value.author,
                    categoria: value.category,
                    dataInicio: value.startDate,
                    dataFinal: value.endDate,
                    titulo: value.title,
                    cancelado: value.canceled,
                    estado: value.state,
                    cidade: value.city,
                    url: value.url,
                    confirmNumb: Object.entries(value.confirmados ?? {}).length
                }
            }) 
            
            //console.log(parsedEventos)
            
            organizeEvents(parsedEventos);
            
        })

    }, [quant, user, date, categoria, estado, cidade, cancelado])

    return{topEvents, setTopEvents, topEventsSelected, loading}
}