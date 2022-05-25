import { Footer } from "../../components/footer/Footer";
import { NavBar } from "../../components/navBar/NavBar";
import { useAuth } from "../../hooks/useAuth";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import moment from "moment";
import { BlueCard } from "../../components/blueCards/BlueCard";


import './homestyle.scss'
import { useGetTopEvents } from "../../hooks/useGetTopEvents";




export function Home(){


    const { loading, topEventsSelected } = useGetTopEvents(3);

    

    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>
                
                <div className="container">
                    <div className="row mt-4 mb-4 gap">
                        <div className="col-md">
                            <div className="card">
                                <div className="sizingt d-flex card-body flex-column align-items-center sizingt">
                                    <h1>TOP Eventos</h1>
                                    {loading ?
                                    (   
                                        <h1>Loading...</h1>
                                    ):(
                                        topEventsSelected.map((eventoInfo)=>
                                            moment(eventoInfo.dataFinal).isBefore() || eventoInfo.cancelado === 'Y' ? 
                                            (
                                                console.log()
                                            ):(
                                                <BlueCard props={eventoInfo}/>
                                            )
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