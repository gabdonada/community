import moment from "moment";
import { useEffect, useState } from "react"
import { EventCard } from "../../../components/EventCard/EventCard";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { database } from "../../../services/firebase"


type FirebaseEventos = Record<string, {
    id: string,
    category: string,
    startDate: string,
    endDate: string,
    title: string,
    canceled: string
}>

type Evento = {
    id: string,
    categoria: string,
    dataInicio: string,
    dataFinal: string,
    titulo: string,
    cancelado: string
}

export function GerenciarEventos(){
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
                    categoria: value.category,
                    dataInicio: value.startDate,
                    dataFinal: value.endDate,
                    titulo: value.title,
                    cancelado: value.canceled

                }
            }) 
            
            setEventValues(parsedEventos);
        })

    }, [])

    return(
        <div>
            <NavBar/>
            <div className="m-5 min-vh-100 "> 
                <div className="d-flex m-3 w-100 justify-content-between">
                    <div className="rounded-pill p-3" style={{color: "white", backgroundColor:"#002838"}}>
                        {eventValues.length} Evento(s)
                    </div>
                    <div className="">
                        <p>Filtro</p>
                    </div>
                </div>
                <div className="d-flex flex-column card-body ">
                    {eventValues.length > 0 ?
                    (
                        eventValues.map((eventoInfo)=>
                            moment(eventoInfo.dataFinal).isBefore() || eventoInfo.cancelado === 'Y' ? 
                                (
                                    console.log()
                                ):(
                                    <EventCard props={eventoInfo}/>
                                )
                            
                        )
                    ) : (
                        <div>
                            Não há eventos
                        </div>
                    )}
                    
                </div>
            </div>

            <Footer/>
        </div>
    )
    
}