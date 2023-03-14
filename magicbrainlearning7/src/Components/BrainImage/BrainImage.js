import React from 'react';
import Tilt from 'react-parallax-tilt';
import BrainImageLogo from './magicBrain.png';

const BrainImage = () => {
    return (
        <div className='grow' style={{ height: '150px', width: '150px' }}>
            <Tilt className='shadow-5 br3 ma4' style={{ height: '150px', width: '150px' }}>
                <div className=' center pa2'>
                    <img alt='Brain Logo' src={BrainImageLogo} height='130px' width='130px'/>
                </div>
            </Tilt>
        </div>
    )
}

export default BrainImage;