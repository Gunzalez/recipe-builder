import React from 'react';

const reciperReader = (props) => {

    const { recipe: { name, introduction, ingredients, instructions, additonal }} = props;

    const hasOneOrMoreIngredients = ingredients.reduce((combinedText, ingredient)=> {
        return combinedText + ingredient
    }, '').trim().length > 0;

    const hasAtLeastOneIntruction = instructions.reduce((combinedText, instruction)=> {
        return combinedText + instruction
    }, '').trim().length > 0;
    
    return (
        <div className={'reader'}>

            <div className='header'>
                <span>Preview </span>
                {/* <span className='pill'>You have unsaved changes!</span> */}
            </div>

            <article className={'h-recipe'}>
                { name.length ? <h3 className='p-name'>{ name }</h3> : null }
                { introduction.length ? <div className='content'>{ introduction }</div> : null }
                { hasOneOrMoreIngredients && <h4>Ingredients</h4> }
                { hasOneOrMoreIngredients && 
                    <ul>
                        { ingredients.map((ingredient, idx) => {
                            return <li key={idx} className='p-ingredient'>{ ingredient }</li>
                        })}
                    </ul>
                }
                { hasAtLeastOneIntruction && <h4>Instructions</h4> }
                { hasAtLeastOneIntruction && 
                    <ol>
                        { instructions.map((instruction, idx) => {
                            return <li key={idx} className='o-instructions'>{ instruction }</li>
                        })}
                    </ol>
                }
                { additonal.length ? <div className='content'>{ additonal }</div> : null }
                
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