import { useParams } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";

import { NavBar } from "../../../components/navBar/NavBar";
import { useGetFaqByID } from "../../../hooks/faq/useGetFaqByID";
import { Button } from "../../../components/button/Button";

type FaqParams = {
    id: string;
}

export function VisualizaFaq(){
    const params = useParams<FaqParams>();
    const faqid = params.id;
    const { user } = useAuth();
    const { faq } = useGetFaqByID(faqid)


    async function handleCloseCase() {
        const faqRef = await database.ref(`faq/${user?.id}/${params.id}`).update({
            status:'Finalizado'
        })
        alert("Finalizado com sucesso")
    }

    return(
        <div>
            <NavBar/>
            <div className="card m-4 p-4 d-flex flex-column">
                { faq !== undefined ? (
                    <div>
                        <header className='d-flex justify-content-center mb-4'>
                        <h1>{faq.titulo}</h1>
                        </header>
                        <input type="text" disabled value={faq.nome} className="form-control mb-3"/>
                        <input type="text" disabled value={faq.email} className="form-control mb-3"/>
                        <input type="text" disabled value={faq.categoria} className="form-control mb-3"/>
                        <input type="text" disabled value={faq.status} className="form-control mb-3"/>
                        <textarea disabled className="form-control mb-4">{faq.descricao}</textarea>

                    </div>
                    
                ):(
                    <header className='d-flex justify-content-center'>
                        <h1>FAQ não encontrado</h1>
                    </header>
                )}
                
                { user?.userEmail === faq?.email ? (
                    <Button onClick={handleCloseCase}>Finalizar FAQ</Button>
                ):(<></>)}
            </div>
        </div>
    )
}