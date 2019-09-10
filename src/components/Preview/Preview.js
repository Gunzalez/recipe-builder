import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, ingredients, topContent, bottomContent }} = props;

    const hasOneOrMoreIngredients = ingredients.reduce((combinedText, ingredient)=> {
        return combinedText + ingredient.text
    }, '').trim().length > 0;
    
    return (
        <div className={'reader'}>

            <div className='header'>
                <span>Preview </span>
                {/* <span className='pill'>You have unsaved changes!</span> */}
            </div>

            <article className={'h-recipe'}>
                { name.length ? <h4 className='p-name'>{ name }</h4> : null }
                { topContent.length ? <div className='content'>{ topContent }</div> : null }
                { hasOneOrMoreIngredients && <p><strong>INGREDIENTS</strong></p> }
                { hasOneOrMoreIngredients && 
                        <ul>
                            { ingredients.map((ingredient, idx) => {
                                return ingredient.text.trim().length ? <li key={idx} className='p-ingredient'>{ingredient.text}</li> : null
                            })}
                        </ul>
                    }
                { bottomContent.length ? <div className='content'>{ bottomContent }</div> : null }
            </article>

            { name.length && hasOneOrMoreIngredients ? 
                <div className='whisk-button'>
                    <p>The Whisk recipe buttons will appear here.</p>
                </div>
                :
                null
            }

        </div>
    );
}

export default reciperReader;