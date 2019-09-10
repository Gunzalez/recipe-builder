import React, { Component } from 'react';
import Preview from '../../components/Preview/Preview';

class ListBuilder extends Component {

    state = { 
        name: '',
        introduction: '',
        ingredients: [],
        instructions: [],
        additonal: ''
    }

    shouldDisableSubmit = () => {
        const { ingredients, name } = this.state;
        const hasOneOrMoreIngredients = ingredients.reduce((combinedText, ingredient)=> {
            return combinedText + ingredient
        }, '').trim().length > 0;
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
        // if(!this.state.ingredients.length){
        //     this.addIngredient();
        // }
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
                addtional
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
                            placeholder='Whisk requires a mandatory title'
                            defaultValue={name} />
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="introduction">Introduction</label>
                            <textarea
                                id={'introduction'}
                                className='form-control'
                                name={'introduction'}
                                placeholder={'Introduction (optional)'}
                                onKeyDown={keyDownHandler}
                                content={introduction}></textarea>
                        </fieldset>
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="ingredients">Ingredients *</label>
                            
                            <textarea
                                id={'ingredients'}
                                className='form-control ingredients'
                                data-type={'list'}
                                name={'ingredients'}
                                placeholder={'Whisk requires at least one ingredient '}
                                content={ingredients}></textarea>

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
                                className='form-control instructions'
                                data-type={'list'}
                                name={'instructions'}
                                placeholder={'Instructions (optional)'}
                                content={instructions}></textarea>
                        </fieldset>
                    </div>

                    <div className='form-group'>
                        <fieldset>
                            <label htmlFor="additonal">Additonal copy</label>
                            <textarea
                                id={'additonal'}
                                className='form-control'
                                name={'additonal'}
                                placeholder={'Additonal copy (optional)'}
                                onKeyDown={keyDownHandler}
                                content={addtional}></textarea>
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