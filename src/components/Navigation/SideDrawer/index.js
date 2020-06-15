import React from 'react';
import Logo from '../../Logo';
import NavItems from '../NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const SideDrawer = (props) => {
    return(
        <Aux>
            <Backdrop 
            show={props.show}
            clicked={props.toggleSideDrawer}/>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;
