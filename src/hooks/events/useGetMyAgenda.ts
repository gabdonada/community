import moment from "moment";
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
    canceled: boolean,
    confirmados: Record<string, {
        id: string,
        confirmedByUserAvatar: string,
        confirmedByUserID: string,
        confirmedByUserName: string
    }>
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
    cancelado: boolean,
    confirmados: Array<{
        id: string,
        confirmedByUserAvatar: string,
        confirmedByUserID: string,
        confirmedByUserName: string
    }> | undefined
} | undefined

export function useGetMyAgenda(){

    const { user } = useAuth();
    const [ eventsAgenda, setEventsAgenda ] = useState<Evento[]>([])
    const [ eventsAgendaTop, setEventsAgendaTop ] = useState<Evento[] | undefined>([])
    const [ loadingAgenda, segLoadingAgenda ] = useState(true)


    async function handleFilterProcess(result: Evento[]) {
        let takeToShare:Evento[] = []
        if(result !== undefined){
            await result.forEach(async element => {
                if(moment(element?.dataFinal).isAfter() && !element?.cancelado){
                    if(element?.author.authorId === user?.id){
                        takeToShare.push(element);
                    }else{
                        if(element?.confirmados!==undefined){
                            await element?.confirmados.forEach(confir =>{
                                if(confir.confirmedByUserID === user?.id){
                                    takeToShare.push(element);
                                }
                            })
                        }  
                    }
                }          
            });
        }

        
        await setEventsAgenda(takeToShare)


        let topAgenda:Evento[] = []

        await eventsAgenda.forEach((ret)=>{
            let t:Evento = undefined;
            eventsAgenda.forEach((comp)=>{
                if(moment(ret?.dataInicio).isBefore(comp?.dataInicio)){
                    t = ret
                }else{
                    t = comp
                }
            })
            topAgenda.push(t)
        })

        await setEventsAgendaTop(await topAgenda.slice(0,3));
        await segLoadingAgenda(false)
    }

    useEffect(()=>{
        if(user != undefined){
            const eventRef = database.ref(`eventos`);
            
            
            eventRef.once('value', evento => {
                const databaseEventos = evento.val();
                const firebaseEvent: FirebaseEventos = databaseEventos ?? {};

                const parsedEvents = Object.entries(firebaseEvent).map(([key, value])=>{
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
                        confirmados: Object.entries(value.confirmados ?? {}).map(([key, value])=>{
                            return{
                                id: key,
                                confirmedByUserAvatar: value.confirmedByUserAvatar,
                                confirmedByUserID: value.confirmedByUserID,
                                confirmedByUserName: value.confirmedByUserName
                            }
                        })
                    }
                })
                handleFilterProcess(parsedEvents);
            })
        }
    },[user])

    return{eventsAgenda, eventsAgendaTop, loadingAgenda}
}