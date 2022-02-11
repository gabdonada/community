import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";

import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";

type FaqParams = {
    id: string;
}

export function VisualizaFaq(){

    const { user } = useAuth();

    const params = useParams<FaqParams>();

    const [ titulo, setTitulo ] = useState('');
    const [ nome, setNome ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ email, setEmail ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ descricao, setDescricao ] = useState('')

    
    useEffect(()=>{

        // if(!user){
        //     throw new Error("Você precisa estar autenticado para visualizar seu FAQ");   
        // }
        
        const faqRef = database.ref(`faq/${user?.id}/${params.id}`)

        faqRef.once('value', faq=>{
            const faqValue = faq.val();

            setTitulo(faqValue.title)
            setEmail(faqValue.email)
            setCategoria(faqValue.category)
            setDescricao(faqValue.description)
            setNome(faqValue.name)
            setStatus(faqValue.status)
        })
    },[params.id])

    async function handleCloseCase() {
        const faqRef = database.ref(`faq/${user?.id}/${params.id}`)
    }

    return(
        <div>
            <NavBar/>
            <div className="card m-5 d-flex flex-column min-vh-100">
                <h4>Nome: {nome}</h4>
                <h4>Email: {email}</h4>
                <h4>Categoria: {categoria}</h4>
                <h4>Status: {status}</h4>
                <h4>Titulo: {titulo}</h4>
                <h4>Descrição: {descricao}</h4>
            </div>
            <Footer/>
        </div>
    )
}