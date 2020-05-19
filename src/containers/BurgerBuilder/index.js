import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import Checkout from '../Checkout';

const INGREDIENTS_PRICES = {
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0,
    salad: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount(){
        Axios.get('/ingredients.json')
        .then(res => this.setState({ingredients: res.data}))
        .catch(error => this.setState({error: 'Ingredients can\'t be loaded!'}));
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
        this.setState({loading: true});
        const params = [];
        for(let item in this.state.ingredients){
            params.push(encodeURIComponent(item) + '=' + encodeURIComponent(this.state.ingredients[item]));
        }
        params.push('price=' + encodeURIComponent(this.state.totalPrice));
        const str = params.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${str}`
        });
    }

    render(){
        const disabledIngredients = {};

        if(this.state.ingredients){
            for(let ingredient in this.state.ingredients){
                disabledIngredients[ingredient] = this.state.ingredients[ingredient] <= 0;
            }
        }
        

        let orderSummary = null;

        

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>{this.state.error}</p> : <Spinner />

        if(this.state.ingredients){
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancelPurchasing={this.cancelPurchasing}
            order={this.order}
            price={this.state.totalPrice}/>;

            burger = (
                <Auxiliary>
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

        return(
            <Auxiliary>
                <Modal 
                show={this.state.purchasing}
                closeModal={this.cancelPurchasing}>

                    {orderSummary}

                </Modal>

                {burger}
            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, Axios);