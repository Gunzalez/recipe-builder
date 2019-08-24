import React from 'react';

const ingredient = ({ ingredient, changeIngredient, removeIngredient }) => {
    return (
        <div className='form-group'>
            <div className='ingredient-row'>

                <input type='text'
                    className='form-control'
                    value={ingredient}
                    placeholder={'New ingredient'}
                    onChange={changeIngredient} />

                <button className='btn btn-default'
                    onClick={removeIngredient}>
                    <i className="material-icons">clear</i>
                </button>
            </div>
        </div>
    );
}

export default ingredient;