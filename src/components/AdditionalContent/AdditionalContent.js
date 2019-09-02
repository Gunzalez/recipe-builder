import React from 'react';

const additionalContent = ({ position, content, helperText }) => {

    return (
        <div className='form-group'>
            <div className='content-row'>

                <textarea data-name={position}
                    className='form-control'
                    placeholder={helperText}
                    defaultValue={content}></textarea>
            </div>
        </div>
    );
}

export default additionalContent;