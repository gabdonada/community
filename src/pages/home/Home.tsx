import { Footer } from "../../components/footer/Footer";
import { NavBar } from "../../components/navBar/NavBar";
import { FormEvent } from "react";
import { Button } from "../../components/button/Button";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import moment from "moment";
import { BlueCard } from "../../components/blueCards/BlueCard";


import './homestyle.scss'
import { useGetTopEvents } from "../../hooks/useGetTopEvents";




export function Home(){
    const { loading, topEventsSelected } = useGetTopEvents(4);

    function openTopEvents(event: FormEvent) {
        
    }

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

                                    {topEventsSelected.length <= 0 && loading===false?
                                        (  
                                            <div className="h-100 d-flex flex-column align-items-center justify-content-center"> 
                                                <h3>N??o h?? TOP eventos</h3>
                                                <p>Busque por <a href="/Evento/Buscar">Eventos</a></p>
                                            </div>
                                            
                                        ):(
                                            loading === false ?
                                                (
                                                    <form onSubmit={openTopEvents}>
                                                        <div className="mt-3">
                                                            <Button type="submit">Ver Mais</Button>
                                                        </div>
                                                    </form>
                                                ):(
                                                    <div></div>
                                                )       
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card">
                                <div className="sizingt card-body d-flex justify-content-center">
                                    <h1>Deu Match</h1>
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