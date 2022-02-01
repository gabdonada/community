import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import illustrationImg from './images/illustration.svg'
import googleLogo from './images/appleLogo.svg'
import appleLogo from './images/googleLogo.svg'
import './styleLogin.scss'

export function Login(){

    const navigate = useNavigate(); //use to navigate to other pages

    const { user, singIngWithGoogle} = useAuth();

    async function handleAuthGoogle(){
        
        if(!user){
            await singIngWithGoogle();
        }
        
        navigate('/home');      
        
    }

    function navigateToEntity(){
        navigate('/entidade');
    }


    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando comunicação" />
            
                <strong> Participe de Ações Sociais de seu interesse.</strong>
                <p>Registre e compartilhe eventos &amp; ações gratuitamente.</p>
            </aside>
            <main>
                <div className="main-content">
                    <h1>LOGO VEM AQUI</h1>

                    <button className="googleButton" onClick={handleAuthGoogle}>
                        <img src={appleLogo} alt="Clique para acessar usando conta Google" />
                        Acesse com o Google
                    </button>
                    <button className="appleButton" disabled>
                        <img src={googleLogo} alt="Clique para acessar usando conta Apple" />
                        Acesse com a Apple
                    </button>

                    <div className="separator"> ou </div>
                    <form action="">
                        <input 
                            type="text" 
                            placeholder='Digite o Código do Evento'
                            
                        />
                        <button type="submit"><strong>&rarr;</strong></button>
                    </form>

                    <form action="">
                        <input 
                            type="text" 
                            placeholder='Digite o Código da Entidade/Pessoa'
                        />
                        <button type="submit">&rarr;</button>
                    </form>

                </div>

            </main>
        </div>
    )
}