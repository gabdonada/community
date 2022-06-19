import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";


type FirebaseEventos = Record<string, {
    id: string,
    author: {
        authorId: string,
        authorName: string,
        authorAvatar: string
    },
    category: string,
    startDate: string,
    endDate: string,
    title: string,
    state: string,
    city: string,
    district: string,
    street: string,
    url: string,
    canceled: string,
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
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    url: string,
    cancelado: string,
    confirmNumb: number
}

export function useGetMyEvents(date: string, categoria: string, estado: string, cidade: string, cancelado: boolean){
    const [eventValues, setEventValues] = useState<Evento[]>([]);
    const [ loading, segLoading ] = useState(true)

    const { user } = useAuth();

    async function processFilters(results: Evento[]) {
        let takeToShare:Evento[] = []        
        await results.forEach(element => {
            if(element.author.authorId === user?.id ){
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
                        author: value.author,
                        categoria: value.category,
                        dataInicio: value.startDate,
                        dataFinal: value.endDate,
                        titulo: value.title,
                        estado: value.state,
                        cidade: value.city,
                        bairro: value.district,
                        rua: value.street,
                        url: value.url,
                        cancelado: value.canceled,
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