import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";


type FirebaseRecursos = Record<string, {
    id: string,
    author: {
        authorId: string,
        authorName: string,
        authorAvatar: string
    },
    category: string,
    type: string,
    startDate: string,
    endDate: string,
    title: string,
    state: string,
    city: string,
    district: string,
    street: string,
    url: string,
    canceled: string,
}>

type Recurso = {
    id: string,
    author: {
        authorId: string,
        authorName: string,
        authorAvatar: string
    },
    categoria: string,
    tipo: string,
    dataInicio: string,
    dataFinal: string,
    titulo: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    url: string,
    cancelado: string,
}

export function useGetMyRecursos(date: string, categoria: string, tipo: string, estado: string, cidade: string, cancelado: boolean){
    const [ recursosMy, setRecursosMy] = useState<Recurso[]>([]);
    const [ loading, segLoading ] = useState(true)

    const { user } = useAuth();

    async function processFilters(results: Recurso[]) {
        let takeToShare:Recurso[] = []        
        await results.forEach(element => {
            if(element.author.authorId === user?.id ){
                takeToShare.push(element)
            }
        });

        await setRecursosMy(takeToShare)
        await segLoading(false)
    }

    useEffect(() =>{
        if(user != undefined){
            const recursosRef = database.ref(`recursos`);

            recursosRef.once('value', recurso => {
                //console.log(evento.val())
                const databaseRecursos = recurso.val();

                const firebaseEvent: FirebaseRecursos = databaseRecursos ?? {};
                
                const parsedRecursos = Object.entries(firebaseEvent).map(([key, value])=>{
                    return{
                        id: key,
                        author: value.author,
                        categoria: value.category,
                        tipo: value.type,
                        dataInicio: value.startDate,
                        dataFinal: value.endDate,
                        titulo: value.title,
                        estado: value.state,
                        cidade: value.city,
                        bairro: value.district,
                        rua: value.street,
                        url: value.url,
                        cancelado: value.canceled,
                    }
                }) 
                
                //console.log(parsedEventos)
                processFilters(parsedRecursos);

            })
    
        }  

    }, [user, date, categoria, tipo, estado, cidade, cancelado])


    return{recursosMy, setRecursosMy, loading}
}