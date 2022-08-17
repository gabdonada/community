import { useNavigate } from 'react-router-dom'
import { Button } from "../../../components/button/Button";
import { NavBar } from "../../../components/navBar/NavBar";
import { useGetUserFaq } from "../../../hooks/faq/useGetUserFaq";

import './listStyle.scss'

export function ListFaq(){

    const navigate = useNavigate();
    const { faqListLoading, faqList} = useGetUserFaq();

    async function createFaqNavigate() {
        navigate('/FAQ/Novo')
    }

    return(
        <div className="d-flex flex-column">
            <NavBar/>
            <div className="d-flex m-4 justify-content-between">
                <Button onClick={createFaqNavigate}>Criar FAQ</Button>
                <div className="rounded-pill p-3" style={{color: "white", backgroundColor:"#333333"}}>
                    {faqList?.length} FAQ(s)
                </div>
            </div>
            <div>
                {faqListLoading ? (
                    <div className="d-flex m-4">
                        <h1>Carregando...</h1>
                    </div>
                ):(
                    faqList === undefined ? (
                        <h1>Não há FAQs registrados em seu nome.</h1>
                    ):(
                        faqList.map((element)=>
                            <a href={`/FAQ/${element.id}`} className={`text-decoration-none link-dark`}>
                                <div className={`card m-3 p-2 ${element.status === "Aberto" ? '' : 'closed'}`}>
                                    <div className={`d-flex justify-content-center align-items-center w-100`}>
                                            <h1>{element.titulo} - {element.status}</h1>
                                    </div>
                                </div>
                            </a>
                        )
                    )
                )}
            </div>
        </div>
    )
}