import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <p 
                onClick={() => onRouteChange('signin')} 
                className='f3 linnk dim black underline pa3 pointer'
                >Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <p 
                onClick={() => onRouteChange('signin')} /* it makes isSignedIn false*/
                className='f3 linnk dim black underline pa3 pointer'
                >Sign In</p>
                <p onClick={() => onRouteChange('register')} /* it makes this.state.route on app class equals to register  */
                className='f3 linnk dim black underline pa3 pointer'>
                    Register</p>
            </nav>
        )
    }
}
export default Navigation;