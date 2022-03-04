import copy from './img/copy.svg'
import './style.scss'


type Code = {
    id: string;
}

export function CopyCode(props: Code){
    function copyCodeToClipboard(){
        navigator.clipboard.writeText(props.id);
    }

    return(
        <button className="room-Code" onClick={copyCodeToClipboard}>
            <div>
                <img src={copy} alt="Copiar código" />
            </div>
            <span>Evento: {props.id}</span>
        </button>
    )
}