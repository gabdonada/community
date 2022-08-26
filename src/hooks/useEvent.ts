import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type EventType = {
    id: string,
    author:{
        authorAvatar: string,
        authorId: string,
        authorName: string
    },
    titulo: string,
    categoria: string,
    dateS: string,
    dateE: string,
    descricao: string,
    cancelado: boolean,
    likeIDfromCurrentUser: Confirmados | undefined,
    confirmadosN: number,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    url:string,
    online: boolean,
    presencial: boolean
}

type ConfirmadosFirebase = Record<string, {
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}>

type ComentariosFirebase = Record<string, {
    id: string;
    content: string;
    author: {
        name: string,
        avatar: string,
        userId: string;
    },
    isHighlighted: boolean;
    likes: Record<string,{
        authorId: string
    }>
}>

type Comentarios =  {
    id: string,
    content: string,
    author: {
        name: string,
        avatar: string,
        userId: string
    },
    isHighlighted: boolean
    likeCount: number,
    likeId: string | undefined
}

type Confirmados = {
    id: string,
    confirmedByUserID: string,
    confirmedByUserName: string,
    confirmedByUserAvatar: string
}

//used to return a specific event
export function useEvent(eventID: string){

    const { user } = useAuth();
    const [ evento, setEvento ] = useState<EventType>();
    const [ comments, setComments ] = useState<Comentarios[]>([]);

    

    useEffect(()=>{
        const eventRef = database.ref(`eventos/${eventID}`)
        

        eventRef.on('value', eventDetails =>{
            const databaseEvent = eventDetails.val();
            const datebaseEventConfirm:ConfirmadosFirebase = databaseEvent.confirmados ?? {}
            const databaseComments: ComentariosFirebase = databaseEvent.comentarios ?? {}

            const parsedConfirm = Object.entries(datebaseEventConfirm).map( ([key, value])=>{
                return{
                    id: key,
                    confirmedByUserID: value.confirmedByUserID,
                    confirmedByUserName: value.confirmedByUserName,
                    confirmedByUserAvatar: value.confirmedByUserAvatar
                }
            })

            const parsedComments = Object.entries(databaseComments).map(([key, value])=>{
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0] //get the like if it exists
                }
            })

            const vari:EventType = {
                id: databaseEvent.key,
                author: databaseEvent.author,
                titulo: databaseEvent.title,
                categoria: databaseEvent.category,
                dateS: databaseEvent.startDate,
                dateE: databaseEvent.endDate,
                descricao: databaseEvent.description,
                cancelado: databaseEvent.canceled,
                estado: databaseEvent.state,
                cidade: databaseEvent.city,
                bairro: databaseEvent.district,
                rua: databaseEvent.street,
                presencial: databaseEvent.presencial,
                online: databaseEvent.online,
                url: databaseEvent.url,
                likeIDfromCurrentUser: parsedConfirm.find(element => element.confirmedByUserID === user?.id),
                confirmadosN: Object.entries(databaseEvent.confirmados ?? {}).length
            }
            
            setEvento(vari)
            setComments(parsedComments)
            
        })

        return () =>{
            eventRef.off('value');//it will remove ALL event listeners for the useEffect
        }

    },[eventID, user?.id]) //in case that the user changes the event, the number will be updated

    return{evento, comments}
}