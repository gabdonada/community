import giphy from '../../../assets/images/giphySad.gif'

export function NoEvent(){
        
    return(
        <div className="container d-flex justify-content-center ">
            <div className="row ">
                <div className="col-md-12">
                    <div className="error-template d-flex flex-column align-items-center">
                        <img src={giphy} alt="Página não encontrada" />
                        <h1 className="mb-3">Oops!</h1>
                        <h2 className="mb-3">Evento não econtrado</h2>
                        <div className="error-details mb-3">
                            Desculpe, algum erro ocorreu em sua pesquisa. Este evento não existe.
                        </div>
                        <div className="error-actions d-flex justify-content-center">
                            <a href="/" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                Voltar Ao Inicio </a><a href="/FAQ/Novo" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contatar Suporte </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}