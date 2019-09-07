import React from 'react';
import ConfirmButton from '../UI/ConfirmButton/ConfirmButton';

const ingredient = ({ 
        dataKey, 
        ingredient, 
        removeIngredient, 
        inputKeyDowned, 
        confirmRemove,
        clearRemove, 
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
                    title='Paste or type and press Return/Enter'
                    onClick={clearRemove}
                    onFocus={(e)=> {
                        let temp_value = e.target.value;
                        e.target.value = '';
                        e.target.value = temp_value;
                    }}
                    autoFocus></textarea>

                <ConfirmButton
                    deleteState={deleteState}
                    removeIngredient={removeIngredient}
                    confirmRemove={confirmRemove} 
                    />

            </div>

        </div>
    );
}

export default ingredient;