import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux'
import ReciperReader from '../../components/RecipeReader/ReciperReader';
import Ingredient from '../../components/Ingredient/Ingredient';


class RecipeBuilder extends Component {
    state = { 
        name: 'Jesse',
        ingredients: ['Eggs', 'Milk', 'Sugar'],
        additionalContent: []
    }

    addIngredient = () => {
        this.setState({ ingredients: ['', ...this.state.ingredients] }, () => { console.log(this.state) });
    }

    formChangeHandler = (e) => {
        const elmClassName = e.target.className.split(' ')[0];
        switch(elmClassName){
            case 'ingredient':
                const ingredients = [...this.state.ingredients];
                ingredients[e.target.dataset.id] = e.target.value;
                this.setState({ ingredients }, ()=> { console.log(this.state) });
                break;                
            default:
                this.setState({ [elmClassName]: e.target.value }, () => { console.log(this.state) });
                break;
        }
    }

    removeIngredientHandler = (idx) => {
        const newIngredients = [...this.state.ingredients];
        console.log(newIngredients);
        console.log(newIngredients[idx]);
        newIngredients.splice(idx, 1);
        this.setState({ingredients: newIngredients }, () => { console.log(this.state) });
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
            ingredientsList = ingredients.map((ingredient, idx) => {
                return <Ingredient
                    key={idx}
                    dataId={idx}
                    ingredient={ingredient}
                    removeIngredient={()=> { removeIngredientHandler(idx)} } />
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