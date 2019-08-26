import React from 'react';

const additionalContent = ({ dataKey, title, body, removeContent }) => {

    const titleId = `title-${dataKey}`;
    const bodyId = `body-${dataKey}`;

    return (
        <div className='form-group'>
            <div className='content-row'>

                <label htmlFor={titleId}>Title</label>
                <input type='text'
                    className='form-control'
                    data-name='title'
                    defaultValue={title}
                    id={titleId}
                    data-key={dataKey} />

                <label htmlFor={bodyId}>Content</label>
                <textarea data-name='body'
                    className='form-control'
                    defaultValue={body}
                    id={bodyId}
                    data-key={dataKey}></textarea>

                <button className='btn btn-default'
                    onClick={removeContent}>
                    <i className="material-icons">clear</i>
                </button>

            </div>
        </div>
    );
}

export default additionalContent;