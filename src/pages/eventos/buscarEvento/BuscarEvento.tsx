import moment from "moment";
import { useState } from "react";
import { EventCard } from "../../../components/EventCard/EventCard";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useGetAllEvents } from "../../../hooks/useGetAllEvents";
import { Button } from "../../../components/button/Button";

import filter from '../../../assets/images/filter.svg'

import "./buscarStyle.scss"

type Evento = {
    id: string,
    autorID: string,
    autorNome: string,
    categoria: string,
    dataInicio: string,
    dataFinal: string,
    titulo: string,
    cancelado: string,
    confirmNumb: number
}

export function BuscarEvento(){
    const {eventValues} = useGetAllEvents();

    const [ dateFilter, setDateFilter ] = useState("")
    const [categoria, setCategoria ] = useState("");
    const [ estado, setEstado ] = useState("");
    const [ cidade, setCidade ] = useState("");

    const [ todaysMoment ] = useState(moment().format("DD-MM-YYYY"))
    
    function filterData(){

    }

    return(
        <div>
            <NavBar/>
            <div className="m-5 min-vh-100 "> 
                <div className="d-flex m-3 w-100 justify-content-between">
                    <div className="rounded-pill p-3" style={{color: "white", backgroundColor:"#002838"}}>
                        {eventValues.length} Evento(s)
                    </div>
                    <div className="">
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img className="w-75" src={filter} alt="filtrar eventos" /></button>

                        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Selecione Filtros</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                            <div className="offcanvas-body d-flex flex-column justify-content-center gap-4">
                                <div className="d-flex align-items-center justify-content-center spgap">
                                    <h3>Data</h3>
                                    <input 
                                        type="date"
                                        className="form-control"
                                        onChange={event => setDateFilter(event.target.value)}
                                        value={dateFilter} />
                                </div>
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <h3>Categoria</h3>
                                    <select 
                                        className="form-select"
                                        onChange={event => setCategoria(event.target.value)}
                                        value={categoria}
                                        >
                                        
                                        <option value="">Selecione</option>
                                    </select>
                                    
                                </div>
                                
                                <div className="d-flex align-items-center justify-content-center sptgap">
                                    <h3>Estado</h3>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        onChange={event => setEstado(event.target.value)}
                                        value={estado} />
                                </div>
                                <div className="d-flex align-items-center justify-content-center sptgap">
                                    <h3>Cidade</h3>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        onChange={event => setCidade(event.target.value)}
                                        value={cidade} />
                                </div>
                                <div className="d-flex align-items-center justify-content-center gap-5">
                                    <form onSubmit={filterData}>
                                        <Button type="submit">Filtrar</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
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