import React from 'react';

const additionalContent = ({ dataKey, title, body, removeContent }) => {

    const titleId = 'title-' + dataKey, bodyId = 'body-' + dataKey;

    return (
        <div className='form-group'>
            <div className='content-row'>

                <label htmlFor={titleId}>
                    Title
                </label>

                <button className='btn btn-default'
                    onClick={removeContent}>
                    <i className="material-icons">clear</i>
                </button>

                <input type='text'
                    className='form-control'
                    data-name='title'
                    defaultValue={title}
                    id={titleId}
                    data-key={dataKey} />

                <label htmlFor={bodyId}>
                    Content
                </label>

                <textarea data-name='body'
                    className='form-control'
                    id={bodyId}
                    defaultValue={body}></textarea>

            </div>
        </div>
    );
}

export default additionalContent;