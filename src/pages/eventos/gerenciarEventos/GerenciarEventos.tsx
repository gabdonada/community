import moment from "moment";
import { useEffect, useState } from "react"
import { EventCard } from "../../../components/EventCard/EventCard";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { useGetAllEvents } from "../../../hooks/useGetAllEvents";
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
    const {user} = useAuth();

    const {eventValues} = useGetAllEvents();


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
                            moment(eventoInfo.dataFinal).isBefore() || eventoInfo.cancelado === 'Y' ?(
                                    <div></div>
                                ):(
                                    eventoInfo.autorID === user?.id ? <EventCard props={eventoInfo}/>
                                    : <div></div>
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