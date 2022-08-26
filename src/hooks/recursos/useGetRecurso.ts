import { navigate } from "@reach/router";
import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";

type RecursoType = {
    id: string,
    author:{
        authorAvatar: string,
        authorId: string,
        authorName: string
    },
    titulo: string,
    categoria: string,
    tipo: string,
    dateS: string,
    dateE: string,
    descricao: string,
    cancelado: boolean,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    url:string,
    online: boolean,
    presencial: boolean
}


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


//used to return a specific event
export function useGetRecurso(recursoID: string){

    const { user } = useAuth();
    const [ recurso, setRecurso ] = useState<RecursoType>();
    const [ comments, setComments ] = useState<Comentarios[]>([]);

    

    useEffect(()=>{
        const recursoRef = database.ref(`recursos/${recursoID}`)
        
        recursoRef.on('value', recursoDetails =>{
            const databaseRecurso = recursoDetails.val();
            const databaseComments: ComentariosFirebase = databaseRecurso.comentarios ?? {}

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

            const vari:RecursoType = {
                id: databaseRecurso.key,
                author: databaseRecurso.author,
                titulo: databaseRecurso.title,
                categoria: databaseRecurso.category,
                tipo: databaseRecurso.type,
                dateS: databaseRecurso.startDate,
                dateE: databaseRecurso.endDate,
                descricao: databaseRecurso.description,
                cancelado: databaseRecurso.canceled,
                estado: databaseRecurso.state,
                cidade: databaseRecurso.city,
                bairro: databaseRecurso.district,
                rua: databaseRecurso.street,
                presencial: databaseRecurso.presencial,
                online: databaseRecurso.online,
                url: databaseRecurso.url,
            }
            
            setRecurso(vari)
            setComments(parsedComments)

            console.log(databaseRecurso)
            
        })

        return () =>{
            recursoRef.off('value');//it will remove ALL event listeners for the useEffect
        }

    },[recursoID, user?.id]) //in case that the user changes the event, the number will be updated

    return{recurso, comments}
}