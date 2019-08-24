import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux'
import ReciperReader from '../../components/RecipeReader/ReciperReader';
import Ingredient from '../../components/Ingredient/Ingredient';


class RecipeBuilder extends Component {
    state = { 
        name: '',
        ingredients: [
            'Eggs'
        ],
        additionalContent: []
    }

    changeNameHandler = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    addIngredient = () => {
        this.setState({ ingredients: ['', ...this.state.ingredients] })
    }

    changeIngredientHandler = (e, idx) => {
        const value = e.target.value;
        const ingredients = [...this.state.ingredients];
        ingredients[idx] = value;
        this.setState({ ingredients });
    }

    removeIngredientHandler = (idx) => {
        const ingredients = [...this.state.ingredients];
        ingredients.splice(idx, 1);
        this.setState({ ingredients });
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
    }

    render() {

        const { state: { 
                name, 
                ingredients, 
                additionalContent 
            }, 
            formSubmitHandler,
            changeNameHandler,
            removeIngredientHandler,
            changeIngredientHandler,
            addIngredient } = this;

        return (
            <Aux>
                <ReciperReader recipe={this.state} />

                <form onSubmit={formSubmitHandler}>
                    <div className='form-group'>

                        <label htmlFor='name'>Recipe name</label>

                        <input type='text'
                            className='form-control' 
                            value={name} 
                            onChange={changeNameHandler} />
                        </div>

                        <button className='btn btn-default'
                            onClick={addIngredient}>
                                <i className="material-icons">add</i>
                        </button>

                        <fieldset>
                            { ingredients.map((ingredient, idx) => {
                                return <Ingredient
                                    key={idx}
                                    ingredient={ingredient}
                                    removeIngredient={()=> { removeIngredientHandler(idx)}}
                                    changeIngredient={(e)=> { changeIngredientHandler(e, idx)}} />
                            })}
                        </fieldset>
                </form>
            </Aux>
        );
    }
}

export default RecipeBuilder;