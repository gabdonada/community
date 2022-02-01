import { Footer } from "../../components/footer/Footer";
import { NavBar } from "../../components/navBar/NavBar";
import { useAuth } from "../../hooks/useAuth";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


//import './homestyle.scss'

export function Home(){

    const { user } = useAuth();
    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>
                
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md">
                            <div className="card">
                                <div className="card-body d-flex justify-content-center">
                                    <h1>TOP Eventos</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card">
                                <div className="card-body d-flex justify-content-center">
                                    <h1> Seus Recursos</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card">
                                <div className="card-body d-flex justify-content-center">
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