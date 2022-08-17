import { useParams } from 'react-router-dom';
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useGetUserProfile } from '../../../hooks/user/useGetUserProfile';

type userParams = {
    id: string;
}


export function VisualizarProfile(){
    const params = useParams<userParams>();
    const profileID = params.id;

    const {loadingUser, userDef} = useGetUserProfile(profileID);
    
    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>
            {loadingUser ? (
                <h1>Carregando ...</h1>
            ):(
                userDef !== undefined ? (
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-3 mb-6 mb-lg-0 wow fadeIn">
                                <div className="card border-0 shadow">
                                    <img src={userDef.userAvatar} alt={userDef.userName} />
                                    <div className="card-body p-1-9 p-xl-5">
                                        <div className="mb-4">
                                            <h3 className="h4 mb-0">{userDef.userName}</h3>
                                            <span className="text-success">{userDef.userTitle}</span>
                                        </div>
                                        <ul className="list-unstyled mb-4">
                                            <li className="mb-3"><a href={`mailto:${userDef.userEmail}`}>{userDef.userEmail}</a></li>
                                            <li className="mb-3"><a href={`tel:${parseInt(userDef.userPhone)}`}>{userDef.userPhone}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="ps-lg-1-6 ps-xl-5">
                                    <div className="mb-5 wow fadeIn">
                                        <div className="text-start mb-1-6 wow fadeIn">
                                            <h2 className="h1 mb-0 text-primary-dark">#Sobre {userDef.userName.trimStart().split(" ")[0]}</h2>
                                        </div>
                                        {userDef.userDescription.length > 0 ?(
                                            <p>{userDef.userDescription.split("\n").map(line=><div>{line}</div>)}</p>
                                        ):(
                                            <h4>{userDef.userName.trimStart().split(" ")[0]} não se descreveu :(</h4>
                                        )}
                                        
                                    </div>

                                    
                                        <div className="mb-5 wow fadeIn">
                                            <div className="text-start mb-1-6 wow fadeIn">
                                                <h2 className="mb-0 text-primary-dark">#Interesses</h2>
                                            </div>
                                            {userDef.userInterests.acAfetiva || userDef.userInterests.acRelacaoFins || userDef.userInterests.acRelacaoValores || userDef.userInterests.acTradi ? 
                                            (
                                                <div className="row mt-n4">
                                                    {userDef.userInterests.acRelacaoFins === true ? (
                                                        <div className="col-sm-6 col-xl-4 mt-4">
                                                            <div className="card text-center border-0 rounded-3">
                                                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                                    <h3 className="h5">Ação social racional com relação a fins</h3>
                                                                    <p className="mb-0">A Finalidade da ação justifica a intenção e os meios empregados para alcançar o objetivo.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):(<></>)}
                                                    
                                                    {userDef.userInterests.acAfetiva ? (
                                                        <div className="col-sm-6 col-xl-4 mt-4">
                                                            <div className="card text-center border-0 rounded-3">
                                                                <div className="card-body">
                                                                    <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                                                    <h3 className="h5 mb-3">Ação social afetiva</h3>
                                                                    <p className="mb-0">Nesse tipo de ação, os sentimentos são a engrenagem motivacional, tanto positiva quanto negativamente.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):(<></>)}
                                                    

                                                    {userDef.userInterests.acTradi ? (
                                                        <div className="col-sm-6 col-xl-4 mt-4">
                                                            <div className="card text-center border-0 rounded-3">
                                                                <div className="card-body">
                                                                    <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                                                    <h3 className="h5 mb-3">Ação social tradicional</h3>
                                                                    <p className="mb-0">Os ensinamentos repassados de geração em geração criam uma conexão de valores baseados em hábitos, costumes e tradições familiares ou oriundos do meio em que se vive.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):(<></>)}

                                                    {userDef.userInterests.acRelacaoValores ? (
                                                        <div className="col-sm-6 col-xl-4 mt-4">
                                                            <div className="card text-center border-0 rounded-3">
                                                                <div className="card-body">
                                                                    <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                                                                    <h3 className="h5 mb-3">Ação social racional com relação a valores</h3>
                                                                    <p className="mb-0">Antes de alcançar um resultado, esse tipo de ação se importa primeiro com o meio empregado para chegar à derradeira finalização. 
                                                                    <br/>A motivação pode estar intimamente ligada às crenças, à política, à ética e às religiões.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):(<></>)}
                                                </div>
                                             ):(
                                                <h4>Interesses não registrados :(</h4>
                                            )}
                                        </div>
                                   
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                    <h1>Usuário não localizado</h1>
                )
            )}
            
        </div>
    )
}