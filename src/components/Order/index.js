import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.order.ingredients){
        ingredients.push({name: ingredientName, amount: props.order.ingredients[ingredientName]});
    }
    console.log(ingredients);
    const ingredientsOutput = ingredients.map(ingredient => {
        return(
            <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
            key={ingredient.name}>{ingredient.name} {ingredient.amount}</span>
        )
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>${props.order.price.toFixed(2)}</strong></p>
        </div>   
    )
}

export default Order;
