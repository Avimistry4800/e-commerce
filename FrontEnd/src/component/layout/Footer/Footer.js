import React from 'react'
import playStore from '../../../images/playStore.png'
import appStore from '../../../images/appStore.png'
import './Footer.css'	

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWLOAD OUR APP</h4>
                <p>Download App For Android & ISO mobile Platform</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
                </div>
            <div className="midFooter">
                <h1>ECCOMERCE</h1>
                <p>High Quality is our First Priority</p>
                <p>Copyrights {(new Date().getFullYear())} &copy; AviMistry</p>
                </div>
            <div className="rightFooter">
                <h4>follow Us</h4>
                <a href="https://www.facebook.com/avi.mistry.48 ">Facebook</a>
                <a href="https://www.instagram.com/avimistry480 ">Instagram</a>
                <a href="www.linkedin.com/in/avimistry48 ">Linkedin</a>
                </div>
         </footer>
    )
}

export default Footer;
