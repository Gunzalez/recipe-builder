import React from 'react';

const ingredient = ({ dataKey, ingredient, removeIngredient }) => {
    return (
        <div className='form-group'>
            <div className='ingredient-row'>

                <input type='text'
                    className='form-control'
                    data-name='ingredient'
                    defaultValue={ingredient}
                    data-key={dataKey} />

                <button className='btn btn-default'
                    onClick={removeIngredient}>
                    <i className="material-icons">clear</i>
                </button>

            </div>
        </div>
    );
}

export default ingredient;