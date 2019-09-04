import React from 'react';

const confirmButton = ({ deleteState, removeIngredient, confirmRemove }) => {

    return (
        <button type='button' className={deleteState ? 'btn btn-default delete' : 'btn btn-default'}
            onClick={ deleteState ? removeIngredient : confirmRemove }>
                <i className="material-icons">clear</i>
                { deleteState ? <span>Are you sure?</span> : null }
        </button>
    )
}

export default confirmButton;