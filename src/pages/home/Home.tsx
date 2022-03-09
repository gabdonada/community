import { Footer } from "../../components/footer/Footer";
import { NavBar } from "../../components/navBar/NavBar";
import { useAuth } from "../../hooks/useAuth";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import moment from "moment";
import { BlueCard } from "../../components/blueCards/BlueCard";


import './homestyle.scss'

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

export function Home(){

    const { user } = useAuth();

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
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>
                
                <div className="container">
                    <div className="row mt-4 gap">
                        <div className="col-md">
                            <div className="card">
                                <div className="sizingt d-flex card-body flex-column align-items-center sizingt">
                                    <h1>TOP Eventos</h1>
                                    {eventValues.map((eventoInfo)=>
                                        moment(eventoInfo.dataFinal).isBefore() || eventoInfo.cancelado === 'Y' ? 
                                            (
                                                console.log()
                                            ):(
                                                <BlueCard props={eventoInfo}/>
                                            )
                                        
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card">
                                <div className="sizingt card-body d-flex justify-content-center">
                                    <h1>TOP Recursos</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card">
                                <div className="sizingt card-body d-flex justify-content-center">
                                    <h1> Sua Agenda</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <Footer/>
        </div>

    )
}