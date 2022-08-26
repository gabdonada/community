import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from "react";
import { useGetUserProfile } from "../../../hooks/user/useGetUserProfile";
import { NavBar } from "../../../components/navBar/NavBar";
import { Button } from '../../../components/button/Button';
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';

type ParamType = {
    id: string
}

export function EditUserProfile(){

    const params = useParams<ParamType>();
    const userID = params.id;

    const navigate = useNavigate();

    const { user } = useAuth()
    const { loadingUser, userDef } = useGetUserProfile(userID);

    const [ description, setDescription ] = useState(userDef?.userDescription || "")
    const [ phone, setPhone ] = useState(userDef?.userPhone)
    const [ title, setTitle ] = useState(userDef?.userTitle)
    const [ city, setCity ] = useState(userDef?.userCity)

    const [ acRelacaoFins, setAcRelacaoFins ] = useState<boolean>(userDef?.userInterests.acRelacaoFins || false)
    const [ acRelacaoValores, setAcRelacaoValores ] = useState<boolean>(userDef?.userInterests.acRelacaoValores || false)
    const [ acAfetiva, setAcAfetiva ] = useState<boolean>(userDef?.userInterests.acAfetiva || false)
    const [ acTradi, setAcTradi ] = useState<boolean>(userDef?.userInterests.acTradi || false)

    async function handleUserPreferences(event: FormEvent) {
        event.preventDefault();

        if(user !== undefined && userID === user.id){
            const userRef = database.ref(`users/`); 
            const firebaseEvent = await userRef.child(user.id).set({
                userID: user?.id,
                userName: user?.name,
                userEmail: user?.userEmail,
                userAvatar: user?.avatar,
                userDescription: description,
                userPhone: phone,
                userTitle: title,
                userInterests: {
                    acRelacaoFins: acRelacaoFins,
                    acRelacaoValores: acRelacaoValores,
                    acAfetiva: acAfetiva,
                    acTradi: acTradi
                },
                userCity: city
            });

            navigate(`/home`)
        }else{
            alert("Você precisa estar logado e gerenciar o perfil em questão")
        }
    }


    return(
        <div>
            <NavBar/>

            <div>
                { loadingUser ? (
                    <h1>Carregando ...</h1>
                ):(
                    <div className="card m-2 p-3 d-flex flex-column ">
                        <form onSubmit={handleUserPreferences}>
                            <label className="form-label">Título</label>
                            <input 
                                type="text"
                                className="form-control mb-3" 
                                onChange={event => setTitle(event.target.value)}
                                value={title}/>

                            <label className="form-label">Telefone</label>
                            <input 
                                type="text"
                                className="form-control mb-3" 
                                onChange={event => setPhone(event.target.value)}
                                value={phone}/>
                            
                            <label className="form-label">Selecione seus interesses</label>
                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acRelacaoFins} onChange={event => acRelacaoFins === false ? setAcRelacaoFins(true):setAcRelacaoFins(false)}/>
                                <label className="form-check-label">
                                    Ação social racional com relação a fins
                                </label>
                            </div>

                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acRelacaoValores} onChange={event => acRelacaoValores === false ? setAcRelacaoValores(true):setAcRelacaoValores(false)}/>
                                <label className="form-check-label">
                                    Ação social racional com relação a valores
                                </label>
                            </div>
                            
                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acAfetiva} onChange={event => acAfetiva === false ? setAcAfetiva(true):setAcAfetiva(false)}/>
                                <label className="form-check-label">
                                    Ação social afetiva
                                </label>
                            </div>
                            
                            <div className='d-flex gap-2 mb-3 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acTradi} onChange={event => acTradi === false ? setAcTradi(true):setAcTradi(false)}/>
                                <label className="form-check-label">
                                    Ação social tradicional
                                </label>
                            </div>

                            <label className="form-label">Cidade de preferência</label>
                            <input 
                                type="text"
                                className="form-control mb-3" 
                                onChange={event => setCity(event.target.value)}
                                value={city}/>

                            <label className="form-label">Escreva sobre você</label>
                            <textarea 
                                className="form-control mb-3" 
                                onChange={event => setDescription(event.target.value)}
                                value={description}></textarea>

                            <Button type='submit'>Salvar</Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}