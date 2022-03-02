import { useEffect, useState } from "react"
import { Value } from "sass";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { database } from "../../../services/firebase"

export function BuscarEvento(){
    const [eventValues ,setEventValues] = useState([]);

    useEffect(() =>{
        const eventRef = database.ref(`eventos`);

        eventRef.once('value', evento => {
            
        })

    }, [])

    return(
        <div>
            <NavBar/>

            <div className="min-vh-100">

            </div>

            <Footer/>
        </div>
    )
    
}