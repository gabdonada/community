import { useState } from "react";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";



export function CriarEvento(){

    
    return(
        <div>
            <NavBar/>
                <div className="card m-5 d-flex flex-column min-vh-100">
                    <div className="card-body">
                        <div className="m-3">
                            <label className="form-label">Título do Evento</label>
                                <input type="text" className="form-control" placeholder="Digite o título do evento..."/>
                            
                            <label className="form-label mt-4">Categoria</label>
                                <select name="" id="" className="form-select">
                                    <option value="">Selecione...</option>
                                    <option value="Acadêmico | Educacional">Acadêmico | Educacional</option>
                                    <option value="Entretenimento">Entretenimento</option>
                                    <option value="Esportivo">Esportivo</option>
                                    <option value="Religioso">Religioso</option>
                                    <option value="Social">Social</option>
                                </select>

                            <label className="form-label mt-4">Selecione Datas e Horario</label>

                            
                                <div >
                                    <input 
                                        type="datetime-local" 
                                        name="dateTime" 
                                        className="form-control"
                                        // onChange={e => handleDateChange(i, e)}
                                        />

                                    <button> Remove date</button>
                                </div>
                           
                            <button> Add Date </button>

                            <label className="form-label mt-4">Descrição</label>
                            <textarea className="form-control" name="" id=""></textarea>

                            <label className="form-label mt-4">Localização</label>

                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}