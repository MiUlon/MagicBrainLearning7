import React from 'react';
import './Navigation.css';

const Navigation = ({ onChangeRouteClick, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <div className='navigationMoveToLeft'>
                <p onClick={() => onChangeRouteClick('signout')} className='f3 black grow br3 shadow-5 ma4 pa3 navigationMaxWidth pointer'>Sign Out</p>
            </div>
        )
            } else {
                return (
                    <div className='navigationMoveToLeft'>
                        <p onClick={() => onChangeRouteClick('signin')} className='f3 black grow br3 shadow-5 ma4 pa3 navigationMaxWidth pointer'>Sign In</p>
                        <p onClick={() => onChangeRouteClick('register')} className='f3 black grow br3 shadow-5 ma4 pa3 navigationMaxWidth pointer'>Register</p>
                    </div>
                )
            }
}

export default Navigation;