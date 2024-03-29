import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import illustrationImg from './images/illustration.svg'
import googleLogo from './images/googleLogo.svg'
import './styleLogin.scss'
import { FormEvent, useState } from 'react'
import { database } from '../../services/firebase'
import logo from '../../assets/images/logoLogin.png'

export function Login(){

    const navigate = useNavigate(); //use to navigate to other pages

    const [ eventCode, setEventCode ] = useState('');

    const { user, singIngWithGoogle} = useAuth();

    async function handleAuthGoogle(event: FormEvent) {
        event.preventDefault();
        
        if(!user){
            await singIngWithGoogle();
        }
        
        navigate('/home');      
        
    }

    async function handleJoinEvent(event: FormEvent){
        event.preventDefault();

        if(eventCode.trim() === ''){
            alert("Você deve digitar um codigo de evento para acessar a pagina de eventos");
        }else{
            const eventRef = await database.ref(`eventos/${eventCode}`).get(); //checking if the eventkey exists under eventos list in json; get returns all data from the event if exists

            if(!eventRef.exists()){
                alert("Código do evento inválido, digite um código válido");
            }else{
                navigate(`/evento/${eventCode}`);
            }
        }
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
                    <img src={logo} alt="Quero Ajudar Logo" />

                    <button className="googleButton" onClick={handleAuthGoogle}>
                        <img src={googleLogo} alt="Clique para acessar usando conta Google" />
                        Acesse com o Google
                    </button>


                    <div className="separator"> ou </div>
                    <form onSubmit={handleJoinEvent} className="d-flex">
                        <input 
                            type="text" 
                            placeholder='Digite o Código do Evento'
                            onChange={event => setEventCode(event.target.value)}
                            value={eventCode}
                        />
                        <button type="submit"><strong>&rarr;</strong></button>
                    </form>

                </div>

            </main>
        </div>
    )
}