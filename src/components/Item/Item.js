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

                <textarea
                    className='form-control'
                    data-name='ingredient'
                    defaultValue={ ingredient } 
                    onKeyDown={ inputKeyDowned }
                    data-key={ dataKey }
                    rows='1'
                    title='While typing press Return/Enter for a new line'
                    autoFocus></textarea>

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