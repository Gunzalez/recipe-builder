import React from 'react';
import ConfirmButton from '../UI/ConfirmButton/ConfirmButton';


const ingredient = ({ 
        dataKey, 
        ingredient, 
        removeIngredient, 
        inputKeyDowned, 
        confirmRemove, 
        deleteState }) => {
    return (
        <div className='form-group'>
            <div className='ingredient-row'>

                <i className="material-icons drag-icon">drag_indicator</i>

                <input type='text'
                    className='form-control'
                    data-name='ingredient'
                    defaultValue={ ingredient } 
                    onKeyDown={ inputKeyDowned }
                    data-key={ dataKey }
                    autoFocus />

                <ConfirmButton
                    deleteState={deleteState}
                    removeIngredient={removeIngredient}
                    confirmRemove={ confirmRemove}
                    />
            </div>

        </div>
    );
}

export default ingredient;