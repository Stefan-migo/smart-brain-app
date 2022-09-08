import React from 'react';
import './Logo.css';
import logo from './Logo.png'
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt scale={1.1}  className='Tilt br-100 shadow-2'>
                <img className='br-100' src={logo} alt='logo'/>
            </Tilt>
        </div>
    )
}
export default Logo;