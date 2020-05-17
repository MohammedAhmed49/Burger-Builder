import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
    return(
        <li className={classes.NavigationItem}>
            {/* <a href={props.link} className={props.active ? classes.active : null}></a> */}
            <NavLink to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    )
}

export default NavItem;
