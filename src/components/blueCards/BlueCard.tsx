import moment from "moment"
import './style.scss'

type Card = {
    id: string,
    titulo: string,
    categoria: string,
    dataInicio: string
} | undefined

export function BlueCard(props: {props: Card}){

    return(
        <a href={`/Evento/${props.props?.id}`} className="text-decoration-none link-dark m-1 w-100" >
            <div className="d-flex align-items-center primaryColor primaryTextColor space">
                <div className="d-flex flex-column align-items-center w-25">
                        <h6>{moment(props.props?.dataInicio).format("DD")}</h6>
                        <h6>{moment(props.props?.dataInicio).format("MMMM")}</h6>
                </div>
                <div className="bar"></div>
                <h6>{props.props?.titulo}</h6>
            </div>
        </a>
    )
}