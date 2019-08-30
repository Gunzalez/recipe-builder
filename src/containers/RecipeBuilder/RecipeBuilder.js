import React, { Component } from 'react';
import ReciperReader from '../../components/RecipeReader/RecipeReader';
import Ingredient from '../../components/Ingredient/Ingredient';

class RecipeBuilder extends Component {

    state = { 
        name: '',
        ingredients: []
    }

    addIngredient = () => {
        console.log('Adds ingredient');
        this.setState({ ingredients: [            
            ...this.state.ingredients,
            { 
                key: Date.now(), 
                text: '' 
            }] 
        });
    }

    canBeSubmit = () => {
        const { ingredients, name } = this.state
        return !ingredients.length || !name.length
    }

    formChangeHandler = (e) => {
        const identifier = e.target.dataset.name;
        switch(identifier){
            case 'ingredient':
                const ingredients = this.state.ingredients.map(ingredient => {
                    if(ingredient.key.toString() === e.target.dataset.key.toString()){
                        ingredient.text = e.target.value;
                        return ingredient
                    } else {
                        return ingredient;
                    }
                })
                this.setState({ ingredients });
                break;             
            default:
                this.setState({ [identifier]: e.target.value });
                break;
        }
    }

    removeItemHandler = (key, itemType) => {
        console.log(itemType);
        switch(itemType){
            case 'ingredient':
                {
                    const ingredients = [...this.state.ingredients];
                    const index = this.state.ingredients.findIndex(ingredient => ingredient.key === key);
                    ingredients.splice(index, 1);
                    this.setState({ ingredients });
                    break;
                }
            case 'content':
                {
                    const additionalContent = [...this.state.additionalContent];
                    const index = this.state.additionalContent.findIndex(content => content.key === key);
                    additionalContent.splice(index, 1);
                    this.setState({ additionalContent });
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

    componentDidMount() {
        if(!this.state.ingredients.length){
            this.addIngredient();
        }
    };

    keyDownHandler = (e) => {
        var keynum;
        if(window.event) { // IE                    
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
            keynum = e.which;
        }
        if(keynum === 13){
            this.addIngredient();
        }      
    }

    inputPasteHandler = () => {
        console.log('Deep');
    }

    render() {

        const { state: { 
                name, ingredients
            }, 
            formSubmitHandler,
            formChangeHandler,
            removeItemHandler,
            inputPasteHandler,
            keyDownHandler,
            addIngredient,
            canBeSubmit,
            saveRecipe 
        } = this;

        let ingredientsList = <p>Recipe needs at least one ingredient.</p>;
        if(ingredients.length){
            ingredientsList = ingredients.map(ingredient => {
                const  { key, text } = ingredient;
                return <Ingredient
                    key={key}
                    dataKey={key}
                    ingredient={text}
                    inputPastedInto={ inputPasteHandler }
                    inputKeyDowned={(e) => { keyDownHandler(e) }}
                    removeIngredient={() => { removeItemHandler(key,'ingredient')}}
                    />
            })
        }
        
        return (
            <div className={'demo'}>
                <ReciperReader recipe={this.state} />
                <form onSubmit={formSubmitHandler} onChange={formChangeHandler}>

                    <div className='form-group'>

                        <label htmlFor='name'>Recipe title</label>

                        <input type='text'
                            className='form-control'
                            data-name='name' 
                            defaultValue={name} />
                        </div>

                        <p>Ingredients (at least one)</p>
                        <fieldset>
                            { ingredientsList }
                        </fieldset>

                        <div className='text-right'>
                            <button type='button' className='btn btn-default'
                                onClick={addIngredient}>
                                    <i className="material-icons">add</i>
                            </button>
                        </div>

                        <button type='submit' className={'btn btn-success'}
                            onClick={ saveRecipe }
                            disabled={ canBeSubmit() }>Save recipe</button>

                </form>
            </div>
        );
    }
}

export default RecipeBuilder;