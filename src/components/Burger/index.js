import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient';

const Burger = (props) => {
    let BurgerIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((name, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    }).flat();

    if(BurgerIngredients.length === 0){
        BurgerIngredients = <p>Please add some Ingredients</p>
    }

   
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {BurgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>   
    )
}

export default Burger;
