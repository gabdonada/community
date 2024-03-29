import moment from "moment"
import './eventCardStyle.scss'

type Card = {
    id: string,
    titulo: string,
    categoria: string,
    dataInicio: string,
    confirmNumb?: number | undefined
}


export function RecursoCard(props: {props: Card}){
    return(
        <a href={`/Recurso/${props.props.id}`} className="text-decoration-none link-dark">
            <div className="card mb-3 pt-1">
                <div className="d-flex w-100">
                    <div className="d-flex flex-column align-items-center wid-date">
                        
                            <h1>{moment(props.props.dataInicio).format("DD")}</h1>
                        
                            <h1>{moment(props.props.dataInicio).format("MMMM")}</h1>
                        
                    </div>

                    <div className="d-flex flex-column justify-content-center wid-title">
                        <div></div>
                        <h1>
                            {props.props.titulo}
                        </h1>
                    </div>
                </div>
            </div>
            
        </a>
        
    )
}