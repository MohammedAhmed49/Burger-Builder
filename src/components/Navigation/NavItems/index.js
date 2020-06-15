import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem';

const NavItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavItem link="/burger-builder">Burger Builder</NavItem>
            
            {props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null}
            {!props.isAuth ? <NavItem link="/auth">Authentication</NavItem> : <NavItem link="/logout">Log Out</NavItem>}
        </ul> 
    )
}

export default NavItems;
