import moment from "moment";
import { FormEvent, useState } from "react";
import { NavBar } from "../../../components/navBar/NavBar";
import { Button } from "../../../components/button/Button";

import filter from '../../../assets/images/filter.svg'

import "../buscarRecurso/buscarStyle.scss"
import { useGetMyRecursos } from "../../../hooks/recursos/useGetMyRecursos";
import { RecursoCard } from "../../../components/RecursoCard/RecursoCard";

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
    cancelado: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    url: string,
}
export function GerenciarRecursos(){
    const [ dateFilter, setDateFilter ] = useState(moment().format("DD/MM/YYYY"))
    const [ categoria, setCategoria ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ estado, setEstado ] = useState("");
    const [ cidade, setCidade ] = useState("");
    const [ cancelado, setCancelado ] = useState(true);

    const { recursosMy, setRecursosMy} = useGetMyRecursos(dateFilter, categoria, tipo, estado, cidade, cancelado );

    async function filterData(event: FormEvent) {
        event.preventDefault();

        let takeToShare:Recurso[] = []

        if(dateFilter.length > 0){
            var dateObj = new Date(dateFilter);
            var momentObj = moment(dateObj);
            var momentString = momentObj.format('DD/MM/YYYY')
            var compareDate = moment(momentString, 'DD/MM/YYYY');

            await recursosMy.forEach(element =>{
                if(compareDate.isBetween(element.dataInicio, element.dataFinal)){
                    takeToShare.push(element)
                }    
            });
        }

        //In case there is a date filter
        if(takeToShare.length > 0){
            //in case that there is a category selected
            if(categoria!=""){
                let takingDataFiltered:Recurso[] = []
                await takeToShare.forEach(element=>{
                    if(element.categoria === categoria){
                        takingDataFiltered.push(element)
                    }
                })
                //in case that any element represents that category
                takeToShare = takingDataFiltered
            }

            if(tipo!=""){
                let takingDataFiltered:Recurso[] = []
                await takeToShare.forEach(element=>{
                    if(element.tipo === tipo){
                        takingDataFiltered.push(element)
                    }
                })
                //in case that any element represents that category
                takeToShare = takingDataFiltered
            }

            if(estado !=""){
                let takingDataFiltered:Recurso[] = []
                await takeToShare.forEach(element=>{
                    if(element.estado.includes(estado)){
                        takingDataFiltered.push(element)
                    }
                })
                if(takingDataFiltered.length > 0){
                    takeToShare = takingDataFiltered
                }
            }

            if(cidade !=""){
                let takingDataFiltered:Recurso[] = []
                await takeToShare.forEach(element=>{
                    if(element.cidade.includes(cidade)){
                        takingDataFiltered.push(element)
                    }
                })

                if(takingDataFiltered.length > 0){
                    takeToShare = takingDataFiltered
                }
            }
        }else{
            if(categoria!=""){
                let takingDataFiltered:Recurso[] = []
                await recursosMy.forEach(element=>{
                    if(element.categoria === categoria){
                        takingDataFiltered.push(element)
                    }
                })
                //in case that any element represents that category
                takeToShare = takingDataFiltered
            }

            if(tipo!=""){
                let takingDataFiltered:Recurso[] = []
                await recursosMy.forEach(element=>{
                    if(element.tipo === tipo){
                        takingDataFiltered.push(element)
                    }
                })
                //in case that any element represents that category
                takeToShare = takingDataFiltered
            }

            if(takeToShare.length > 0){

                if(estado !=""){
                    let takingDataFiltered:Recurso[] = []
                    await takeToShare.forEach(element=>{
                        if(element.estado.includes(estado)){
                            takingDataFiltered.push(element)
                        }
                    })
                    if(takingDataFiltered.length > 0){
                        takeToShare = takingDataFiltered
                    }
                }
    
                if(cidade !=""){
                    let takingDataFiltered:Recurso[] = []
                    await takeToShare.forEach(element=>{
                        if(element.cidade.includes(cidade)){
                            takingDataFiltered.push(element)
                        }
                    })
    
                    if(takingDataFiltered.length > 0){
                        takeToShare = takingDataFiltered
                    }
                }

            }else{

                if(estado !=""){
                    let takingDataFiltered:Recurso[] = []
                    await recursosMy.forEach(element=>{
                        if(element.estado.includes(estado)){
                            takingDataFiltered.push(element)
                        }
                    })
                    if(takingDataFiltered.length > 0){
                        takeToShare = takingDataFiltered
                    }
                }
    
                if(cidade !=""){
                    let takingDataFiltered:Recurso[] = []
                    await recursosMy.forEach(element=>{
                        if(element.cidade.includes(cidade)){
                            takingDataFiltered.push(element)
                        }
                    })
    
                    if(takingDataFiltered.length > 0){
                        takeToShare = takingDataFiltered
                    }
                }
            }
            
            let t = document.getElementById('closeModalFilter')
            await t?.click();           

            
        }

        if(dateFilter.length > 0 || categoria != "" || estado != "" || cidade!=""){
            setRecursosMy(takeToShare)
        }else{
            alert("Nenhum filtro foi selecionado")
        }
        
    }

    return(
        <div>
            <NavBar/>
            <div className="m-2 min-vh-100 "> 
                <div className="d-flex m-3 w-100 justify-content-between">
                    <div className="rounded-pill p-3" style={{color: "white", backgroundColor:"#002838"}}>
                        {recursosMy.length} Recursos(s)
                    </div>
                    <div className="">
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img className="w-75" src={filter} alt="filtrar eventos" /></button>

                        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Selecione Filtros</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="closeModalFilter"></button>
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
                                        <option value="Alimentos">Alimentos</option>
                                        <option value="Mão de Obra">Mão de Obra</option>
                                        <option value="Monetário">Monetário</option>
                                        <option value="Roupas">Roupas</option>
                                        <option value="Tempo">Tempo</option>
                                    </select>
                                    
                                </div>
                                <div className="d-flex align-items-center justify-content-center gap-5">
                                    <h3>Estou</h3>
                                    <select 
                                        className="form-select"
                                        onChange={event => setTipo(event.target.value)}
                                        value={tipo}
                                        >
                                        <option value="">Selecione</option>
                                        <option value="Disponibilizo">Procurando</option>
                                        <option value="Procuro">Disponibilizando</option>
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
                                        <Button type="submit" data-bs-dismiss="offcanvas">Filtrar</Button>
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="d-flex flex-column">
                    {recursosMy.length > 0 ?
                    (
                        recursosMy.map((eventoInfo)=>
                            <RecursoCard props={eventoInfo}/>
                        )                           
                    ) : (
                        <div>
                            Não há Recursos
                        </div>
                    )}
                
                </div>
            </div>
        </div>
    )
    
}