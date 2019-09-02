import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, ingredients, topContent, bottomContent }} = props;

    let listOfIngredients = null;
    const emptyIngredient = ingredients.length === 1 && ingredients[0].text.length === 0;
    if(ingredients.length){
            if(!emptyIngredient){
            listOfIngredients =  (<ul>
                    { ingredients.map((ingredient, idx) => {
                        return ingredient.text.length ? <li key={idx} className='p-ingredient'>{ingredient.text}</li> : null
                    })}
                </ul>
            )
        }
    }
    

    return (
        <div className={'reader'}>

            <p>Preview</p>
            <hr />

            <article className={'h-recipe'}>
                { name.length ? <h4 className='p-name'>{name}</h4> : null }
                { topContent.length ? <p className='content'>{ topContent }</p> : null }
                { !emptyIngredient ? <h5>INGREDIENTS</h5> : null }
                { listOfIngredients }
                { bottomContent.length ? <p className='content'>{ bottomContent }</p> : null }
            </article>

        </div>
    );
}

export default reciperReader;