import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from "react";
import { useAuth } from '../../../hooks/useAuth';
import { NavBar } from "../../../components/navBar/NavBar";
import { Button } from '../../../components/button/Button';
import { database } from '../../../services/firebase';
import { useGetUserProfile } from "../../../hooks/user/useGetUserProfile";

type ParamType = {
    id: string
}

export function EditUserProfile(){
    const { user } = useAuth()

    const params = useParams<ParamType>();
    const userID = params.id;
    
    const { loadingUser, userDef } = useGetUserProfile(userID);

    const navigate = useNavigate();


    const [ description, setDescription ] = useState( '')
    const [ phone, setPhone ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ city, setCity ] = useState('')

    const [ acRelacaoFins, setAcRelacaoFins ] = useState<boolean>(false)
    const [ acRelacaoValores, setAcRelacaoValores ] = useState<boolean>(false)
    const [ acAfetiva, setAcAfetiva ] = useState<boolean>(false)
    const [ acTradi, setAcTradi ] = useState<boolean>(false)

    const [ changeDesc, setChangeDesc] = useState(false)
    const [ changeTit, setChangeTit] = useState(false)
    const [ changePho, setChangePho] = useState(false)
    const [ changeCi, setChangeCi] = useState(false)
    const [ changeARF, setChangeARF] = useState(false)
    const [ changeARV, setChangeARV] = useState(false)
    const [ changeAA, setChangeAA] = useState(false)
    const [ changeAT, setChangeAT] = useState(false)



    async function handleChangeDesc() {
        setChangeDesc(true)
    }
    async function handleChangeTitle() {
        setChangeTit(true)
    }
    async function handleChangePhone() {
        setChangePho(true)
    }
    async function handleChangeCi() {
        setChangeCi(true)
    }
    async function handleChangeARF() {
        setChangeARF(true)
    }
    async function handleChangeARV() {
        setChangeARV(true)
    }
    async function handleChangeAA() {
        setChangeAA(true)
    }
    async function handleChangeAT() {
        setChangeAT(true)
    }



    async function handleUserPreferences(event: FormEvent) {
        event.preventDefault();

        try{
            if(user !== undefined && userID === user.id){
                const userRef = database.ref(`users/`); 
                
                const firebaseEvent = await userRef.child(user.id).set({
                    userID: user?.id,
                    userName: user?.name,
                    userEmail: user?.userEmail,
                    userAvatar: user?.avatar,
                    userDescription: await changeDesc ? description : (userDef?.userDescription || ""),
                    userPhone: await changePho ? phone : (userDef?.userPhone || ""),
                    userTitle: await changeTit ? title : (userDef?.userTitle || ""),
                    userInterests: {
                        acRelacaoFins: changeARF ? acRelacaoFins : (userDef?.userInterests.acRelacaoFins || false),
                        acRelacaoValores: changeARV ? acRelacaoValores : (userDef?.userInterests.acRelacaoValores || false),
                        acAfetiva: changeAA ? acAfetiva : (userDef?.userInterests.acAfetiva || false),
                        acTradi: changeAT ? acTradi : (userDef?.userInterests.acTradi || false)
                    },
                    userCity: await changeCi ? city : (userDef?.userCity || "")
                });
    
                navigate(`/Perfil/${user.id}`)
            }else{
                alert("Você precisa estar logado e gerenciar o perfil em questão")
            }
        }catch(e){
            console.log(e)
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
                                onChange={event => {setTitle(event.target.value); handleChangeTitle()}}
                                value={title || changeTit ? title : changeTit ? title : userDef?.userTitle}/>

                            <label className="form-label">Telefone</label>
                            <input 
                                type="text"
                                className="form-control mb-3" 
                                onChange={event => {setPhone(event.target.value); handleChangePhone()}}
                                value={phone || changePho ? phone : userDef?.userPhone}/>
                            
                            <label className="form-label">Selecione seus interesses</label>
                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acRelacaoFins || changeARF ? acRelacaoFins : userDef?.userInterests.acRelacaoFins} onChange={event => {acRelacaoFins === false ? setAcRelacaoFins(true):setAcRelacaoFins(false); handleChangeARF()}}/>
                                <label className="form-check-label">
                                    Ação social racional com relação a fins
                                </label>
                            </div>

                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acRelacaoValores || changeARV ? changeARV : userDef?.userInterests.acRelacaoValores} onChange={event => {acRelacaoValores === false ? setAcRelacaoValores(true):setAcRelacaoValores(false); handleChangeARV()}}/>
                                <label className="form-check-label">
                                    Ação social racional com relação a valores
                                </label>
                            </div>
                            
                            <div className='d-flex gap-2 mb-2 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acAfetiva || changeAA ? changeAA : userDef?.userInterests.acAfetiva} onChange={event => {acAfetiva === false ? setAcAfetiva(true):setAcAfetiva(false); handleChangeAA()}}/>
                                <label className="form-check-label">
                                    Ação social afetiva
                                </label>
                            </div>
                            
                            <div className='d-flex gap-2 mb-3 d-flex align-items-center'>
                                <input className="form-check-input" type="checkbox" defaultChecked={acTradi || changeAT ? changeAT : userDef?.userInterests.acTradi} onChange={event => {acTradi === false ? setAcTradi(true):setAcTradi(false); handleChangeAT()}}/>
                                <label className="form-check-label">
                                    Ação social tradicional
                                </label>
                            </div>

                            <label className="form-label">Cidade de preferência</label>
                            <input 
                                type="text"
                                className="form-control mb-3" 
                                onChange={event => {setCity(event.target.value); handleChangeCi()}}
                                value={city || changeCi ? city : userDef?.userCity}/>

                            <label className="form-label">Escreva sobre você</label>
                            <textarea 
                                className="form-control mb-3" 
                                onChange={event => {setDescription(event.target.value); handleChangeDesc()}}
                                value={description || changeDesc ? description : userDef?.userDescription}></textarea>

                            <Button type='submit'>Salvar</Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}