import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p>This Magic Brain app will detect faces in your picture. Give it a try!</p>
            <div className='shadow-5 br3 pa4 ma2 mw8 center'>
                <input onChange={onInputChange} className='w-70 br2' type='text'/>
                <button onClick={onButtonSubmit} className='w-30 br2 background'>Detect!</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;