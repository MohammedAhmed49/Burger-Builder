import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

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
        totalPrice: 3,
        purchasable: false,
        purchasing: false
    }

    updatePurchasable = () => {
        const summingFunc = (newVal, current) => newVal + current;
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce(summingFunc);

        this.setState({purchasable: sum > 0});
    }


    addIngredient = (type) => {
        const newIngredients = this.state.ingredients;
        newIngredients[type]++;
        
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type]

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });

        this.updatePurchasable();
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

        this.updatePurchasable();
    }
    purchasingHandler = () => {
        this.setState({purchasing: true});
    }
    cancelPurchasing = () => {
        this.setState({purchasing: false});
    }
    order = () => {
        alert('You are ordering!');
    }

    render(){
        const disabledIngredients = {};

        for(let ingredient in this.state.ingredients){
            disabledIngredients[ingredient] = this.state.ingredients[ingredient] <= 0;
        }

        return(
            <Auxiliary>
                <Modal 
                show={this.state.purchasing}
                closeModal={this.cancelPurchasing}>

                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancelPurchasing={this.cancelPurchasing}
                    order={this.order}
                    price={this.state.totalPrice}/>

                </Modal>

                <Burger ingredients={this.state.ingredients}/>

                <BuildControls 
                addIngredient={this.addIngredient} 
                removeIngredient={this.removeIngredient}
                disabledIngredients={disabledIngredients}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                purchasing={this.purchasingHandler}
                />

            </Auxiliary>
        )
    }
}

export default BurgerBuilder;