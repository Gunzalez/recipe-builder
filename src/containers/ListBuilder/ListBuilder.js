import React, { Component } from 'react';
import Sortable from 'react-sortablejs';
import arrayMove from 'array-move';

import Preview from '../../components/Preview/Preview';
import Item from '../../components/Item/Item';
import Paragraph from '../../components/Paragraph/Paragraph';

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

class ListBuilder extends Component {

    state = { 
        name: '',
        topContent: '',
        ingredients: [],
        bottomContent: '',
        idOfItemToRemove: ''
    }

    addIngredient = (idx) => {
        const freshIngredient = { 
            key: Date.now(), 
            text: '' 
        }
        const idOfItemToRemove = '';
        if(typeof(idx) === 'number' && idx > -1){
            const ingredients = [...this.state.ingredients];
            ingredients.splice(idx + 1, 0, freshIngredient);
            this.setState({ ingredients, idOfItemToRemove });
        } else {
            this.setState({ ingredients: [ ...this.state.ingredients, freshIngredient ], idOfItemToRemove });
        }
    }

    shouldDisableSubmit = () => {
        const { ingredients, name } = this.state;
        const hasOneOrMoreIngredients = ingredients.reduce((combinedText, ingredient)=> {
            return combinedText + ingredient.text
        }, '').trim().length > 0;

        return !hasOneOrMoreIngredients || !name.length
    }

    formChangeHandler = (e) => {
        const identifier = e.target.dataset.name;
        const idOfItemToRemove = '';
        switch(identifier){
            case 'ingredient':

                const arrayOfLines = e.target.value.split('\n').filter(singleLine => {
                    if(singleLine.trim().length > 0){
                        return singleLine
                    }
                })
                const ingredients = arrayOfLines.map((singleLine, i) => {
                    return {
                        key: Date.now() + i,
                        text: singleLine
                    }
                })
                switch(ingredients.length){
                    case 0:
                        // do what now?


                        break;
                    case 1:
                        const currentArray = [...this.state.ingredients];
                        const xindex = findWithAttr(currentArray, 'key', parseInt(e.target.dataset.key));
                        currentArray[xindex].text = e.target.value;
                        this.setState({ ingredients: currentArray, idOfItemToRemove });
                        break;
                    default:
                        // replace all of array
                        const existingArray = [...this.state.ingredients];
                        const index = findWithAttr(existingArray, 'key', parseInt(e.target.dataset.key));
                        existingArray.splice(index, 1, ...ingredients);
                        this.setState({ ingredients: existingArray, idOfItemToRemove }); 
                        break;
                }


                
                break;             
            default:                
                this.setState({ [identifier]: e.target.value, idOfItemToRemove });
                break;
        }
    }

    removeItemHandler = (key, itemType) => {
        const idOfItemToRemove = '';
        switch(itemType){
            case 'ingredient':
                {
                    const ingredients = [...this.state.ingredients];
                    const index = this.state.ingredients.findIndex(ingredient => ingredient.key === key);
                    ingredients.splice(index, 1);
                    this.setState({ ingredients, idOfItemToRemove });
                    break;
                }
            case 'content':
                {
                    const additionalContent = [...this.state.additionalContent];
                    const index = this.state.additionalContent.findIndex(content => content.key === key);
                    additionalContent.splice(index, 1);
                    this.setState({ additionalContent, idOfItemToRemove });
                    break;
                }
            default:
                console.log('Oops');
                break;
        }
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
    }

    saveRecipe = () => {
        console.log(this.state);
    }

    deleteRecipe = () => {

    }

    componentDidMount() {
        if(!this.state.ingredients.length){
            this.addIngredient();
        }
    };

    keyDownHandler = (e) => {
        let keynum;
        if(window.event) { // IE                    
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
            keynum = e.which;
        }
        if(keynum === 13){
            const idx = this.state.ingredients.findIndex(ing => ing.key.toString() === e.target.dataset.key);
            this.addIngredient(idx);
            e.preventDefault();   
        }   
    }

    confirmRemoveHandler = (idOfItemToRemove) => {
        this.setState({ idOfItemToRemove })
    }

    itemsReorderHandler = (ingredients) => {
        this.setState({ ingredients });
    }

    render() {

        const { state: { 
                name, 
                topContent, 
                ingredients,
                bottomContent,
                idOfItemToRemove
            }, 
            shouldDisableSubmit,
            confirmRemoveHandler,
            formSubmitHandler,
            formChangeHandler,
            removeItemHandler,
            itemsReorderHandler,
            keyDownHandler,
            addIngredient,
            saveRecipe,
            deleteRecipe 
        } = this;

        let ingredientsList = <p>A Whisk recipe needs at least one ingredient.</p>;
        if(ingredients.length){
            ingredientsList = ingredients.map(ingredient => {
                const  { key, text } = ingredient;
                return <Item
                    key={key}
                    dataKey={key}
                    ingredient={text}
                    inputKeyDowned={keyDownHandler}
                    deleteState={key === idOfItemToRemove}
                    confirmRemove= {() => confirmRemoveHandler(key) }
                    removeIngredient={() => removeItemHandler(key,'ingredient')}
                    />
            })
        }
        
        return (
            <div className={'demo'}>
                <form onSubmit={formSubmitHandler} onChange={formChangeHandler}>

                    <div className='form-group'>

                        <label htmlFor='name'>Whisk recipe title</label>

                        <input type='text'
                            className='form-control'
                            data-name='name' 
                            placeholder='A Whisk recipe must have a title'
                            defaultValue={name} />
                        </div>

                        <fieldset>
                            <Paragraph 
                                position={'topContent'}
                                helperText={'Introduction paragpragh (optional)'}
                                content={topContent}/>
                        </fieldset>

                        <p>Whisk recipe ingredients</p>
                        <fieldset>
                            <Sortable
                                onChange={(order, sortable, evt) => {
                                    const listItems = [...this.state.ingredients]
                                    arrayMove.mutate(listItems, evt.oldIndex, evt.newIndex);
                                    itemsReorderHandler(listItems);
                                }}>
                                { ingredientsList }
                            </Sortable>

                            <div className='add-ingredients'>
                                <button type='button' className='btn btn-default'
                                    onClick={addIngredient}>
                                        <i className="material-icons">add</i>
                                        <span>Add ingredients</span>
                                </button>
                            </div>

                        </fieldset>

                        <fieldset>
                            <Paragraph 
                                position={'bottomContent'}
                                helperText={'Additonal paragpragh (optional)'} 
                                content={bottomContent}  />
                        </fieldset>

                        <div className='form-actions'>

                            {/* <a href='#' className='delete-link'
                                onClick={ deleteRecipe }>Delete recipe</a> */}

                            <button type='submit' className={'btn btn-success'}
                                onClick={ saveRecipe }
                                disabled={ shouldDisableSubmit() }>Save recipe</button>

                        </div>

                </form>
                <Preview recipe={this.state} />
            </div>
        );
    }
}

export default ListBuilder;