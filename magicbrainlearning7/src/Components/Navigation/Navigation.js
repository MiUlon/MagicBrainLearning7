import React from 'react';
import './Navigation.css';

const Navigation = ({ onChangeRouteClick }) => {
    return (
        <div className='navigationMoveToLeft'>
            <p onClick={() => onChangeRouteClick('signin')} className='f3 black grow br3 shadow-5 ma4 pa3 navigationMaxWidth pointer'>Sign Out</p>
        </div>
    )
}

export default Navigation;