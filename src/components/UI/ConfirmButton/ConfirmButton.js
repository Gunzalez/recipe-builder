import React from 'react';

const confirmButton = ({ deleteState, removeIngredient, confirmRemove }) => {

    let display = (
        <button type='button' className={'btn btn-default'}
            onClick={ confirmRemove }>
                <i className="material-icons">remove</i>
        </button>
    )

    if( deleteState ){
        display = (
            <div className={'btn-outer'}>
                <button type='button' className={'btn btn-default delete'}
                    onClick={ removeIngredient }>
                        <i className="material-icons">remove</i>
                </button>
                <span>Delete?</span>
            </div>
        )
    }

    return display;
}

export default confirmButton;