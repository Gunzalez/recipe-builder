import React from 'react';

const confirmButton = ({ deleteState, removeIngredient, confirmRemove }) => {

    return (
        <button type='button' className={deleteState ? 'btn btn-default delete' : 'btn btn-default'}
            onClick={ deleteState ? removeIngredient : confirmRemove }>
                <i className="material-icons">remove</i>
                { deleteState ? <span>Delete?</span> : null }
        </button>
    )
}

export default confirmButton;