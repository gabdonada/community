type Card = {
    id: string,
    titulo: string,
    categoria: string,
    dataInicio: string
}

export function EventCard(props: {props: Card}){
    return(
        <a href={`/Evento/${props.props.id}`} className="text-decoration-none link-dark">
            <div className="d-flex card mb-3">
                <div className="d-flex flex-column align-items-center">
                    
                        <h1>31</h1>
                    
                        <h1>Dec</h1>
                    
                </div>
                <div>
                    {props.props.titulo}
                </div>
                <div>
                    Confirmados
                </div>
            </div>
        </a>
        
    )
}