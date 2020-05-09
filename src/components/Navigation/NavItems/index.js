import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem';

const NavItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul> 
    )
}

export default NavItems;
