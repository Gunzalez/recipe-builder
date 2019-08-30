import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, ingredients }} = props;

    return (
        <div className={'reader'}>

            <p>As displayed on Product page</p>
            <hr />

            <article className={'h-recipe'}>

                <h4 className='p-name'>{name}</h4>

                <ul>
                    { ingredients.map((ingredient, idx) => {
                        return ingredient.text.length ? <li key={idx} className='p-ingredient'>{ingredient.text}</li> : null
                    })}
                </ul>

            </article>

        </div>
    );
}

export default reciperReader;