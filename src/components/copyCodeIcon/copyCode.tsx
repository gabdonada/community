import { Button } from "../button/Button";

type Code = {
    id: string;
    textBut: string;
}

export function CopyCode(props: Code){
    function copyCodeToClipboard(){
        navigator.clipboard.writeText(props.id);
    }

    return(
        <Button onClick={copyCodeToClipboard}>
            <span>{props.textBut}: {props.id}</span>
        </Button>
    )
}