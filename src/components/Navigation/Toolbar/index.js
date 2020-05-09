import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo';
import NavItems from '../NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const Toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggleSideDrawer}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>   
    )
}

export default Toolbar;
