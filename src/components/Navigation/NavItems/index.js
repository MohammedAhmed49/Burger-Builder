import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem';

const NavItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavItem link="/burger-builder">Burger Builder</NavItem>
            <NavItem link="/orders">Orders</NavItem>
        </ul> 
    )
}

export default NavItems;
