import React, { Component, createRef } from 'react';
import Preview from '../../components/Preview/Preview';

import { hasAtleastOne, fakeRecipe } from '../../helpers';

class ListBuilder extends Component {

    constructor(props){
        super(props);
        this.state = { 
            name: '',
            introduction: '',
            ingredients: [],
            instructions: [],
            additonal: ''
        }
        this.recipeTitle = createRef();
        this.recipeIngredients = createRef();
        this.recipeInstructions = createRef();
        this.recipeIntroduction = createRef();
        this.recipeAdditonal = createRef();
    }


    shouldDisableSubmit = () => {
        const { ingredients, name } = this.state;
        const hasOneOrMoreIngredients = hasAtleastOne(ingredients);
        return !hasOneOrMoreIngredients || !name.length
    }

    formChangeHandler = (e) => {
        if(e.target.dataset.type === 'list'){
            const items = e.target.value.split('\n').filter(item => item.trim().length > 0);
            this.setState({ [e.target.name]: items });
        } else {
            this.setState({ [e.target.name]: e.target.value });
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
        const recipe = fakeRecipe();
        this.recipeTitle.current.value = recipe.name
        this.recipeIntroduction.current.value = recipe.introduction
        this.recipeIngredients.current.value = recipe.ingredients.join('\n')
        this.recipeInstructions.current.value = recipe.instructions.join('\n')
        this.recipeAdditonal.current.value = recipe.additonal
        this.setState({ ...recipe })
    };

    keyDownHandler = (e) => {
        let keynum;
        if(window.event) { // IE                    
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
            keynum = e.which;
        }
        if(keynum === 13){
            e.preventDefault();   
        }   
    }

    render() {

        const { state: { 
                name, 
                introduction, 
                ingredients,
                instructions,
                additonal
            }, 
            shouldDisableSubmit,
            formSubmitHandler,
            formChangeHandler,
            keyDownHandler,
            saveRecipe,
            deleteRecipe 
        } = this;

                
        return (
            <div className={'demo'}>
                <form onSubmit={formSubmitHandler} onChange={formChangeHandler}>

                    <div className='form-group'>
                        <label htmlFor='name'>Title *</label>
                        <input type='text'
                            className='form-control'
                            name='name'
                            ref={this.recipeTitle} 
                            placeholder='Recipe title is mandatory'
                            defaultValue={name} />
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="introduction">Introduction</label>
                            <textarea
                                id={'introduction'}
                                ref={this.recipeIntroduction}
                                className='form-control'
                                name={'introduction'}
                                placeholder={'Introduction (optional)'}
                                onKeyDown={keyDownHandler}
                                defaultValue={introduction}></textarea>
                        </fieldset>
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="ingredients">Ingredients *</label>
                            
                            <textarea
                                id={'ingredients'}
                                ref={this.recipeIngredients}
                                className='form-control ingredients'
                                data-type={'list'}
                                name={'ingredients'}
                                placeholder={'Recipe ingredients are mandatory'}
                                defaultValue={ingredients}></textarea>

                            <div className={'help'}>
                                <i className="material-icons">
                                    help_outline
                                </i>
                                <span>This are instructions</span>
                            </div>
                        </fieldset>
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                id={'instructions'}
                                ref={this.recipeInstructions}
                                className='form-control instructions'
                                data-type={'list'}
                                name={'instructions'}
                                placeholder={'Instructions (optional)'}
                                defaultValue={instructions}></textarea>
                        </fieldset>
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="additonal">Additonal copy</label>
                            <textarea
                                id={'additonal'}
                                ref={this.recipeAdditonal}
                                className='form-control'
                                name={'additonal'}
                                placeholder={'Additonal copy (optional)'}
                                onKeyDown={keyDownHandler}
                                defaultValue={additonal}></textarea>
                        </fieldset>
                    </div>
                        

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