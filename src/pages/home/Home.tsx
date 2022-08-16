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
import { useGetUserProfile } from "../../hooks/user/useGetUserProfile";
import { useAuth } from "../../hooks/useAuth";
import { useGetMyAgenda } from "../../hooks/events/useGetMyAgenda";
import { useGetMatch } from "../../hooks/events/useGetMatch";




export function Home(){
    const { user } = useAuth()
    const { loading, topEventsSelected } = useGetTopEvents(4);
    const { loadingUser, userDef} = useGetUserProfile(user?.id);
    const { loadingMatch, eventsMatch} = useGetMatch();
    const { eventsAgenda, loadingAgenda } = useGetMyAgenda();

    function openTopEvents(event: FormEvent) {
        
    }

    function openMyAgenda(event: FormEvent){

    }

    function openMatchs(event: FormEvent){

    }

    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>
                
                <div className="container">
                    <div className="row mt-4 mb-4 gap">
                        <div className="col-md">
                            <div className="card sizingt">
                                <div className="sizingt d-flex card-body flex-column align-items-center">
                                    <h1>TOP Eventos</h1>
                                    {loading ?
                                    (   
                                        <h1>Carregando...</h1>
                                    ):(
                                        topEventsSelected.map((eventoInfo)=>
                                            moment(eventoInfo.dataFinal).isBefore() || eventoInfo.cancelado === 'Y' ? 
                                            (<></>):(
                                                <BlueCard props={eventoInfo}/>
                                            )
                                        )
                                    )}

                                    {topEventsSelected.length <= 0 && loading===false?
                                        (  
                                            <div className="h-100 d-flex flex-column align-items-center justify-content-center"> 
                                                <h3>Não há TOP eventos</h3>
                                                <div className="matchRegister">
                                                    <a href={`/Evento/Novo`}>Crie</a><p>ou</p><a href={`/Evento/Buscar`}>busque</a><p>por eventos</p>
                                                </div>
                                            </div>
                                            
                                        ):(
                                            loading === false ?
                                                (
                                                    <Button onClick={openTopEvents} >Ver Mais</Button>
                                                ):(<></>)       
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="sizingt card">
                                <div className="sizingt card-body d-flex flex-column align-items-center justify-content-center">
                                    <h1>Deu Match</h1>
                                    {loadingMatch ? (
                                        <h1>Carregando...</h1>
                                    ):(
                                        eventsMatch !== undefined ? (                                            
                                            eventsMatch.map((matchResult)=>
                                                <BlueCard props={matchResult}/>
                                            )
                                        ):(<></>)
                                    )}
                                    {eventsMatch.length <= 0 ? (
                                        <div className="matchRegister">
                                            <a href={`/Perfil/Editar/${user?.id}`}>Atualize</a><p>seu perfil e encontre Matchs</p>
                                        </div>
                                    ):(
                                        <Button onClick={openMatchs}>Ver Mais</Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card sizingt">
                                <div className="sizingt d-flex card-body flex-column align-items-center">
                                    <h1>Sua Agenda</h1>
                                    {loadingAgenda ? (
                                        <h1>Carregando...</h1>
                                    ):(
                                        eventsAgenda !== undefined ? (                                            
                                            eventsAgenda.map((agendaResult)=>
                                                <BlueCard props={agendaResult}/>
                                            )
                                        ):(<></>)
                                    )}
                                    {eventsAgenda.length <= 0 ? (
                                        <div className="matchRegister">
                                            <a href={`/Evento/Novo`}>Crie</a><p>ou</p><a href={`/Evento/Buscar`}>participe</a><p>de eventos</p>
                                        </div>
                                    ):(
                                        <Button onClick={openMyAgenda}>Ver Mais</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>

    )
}