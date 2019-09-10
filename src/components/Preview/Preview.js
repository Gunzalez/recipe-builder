import React from 'react';

import { hasAtleastOne } from '../../helpers';

const reciperReader = (props) => {

    const { recipe: { 
        name, 
        introduction, 
        ingredients, 
        instructions, 
        additonal }
    } = props;
    
    return (
        <div className={'reader'}>

            <div className='header'>
                <span>Preview </span>
                {/* <span className='pill'>You have unsaved changes!</span> */}
            </div>

            <article className={'h-recipe'}>
                { name.length ? <h3 className='p-name'>{ name }</h3> : null }
                { introduction.length ? <div className='content'>{ introduction }</div> : null }
                { hasAtleastOne(ingredients) && <h4>Ingredients</h4> }
                { hasAtleastOne(ingredients) && 
                    <ul>
                        { ingredients.map((ingredient, idx) => {
                            return <li key={idx} className='p-ingredient'>{ ingredient }</li>
                        })}
                    </ul>
                }
                { hasAtleastOne(instructions) && <h4>Instructions</h4> }
                { hasAtleastOne(instructions) && 
                    <div className={'e-instructions'}>
                        <ol>
                            { instructions.map((instruction, idx) => {
                                return <li key={idx} className='o-instructions'>{ instruction }</li>
                            })}
                        </ol>
                    </div>
                }
                { additonal.length ? <div className='content'>{ additonal }</div> : null }
                
            </article>

            { name.length && hasAtleastOne(ingredients) ? 
                <div className='whisk'>
                    <p>Whisk buttons will appear below the recipe</p>
                    <div className='buttons'>&nbsp;</div>
                </div>
                :
                null
            }

        </div>
    );
}

export default reciperReader;