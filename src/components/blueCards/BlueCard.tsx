import moment from "moment"

type Card = {
    id: string,
    titulo: string,
    categoria: string,
    dataInicio: string
}

export function BlueCard(props: {props: Card}){

    return(
        <a href={`/Evento/${props.props.id}`} className="text-decoration-none link-dark m-1 w-100" >
            <div className="d-flex align-items-center primaryColor primaryTextColor">
                <div className="d-flex flex-column align-items-center w-25">
                        <h6>{moment(props.props.dataInicio).format("DD")}</h6>
                        <h6>{moment(props.props.dataInicio).format("MMMM")}</h6>
                </div>
                <h6>{props.props.titulo}</h6>
            </div>
        </a>
    )
}