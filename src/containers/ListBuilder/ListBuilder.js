import React, { Component } from 'react';
import Preview from '../../components/Preview/Preview';
import Item from '../../components/Item/Item';
import Paragraph from '../../components/Paragraph/Paragraph';

class ListBuilder extends Component {

    state = { 
        name: '',
        topContent: '',
        ingredients: [],
        bottomContent: ''
    }

    addIngredient = (idx) => {
        const freshIngredient = { 
            key: Date.now(), 
            text: '' 
        }
        if(typeof(idx) === 'number' && idx > -1){
            const ingredients = [...this.state.ingredients];
            ingredients.splice(idx + 1, 0, freshIngredient);
            this.setState({ ingredients });
        } else {
            this.setState({ ingredients: [ ...this.state.ingredients, freshIngredient ] });
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
        switch(identifier){
            case 'ingredient':
                const ingredients = this.state.ingredients.map(ingredient => {
                    if(ingredient.key.toString() === e.target.dataset.key){
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
        //console.log(this.state);
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
            const idx = this.state.ingredients.findIndex(ing => ing.key.toString() === e.target.dataset.key);
            this.addIngredient(idx);
        }      
    }


    render() {

        const { state: { 
                name, 
                topContent, 
                ingredients,
                bottomContent
            }, 
            shouldDisableSubmit,
            formSubmitHandler,
            formChangeHandler,
            removeItemHandler,
            keyDownHandler,
            addIngredient,
            saveRecipe 
        } = this;

        let ingredientsList = <p>Recipe needs at least one ingredient.</p>;
        if(ingredients.length){
            ingredientsList = ingredients.map(ingredient => {
                const  { key, text } = ingredient;
                return <Item
                    key={key}
                    dataKey={key}
                    ingredient={text}
                    inputKeyDowned={ keyDownHandler }
                    removeIngredient={() => { removeItemHandler(key,'ingredient')}}
                    />
            })
        }
        
        return (
            <div className={'demo'}>
                <form onSubmit={formSubmitHandler} onChange={formChangeHandler}>

                    <div className='form-group'>

                        <label htmlFor='name'>Recipe title</label>

                        <input type='text'
                            className='form-control'
                            data-name='name' 
                            defaultValue={name} />
                        </div>

                        <fieldset>
                            <Paragraph 
                                position={'topContent'}
                                helperText={'e.g An Introduction to this recipe'}
                                content={topContent}  />
                        </fieldset>

                        <fieldset>
                            { ingredientsList }

                            <div className='text-right'>
                                <button type='button' className='btn btn-default'
                                    onClick={addIngredient}>
                                        <i className="material-icons">add</i>
                                </button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <Paragraph 
                                position={'bottomContent'}
                                helperText={'e.g Any extra information'} 
                                content={bottomContent}  />
                        </fieldset>

                        <button type='submit' className={'btn btn-success'}
                            onClick={ saveRecipe }
                            disabled={ shouldDisableSubmit() }>Save recipe</button>

                </form>
                <Preview recipe={this.state} />
            </div>
        );
    }
}

export default ListBuilder;