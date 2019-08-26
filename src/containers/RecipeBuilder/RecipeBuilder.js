import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux'
import ReciperReader from '../../components/RecipeReader/ReciperReader';
import Ingredient from '../../components/Ingredient/Ingredient';


class RecipeBuilder extends Component {
    state = { 
        name: 'Jesse',
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

    formChangeHandler = (e) => {
        const elmClassName = e.target.className.split(' ')[0];
        switch(elmClassName){
            case 'ingredient':
                const ingredients = this.state.ingredients.map(ingredient => {
                    if(ingredient.key == e.target.dataset.id){
                        ingredient.text = e.target.value;
                        return ingredient
                    } else {
                        return ingredient;
                    }
                })
                this.setState({ ingredients }, ()=> { console.log(this.state) });
                break;                
            default:
                this.setState({ [elmClassName]: e.target.value });
                break;
        }
    }

    removeIngredientHandler = (key) => {
        const ingredients = [...this.state.ingredients];
        const index = this.state.ingredients.findIndex(ingredient => ingredient.key === key);
        ingredients.splice(index, 1);
        this.setState({ ingredients });
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
    }

    render() {

        const { state: { 
                name, ingredients
            }, 
            formSubmitHandler,
            formChangeHandler,
            removeIngredientHandler,
            addIngredient 
        } = this;

        let ingredientsList = <p>Please add some ingrediants</p>;
        if(ingredients.length){
            ingredientsList = ingredients.map((ingredient) => {
                const  { key, text } = ingredient;
                return <Ingredient
                    key={key}
                    dataId={key}
                    ingredient={text}
                    removeIngredient={()=> { removeIngredientHandler(key)} } />
            })
        }

        return (
            <Aux>
                <ReciperReader recipe={this.state} />

                <form onSubmit={formSubmitHandler} onChange={formChangeHandler}>

                    <div className='form-group'>

                        <label htmlFor='name'>Recipe name</label>

                        <input type='text'
                            className='name form-control' 
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
                </form>
            </Aux>
        );
    }
}

export default RecipeBuilder;