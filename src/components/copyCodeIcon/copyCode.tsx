import copy from './img/copy.svg'

type Code = {
    id: string;
}

export function CopyCode(props: Code){
    function copyCodeToClipboard(){
        navigator.clipboard.writeText(props.id);
    }

    return(
        <button onClick={copyCodeToClipboard}>
            <div>
                <img src={copy} alt="Copiar código" />
            </div>
            <span>Código #{props.id}</span>
        </button>
    )
}