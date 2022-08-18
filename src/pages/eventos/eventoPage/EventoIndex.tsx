import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyCode } from "../../../components/copyCodeIcon/copyCode";
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';
import moment from 'moment';
import { Button } from '../../../components/button/Button';
import { ButtonDanger } from '../../../components/button/ButtonDanger';
import { Comments } from '../../../components/commentsCard/comments';
import { useEvent } from '../../../hooks/useEvent';
import { navigate } from '@reach/router';

import deleteImg from '../../../assets/images/deleteImg.svg'
import checkImg from '../../../assets/images/check.svg'

import './eventoIndexStyle.scss'

type EventParms = {
    id: string;
}

export function EventoIndex(){

    const { user } = useAuth()
    const params = useParams<EventParms>();

    const eventID = params.id;
    const { evento, comments } = useEvent(eventID || "");

    const [ newComment, setNewComment ] = useState('');

    const [ confirmMessage, setConfirmMessage ] = useState(evento?.confirmadosN+" - Confirmado(s)")

    async function handleEventCancelation() {
        let confirm = window.confirm("Clique em OK para cancelar");
        if(confirm){
            await database.ref(`eventos/${eventID}`).update({
                canceled:'Y'
            })
            alert("Cancelado com sucesso")
        }
    }
    
    async function handleNoEvent() {
        setConfirmMessage(evento?.confirmadosN+" - Confirmado(s)")
        const eventRef = await database.ref(`eventos/${eventID}`).get(); //checking if the eventkey exists under eventos list in json; get returns all data from the event if exists

            if(!eventRef.exists()){
                navigate('/Evento/NaoLocalizado')
            }
    }

    async function handleNewComment(event: FormEvent) {
        event.preventDefault();

        if(newComment.trim()===''){
            alert("Você precisa adicionar palavras para comentar.")
            return;
        }

        if(!user){
            throw new Error("Você não está autenticado")
        }

        const comment = {
            content: newComment,
            author:{
                name: user.name,
                avatar: user.avatar,
                userId: user.id
            },
            isHighlighted: false
        };

        await database.ref(`eventos/${eventID}/comentarios`).push(comment);

        setNewComment('');
    }
    
    async function handleLikeComment(coomentId: string, likeId: string | undefined) {
        if(likeId){
            await database.ref(`eventos/${eventID}/comentarios/${coomentId}/likes/${likeId}`).remove();
        }else{
            await database.ref(`eventos/${eventID}/comentarios/${coomentId}/likes`).push({
                authorId: user?.id
            })
        }
    }


    async function handleDenounce(){

        const faqRef = database.ref(`faq/${user?.id}`); //fiding FAQ reference in DB.

        await faqRef.push({
            authorId: user?.id,
            name: user?.name,
            status: "Aberto",
            title: "Denuncia Evento - "+evento?.titulo+" - ID "+params.id,
            email: user?.userEmail,
            category: "Denuncia",
            description: "Denúncia do Evento '"+evento?.titulo+"' ID do evento: "+params.id 
        });

        alert("Denúncia criada com sucesso.")
    }




    async function handleContMe(event: FormEvent){
        event.preventDefault();

        if(!user){
            throw new Error("Você deve estar logado para confirmar presença");
        }

        const userConfirmation = {
            confirmedByUserID: user.id,
            confirmedByUserName: user.name,
            confirmedByUserAvatar: user.avatar
        }

        if(evento?.likeIDfromCurrentUser === undefined){
            await database.ref(`/eventos/${params.id}/confirmados`).push(userConfirmation)
        }else{
            await database.ref(`/eventos/${params.id}/confirmados/${evento?.likeIDfromCurrentUser.id}`).remove()
        }
        
    }

    async function handleDeleteComment(commentId: string) {
        if(window.confirm('Você deseja excluir este comentário?')){ //confirm returns a boolean 
            await database.ref(`eventos/${eventID}/comentarios/${commentId}`).remove();
        }
    }

    async function handleHighlightComment(commentId: string, highlightStatus: boolean) {
        if(highlightStatus === false){
            await database.ref(`eventos/${eventID}/comentarios/${commentId}`).update({
                isHighlighted: true
            }); 
        }else{
            await database.ref(`eventos/${eventID}/comentarios/${commentId}`).update({
                isHighlighted: false
            }); 
        }
    }


    
    return(
        <div onLoad={handleNoEvent} className="eventIndex">
            <NavBar/>

            <div className="card d-flex flex-column cardElement">
                <header className='d-flex justify-content-center'>
                    <h1>{evento?.titulo}</h1>

                    {evento?.cancelado ? (
                        <h1 className='canceladoDiv'> Cancelado</h1>
                    ):(
                        <></>
                    )}
                    
                </header>

                <div className="d-flex flex-column gap-3 mt-4">
                    
                    <h3>Categoria: {evento?.categoria}</h3>
                    <h3>Inicio: {moment(evento?.dateS).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Fim: {moment(evento?.dateE).format("DD-MM-YYYY HH:mm:ss") }</h3>
                    <h3>Descrição: {evento?.descricao.split("\n").map(line=><div>{line}</div>)} </h3>
                    
                    <div>
                        <h3>Onde? </h3>
                            {evento?.online === true ?
                            (
                                <div>
                                    <h3> Link Online: <a href={evento.url}>{evento.url}</a></h3>
                                    
                                </div>
                            ):(<div></div>)}

                            {evento?.presencial === true ?
                            (
                                <div>
                                    <h3>Local: {evento.estado}, {evento.cidade}, {evento.bairro}, {evento.rua}</h3>
                                </div>
                            ):(<div></div>)}
                    </div>
                    
                    
                    <p className="opacity-50">Criado por: <a href={`/Perfil/${evento?.author.authorId}`}>{evento?.author.authorName}</a></p>

                </div>
                
                <div>
                    { user ?  (
                        <div className='d-flex align-items-center justify-content-between'>
                            {moment(evento?.dateE).isAfter() && evento?.cancelado === false ?(
                                
                                    evento?.likeIDfromCurrentUser === undefined ? (
                                        <Button onClick={handleContMe} type={'submit'}> Confirmar Presença</Button>
                                    ):( 
                                        <Button onClick={handleContMe} type={'submit'} onMouseEnter={() => setConfirmMessage("Remover Presença")} onMouseLeave={()=> setConfirmMessage(evento.confirmadosN+" - Confirmado(s)")}> {confirmMessage} </Button>
                                    )
                            ):(
                            <></>
                            )}
                            <div className="dropdown">
                                <button className="btn btn-light border border-3 rounded-circle border-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    ...
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#"><CopyCode id={params.id || 'No Code'} textBut={'Copiar ID'} /></a></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleDenounce}>Denunciar ou Relatar Problema</a></li>
                                    { user.id === evento?.author.authorId ? (
                                        evento?.cancelado === false ?  <li><a className="dropdown-item text-danger" href="#" onClick={handleEventCancelation}>Cancelar Evento</a></li>
                                        : <></>
                                    ):(<></>)}
                                    
                                </ul>
                            </div>
                            
                            
                                
                        </div>
                        
                        
                    ) : (
                        <span>Para confirmar prenença, <button>faça seu login</button>.</span>
                    )}
                </div>
                
            </div>

            <div>
                <form onSubmit={handleNewComment}>
                    <textarea 
                        placeholder="Digite seu comentário"
                        onChange={event => setNewComment(event.target.value)}
                        value={newComment}                        
                    />
                
                    <div className="form-footer">
                        { user ? ( //this is an IF to check if the user is authenticated
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div> //in case that the user is logged
                        ) : (
                            <span>Para fazer um comentário, <button>Faça seu login</button>.</span> // In case that the user is not logged
                        ) }
                        <Button type="submit" disabled={!user}>Comentar</Button>
                    </div>
                </form>
            </div>

            <div className="question-list">
                    {comments.map(comments =>{{/* just like for each */}
                        return (
                            <Comments
                                key = {comments.id}
                                content = {comments.content}
                                author = {comments.author}
                                isHighlighted = {comments.isHighlighted}
                            >
                                
                                    <button
                                    //className={`like-button ${question.hasLiked ? 'liked': ''}`}
                                    className={`like-button ${comments.likeId ? 'liked': ''}`}
                                    type="button"
                                    aria-label="Marcar como gostei"
                                    onClick={() => handleLikeComment(comments.id, comments.likeId)} //when using an onClicl you can't call the func like this 'handleLikeQuestion(question.id)'
                                    >
                                
                                        { comments.likeCount > 0 && <span>{comments.likeCount}</span> } {/** it'll show just when there is a likeCount > 0 */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                    </button>

                                    {evento?.author.authorId === user?.id ? (
                                        <>
                                            <button
                                            type="button"
                                            onClick={()=> handleDeleteComment(comments.id)}
                                            >
                                                <img src={deleteImg} alt="Remover Pergunta"/>
                                            </button>

                                            <button
                                            type="button"
                                            onClick={()=> handleHighlightComment(comments.id, comments.isHighlighted)}
                                            >
                                            <img src={checkImg} alt="Destacar pergunta"/>

                                            </button>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                

                            </Comments>
                        );
                    })}
                </div>

        </div>
    )
}