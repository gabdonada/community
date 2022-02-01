import './footerStyle.scss'

import facebookIcon from './img/facebookIcon.svg'
import instagramIcon from './img/instagramIcon.svg'
import linkIcon from './img/linkIcon.svg'

export function Footer(){

    return(
        <footer className='mt-auto'>
            <div className='blueLight'></div>
            <div className='contentFooter'>
                <div className='icons'>
                    <a href="#"><img src={instagramIcon} alt="Link para nossa pagina no Instagram" /></a>
                    <a href="#"><img src={facebookIcon} alt="Link para nossa pagina no Facebook" /></a>
                    <a href="#"><img src={linkIcon} alt="Link para nossa pagina no Linkedin" /></a>
                </div>

                <div className='links'>
                    <a href="#">Termos de Uso</a>
                    <a href="#">FAQ</a>
                    <a href="#">Sobre a Iniciativa</a>
                </div>

                <div className='copyRight'>
                    <p>&copy; 2022 Copy Right</p>
                </div>
                

            </div>
        </footer>        
    )
}