import moment from "moment";
import { useEffect, useState } from "react"
import { EventCard } from "../../../components/EventCard/EventCard";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useEvent } from "../../../hooks/useEvent";
import { useGetAllEvents } from "../../../hooks/useGetAllEvents";
import { database } from "../../../services/firebase"

import filter from './filter.svg'


export function BuscarEvento(){
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
                        <img className="w-75" src={filter} alt="filtrar eventos" />
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