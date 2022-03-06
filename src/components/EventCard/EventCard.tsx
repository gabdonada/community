import moment from "moment"

type Card = {
    id: string,
    titulo: string,
    categoria: string,
    dataInicio: string
}

export function EventCard(props: {props: Card}){
    return(
        <a href={`/Evento/${props.props.id}`} className="text-decoration-none link-dark">
            <div className="card mb-3 pt-1">
                <div className="d-flex w-100">
                    <div className="d-flex flex-column align-items-center w-25">
                        
                            <h1>{moment(props.props.dataInicio).format("DD")}</h1>
                        
                            <h1>{moment(props.props.dataInicio).format("MMMM")}</h1>
                        
                    </div>

                    <div className="d-flex flex-column justify-content-center w-50">
                        <div></div>
                        <h1>
                            {props.props.titulo}
                        </h1>
                    </div>

                    <div className="d-flex flex-column justify-content-center w-25">
                        <div></div>
                        <h1>
                            Confirmados
                        </h1>
                    </div>
                </div>
            </div>
            
        </a>
        
    )
}