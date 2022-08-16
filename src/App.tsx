import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

//import { Login } from "./pages/login/Login";
import { Home } from './pages/home/Home';
import { CriarEvento } from './pages/eventos/criarEvento/CriarEvento';
import { CriarFaq } from './pages/faq/criarFaq/CriarFaq';
import { EventoIndex } from './pages/eventos/eventoPage/EventoIndex';
import { VisualizaFaq } from './pages/faq/visualizarFaq/VisualizaFaq';
import { PageNotFount } from './pages/errors/404/pageNotFount';
import { BuscarEvento } from './pages/eventos/buscarEvento/BuscarEvento';
import { GerenciarEventos } from './pages/eventos/gerenciarEventos/GerenciarEventos';
import { NoEvent } from './pages/errors/eventoNoExist/NoEvent';
import { VisualizarProfile } from './pages/userProfile/visualizarProfile/VisualizarProfile';
import { Start } from './pages/start/Start';
import { EditUserProfile } from './pages/userProfile/visualizarProfile/EditUserProfile';
import { ListFaq } from './pages/faq/listarFaq/ListFaq';


function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/" element={<Start/>}/>
          <Route path="/Home" element={<Home/>}/>

          <Route path="/Evento/Novo" element={<CriarEvento/>}/>
          <Route path="/Evento/:id" element={<EventoIndex/>}/>
          <Route path="/Evento/Buscar" element={<BuscarEvento/>}/>
          <Route path="/Evento/Gerenciar" element={<GerenciarEventos/>}/>

          <Route path="/Evento/NaoLocalizado" element={<NoEvent/>}/>

          <Route path="/FAQ/listar" element={<ListFaq/>}/>
          <Route path="/FAQ/Novo" element={<CriarFaq/>}/>
          <Route path="/FAQ/:id" element={<VisualizaFaq/>}/>
  

          <Route path="/Perfil/:id" element={<VisualizarProfile/>}/>
          <Route path="/Perfil/Editar/:id" element={<EditUserProfile/>}/>

          <Route path='*' element={<PageNotFount/>} />
          
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
