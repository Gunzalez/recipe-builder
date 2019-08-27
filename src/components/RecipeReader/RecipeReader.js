import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, ingredients, additionalContent }} = props;

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

                { additionalContent.map((content, idx) => {
                    const { text, body } = content;
                    return (
                        <div key={idx} 
                            className='additional-content'>
                                <h4>{ text }</h4>
                                <p>{ body }</p>
                        </div>
                    )
                })}

            </article>

        </div>
    );
}

export default reciperReader;