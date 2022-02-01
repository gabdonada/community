import './style.scss'

import { ButtonHTMLAttributes } from 'react';//this import is a Button HTML with all Button caracteries that can be used

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; 

export function Button(props: ButtonProps){

    return(
        <button className="button" {...props}/>

    )
}