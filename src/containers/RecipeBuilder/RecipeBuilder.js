import React, { Component } from 'react';
import ReciperReader from '../../components/RecipeReader/RecipeReader';
import Ingredient from '../../components/Ingredient/Ingredient';
import AdditionalContent from '../../components/AdditionalContent/AdditionalContent';

class RecipeBuilder extends Component {

    state = { 
        name: '',
        ingredients: [],
        additionalContent: []
    }

    addIngredient = () => {
        this.setState({ ingredients: [
            { 
                key: Date.now(), 
                text: '' 
            }, 
            ...this.state.ingredients] 
        });
    }

    addAdditionalContentHandler = () => {
        this.setState({ additionalContent: [
            ...this.state.additionalContent,
            { 
                key: Date.now(), 
                title: '',
                body: ''
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
            case 'title':
                const additionalContent = this.state.additionalContent.map(content => {
                    if(content.key.toString() === e.target.dataset.key.toString()){
                        content.text = e.target.value;
                        return content
                    } else {
                        return content;
                    }
                })
                this.setState({ additionalContent });
                break;    
            case 'body':
                const updatedAdditionalContent = this.state.additionalContent.map(content => {
                    if(content.key.toString() === e.target.dataset.key.toString()){
                        content.body = e.target.value;
                        return content
                    } else {
                        return content;
                    }
                })
                this.setState({ additionalContent: updatedAdditionalContent });
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
        console.log(this.state);
    }

    render() {

        const { state: { 
                name, ingredients, additionalContent
            }, 
            formSubmitHandler,
            formChangeHandler,
            removeItemHandler,
            addIngredient,
            addAdditionalContentHandler,
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
                    removeIngredient={ () => { removeItemHandler(key,'ingredient')} } />
            })
        }

        let additionalContentList = <p>Additonal content is optional</p>;
        if(additionalContent.length){
            additionalContentList = additionalContent.map( content => {
                const  { key, title, body } = content;
                return <AdditionalContent
                    key={key}
                    dataKey={key}
                    title={title}
                    body={body}
                    removeContent={ () => { removeItemHandler(key,'content')} } />
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

                        <div className='text-right'>
                            <button className='btn btn-default'
                                onClick={addIngredient}>
                                    <i className="material-icons">add</i>
                            </button>
                        </div>

                        <fieldset>
                            { ingredientsList }
                        </fieldset>

                        <div className='text-right'>
                            <button className='btn btn-default'
                                onClick={addAdditionalContentHandler}>
                                    <i className="material-icons">add</i>
                            </button>
                        </div>

                        <fieldset>
                            { additionalContentList }
                        </fieldset>

                        <button className={'btn btn-success'}
                            onClick={ saveRecipe }
                            disabled={ canBeSubmit() }>Save recipe</button>

                </form>
            </div>
        );
    }
}

export default RecipeBuilder;