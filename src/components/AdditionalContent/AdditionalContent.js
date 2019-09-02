import React from 'react';

const additionalContent = ({ position, content }) => {

    return (
        <div className='form-group'>
            <div className='content-row'>

                <textarea data-name={position}
                    className='form-control'
                    placeholder='e.g. Intorduction to the recipe'
                    defaultValue={content}></textarea>
            </div>
        </div>
    );
}

export default additionalContent;