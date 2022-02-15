import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/button/Button';
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from "../../../hooks/useAuth";
import { database } from '../../../services/firebase';

export function CriarFaq(){

    const { user } = useAuth();

    const navigate = useNavigate();

    const [ titulo, setTitulo ] = useState('');
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState(user?.userEmail ?? '')
    const [ categoria, setCategoria ] = useState('')
    const [ descricao, setDescricao ] = useState('')

    async function handleFAQCreation(event: FormEvent){
        event.preventDefault();

        if(titulo.trim().length < 5){
            alert("Titulo deve conter mais de 5 caracteries.");
        }else if(categoria === ''){
            alert("Você deve selecionar uma categoria valida.");
        }else if(email === ''){
            alert("Digite um email valido");
        }else if(descricao.length < 15){
            alert("Descrição deve conter mais de 15 caracteries.");
        }else if(!user){
            alert("Você deve estar autenticado para enviar mensagens via FAQ")
        }else{
            const faqRef = database.ref(`faq/${user?.id}`); //fiding FAQ reference in DB.

            const firebaseFaq = await faqRef.push({
                authorId: user.id,
                name: user.name,
                status: "Aberto",
                title: titulo,
                email: email,
                category: categoria,
                description: descricao
            });

            navigate(`/faq/${firebaseFaq.key}`)
        }
    }

    return(
        <div>
            <NavBar/>
            
            <div className="card m-5 d-flex flex-column min-vh-100">
                    <div className="card-body">
                        <div className="m-3">
                            <form onSubmit={handleFAQCreation}>
                                <label className="form-label">Título do FAQ</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o título do FAQ..." 
                                        value={titulo} 
                                        onChange={event => setTitulo(event.target.value)}
                                        required/>
                                
                                <label className="form-label mt-4">Email para contato</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="examplo@gmail.com" 
                                        value={email} 
                                        onChange={event => setEmail(event.target.value)}
                                        required/>

                                    
                                
                                <label className="form-label mt-4">Categoria</label>
                                    <select className="form-select" 
                                        value={categoria} 
                                        onChange={event => setCategoria(event.target.value)}
                                        required>
                                        
                                        <option value="">Selecione...</option>
                                        <option value="Agradecimento">Agradecimento</option>
                                        <option value="Contato">Contato</option>
                                        <option value="Denuncia">Denúncia</option>
                                        <option value="Duvida">Duvida</option>
                                        <option value="Problema">Relatar Problema</option>
                                        <option value="Sugestao">Sugestão</option>
                                    </select>

                                <label className="form-label mt-4">Descrição</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Adicione todos os detalhes possíveis para nos auxiliar (links, caminhos, etc...)" 
                                    onChange={event => setDescricao(event.target.value)}
                                    required 
                                    defaultValue={descricao}></textarea>
                            
                                <Button type='submit'>Enviar</Button>
                            </form>
                        </div>
                    </div>
                </div>

            <Footer/>
        </div>
    )
}