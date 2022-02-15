import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useAuth } from '../../hooks/useAuth';

import menuIcon from './img/menuIcon.svg'

export function NavBar(){
    const { user } = useAuth();

    return(
        <nav className="navbar navbar-expand-lg pt-4 pb-4 navbar-light primaryColor w-100">
            
            {user ? (
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/home">LOGO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-light"><img src={menuIcon} alt="" /></span>
                    </button>
                    <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white text-uppercase" aria-current="page" href="/home">Home</a>
                            </li>
                            <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <a className="nav-link text-white text-uppercase" href="#">Entidades</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white text-uppercase" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Eventos
                                    </a>
                                    <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/Evento/Novo">Criar Evento</a></li>
                                        <li><a className="dropdown-item" href="#">Buscar Eventos</a></li>
                                        <li><a className="dropdown-item" href="#">Gerenciar Eventos</a></li>

                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white text-uppercase" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Recursos
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Criar Recurso</a></li>
                                        <li><a className="dropdown-item" href="#">Buscar Recursos</a></li>
                                        <li><a className="dropdown-item" href="#">Gerenciar Recursos</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            User Login Image
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#">Visualizar Perfil</a></li>
                                            <li><a className="dropdown-item" href="#">Personalizar Perfil</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" href="#">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            ):(
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">LOGO</a>
                        
                    <button>Faça Login</button>
                </div>
            )}
        </nav>
    )
}