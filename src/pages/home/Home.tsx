import { useGetTopEvents } from "../../hooks/useGetTopEvents";
import { useAuth } from "../../hooks/useAuth";
import { useGetMyAgenda } from "../../hooks/events/useGetMyAgenda";
import { useGetMatch } from "../../hooks/events/useGetMatch";
import { useNavigate } from 'react-router-dom'
import { FormEvent } from "react";
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { NavBar } from "../../components/navBar/NavBar";
import { Button } from "../../components/button/Button";
import { BlueCard } from "../../components/blueCards/BlueCard";


import './homestyle.scss'




export function Home(){
    const { user } = useAuth()
    const { loading, topEventsSelected } = useGetTopEvents(4, "","","","",false);
    const { loadingMatch, eventsMatchThree} = useGetMatch("","","","",false);
    const { eventsAgenda, loadingAgenda } = useGetMyAgenda();

    const navigate = useNavigate(); //use to navigate to other pages


    function openTopEvents(event: FormEvent) {
        event.preventDefault();
        navigate('/Evento/TopEventos');
        
    }

    function openMyAgenda(event: FormEvent){

    }

    function openMatchs(event: FormEvent){
        event.preventDefault();
        navigate('/Evento/Match');
    }

    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>

            <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Compartilhe sua opinião.</strong> Acesse a <a href="https://forms.gle/SjVEDVRWUgh5HURy8">pesquisa</a> e nos ajude a melhorar a plataforma.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
                
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
                                            <BlueCard props={eventoInfo}/>
                                        )
                                    )}

                                    {topEventsSelected.length <= 0 && !loading ? (  
                                            <div className="h-100 d-flex flex-column align-items-center justify-content-center"> 
                                                <h3>Não há TOP eventos</h3>
                                                <div className="matchRegister d-flex gap-1">
                                                    <a href={`/Evento/Novo`}>Crie</a><p>ou</p><a href={`/Evento/Buscar`}>busque</a><p>por eventos</p>
                                                </div>
                                            </div>
                                            
                                        ):(
                                            <Button onClick={openTopEvents} >Ver Mais</Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="sizingt card">
                                <div className="sizingt card-body d-flex flex-column align-items-center">
                                    <h1>Deu Match</h1>
                                    {loadingMatch ? (
                                        <h1>Carregando...</h1>
                                    ):(
                                        eventsMatchThree !== undefined ? (                                            
                                            eventsMatchThree.map((matchResult)=>
                                                <BlueCard props={matchResult}/>
                                            )
                                        ):(<></>)
                                    )}
                                    {eventsMatchThree.length <= 0 ? (
                                        <div className="d-flex matchRegister gap-1">
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
                                        <div className="matchRegister d-flex gap-1">
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