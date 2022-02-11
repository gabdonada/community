import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import { Login } from "./pages/login/Login";
import { Home } from './pages/home/Home';
import { CriarEvento } from './pages/eventos/criarEvento/CriarEvento';
import { CriarFaq } from './pages/faq/criarFaq/CriarFaq';
import { EventoIndex } from './pages/eventos/eventoPage/EventoIndex';
import { VisualizaFaq } from './pages/faq/visualizarFaq/VisualizaFaq';






function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>

          <Route path="/Evento/Novo" element={<CriarEvento/>}/>
          <Route path="/Evento/:id" element={<EventoIndex/>}/>

          <Route path="/FAQ/Novo" element={<CriarFaq/>}/>
          <Route path="/FAQ/:id" element={<VisualizaFaq/>}/>
        
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
