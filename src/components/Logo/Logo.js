import React from 'react';
import './Logo.css';
import LogoBold from './LogoBold'
import Tilt from 'react-parallax-tilt';
import { AiFillInstagram, AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai';


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt scale={1.1} className='Tilt br-100 shadow-2'>
                <a href="https://github.com/Stefan-migo" target="_blank"><LogoBold className='br-100 logo' /></a>
            </Tilt>
            <div className='logoContainer'>
                <h4>Web App created by:</h4>
                <h3>Stefan Miranda</h3>
            </div>
            <p className="icons">
                    <a href='https://www.instagram.com/leberland/' target="_blank"><AiFillInstagram /></a>
                    <a href='https://github.com/Stefan-migo' target="_blank"><AiOutlineGithub /></a>
                    <a href='https://www.linkedin.com/in/stefan-miranda-gonzalez-787387118/' target="_blank"><AiOutlineLinkedin /></a>
            </p>

        </div>
    )
}
export default Logo;