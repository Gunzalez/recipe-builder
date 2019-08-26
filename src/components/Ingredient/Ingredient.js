import React from 'react';

const ingredient = ({ dataId, ingredient, removeIngredient }) => {
    return (
        <div className='form-group'>
            <div className='ingredient-row'>

                <input type='text'
                    className='form-control'
                    data-name='ingredient'
                    defaultValue={ingredient}
                    data-id={dataId} />

                <button className='btn btn-default'
                    onClick={removeIngredient}>
                    <i className="material-icons">clear</i>
                </button>

            </div>
        </div>
    );
}

export default ingredient;