import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";

export function CriarFaq(){

    return(
        <div>
            <NavBar/>
            
            <div className="card m-5 d-flex flex-column min-vh-100">
                    <div className="card-body">
                        <div className="m-3">
                            <form action="">
                                <label className="form-label">Título do FAQ</label>
                                    <input type="text" className="form-control" placeholder="Digite o título do FAQ..." required/>
                                
                                <label className="form-label mt-4">Email para contato</label>
                                    <input type="email" className="form-control" placeholder="examplo@gmail.com" required/>

                                    
                                
                                <label className="form-label mt-4">Categoria</label>
                                    <select name="" id="" className="form-select" required>
                                        <option value="">Selecione...</option>
                                        <option value="Agradecimento">Agradecimento</option>
                                        <option value="Contato">Contato</option>
                                        <option value="Denuncia">Denúncia</option>
                                        <option value="Duvida">Duvida</option>
                                        <option value="Problema">Relatar Problema</option>
                                        <option value="Sugestao">Sugestão</option>
                                    </select>

                                <label className="form-label mt-4">Descrição</label>
                                <textarea className="form-control" name="" id="" placeholder="Adicione todos os detalhes possíveis para nos auxiliar (links, caminhos, etc...)" required></textarea>
                            
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            <Footer/>
        </div>
    )
}