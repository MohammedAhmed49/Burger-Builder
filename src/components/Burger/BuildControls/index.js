import React from 'react';
import BuildControl from './BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
]

const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
            {
                controls.map(control => 
                    <BuildControl 
                    key={control.label} 
                    label={control.label} 
                    addIngredient={props.addIngredient.bind(this, control.type)} 
                    removeIngredient={props.removeIngredient.bind(this, control.type)}
                    disabled={props.disabledIngredients[control.type]}/>
                )
            }
            <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchasing}>{props.isAuth ? 'Order now' : 'Sign in to order'}</button>
        </div>   
    )
}

export default BuildControls;
