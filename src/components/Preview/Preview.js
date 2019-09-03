import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, ingredients, topContent, bottomContent }} = props;

    const hasOneOrMoreIngredients = ingredients.reduce((combinedText, ingredient)=> {
        return combinedText + ingredient.text
    }, '').trim().length > 0;
    
    return (
        <div className={'reader'}>

            <p>Preview</p>
            <hr />

            <article className={'h-recipe'}>
                { name.length ? <h4 className='p-name'>{ name }</h4> : null }
                { topContent.length ? <p className='content'>{ topContent }</p> : null }
                { hasOneOrMoreIngredients && <p><strong>INGREDIENTS</strong></p> }
                { hasOneOrMoreIngredients && 
                        <ul>
                            { ingredients.map((ingredient, idx) => {
                                return ingredient.text.trim().length ? <li key={idx} className='p-ingredient'>{ingredient.text}</li> : null
                            })}
                        </ul>
                    }
                { bottomContent.length ? <p className='content'>{ bottomContent }</p> : null }
            </article>

        </div>
    );
}

export default reciperReader;