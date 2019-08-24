import React from 'react';

const additionalContent = ({ title, body }) => {
    return (
        <div className=''>
            <input type='text'
                value={title}
                />
            <textarea>{ body }</textarea>
        </div>
    );
}

export default additionalContent;