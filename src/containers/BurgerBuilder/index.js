import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';

const INGREDIENTS_PRICES = {
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0,
    salad: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            bacon: 0,
            salad: 0
        },
        totalPrice: 3
    }


    addIngredient = (type) => {
        const newIngredients = this.state.ingredients;
        newIngredients[type]++;
        
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type]

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
    }
    
    removeIngredient = (type) => {
        const newIngredients = this.state.ingredients;
        if(newIngredients[type] <= 0){
            return;
        }
        newIngredients[type]--;
        
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type]

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
    }

    render(){
        const disabledIngredients = {};

        for(let ingredient in this.state.ingredients){
            disabledIngredients[ingredient] = this.state.ingredients[ingredient] <= 0;
        }

        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredient} 
                removeIngredient={this.removeIngredient}
                disabledIngredients={disabledIngredients}
                price={this.state.totalPrice}/>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;