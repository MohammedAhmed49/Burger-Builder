import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './layout.module.css';

const Layout = (props) => {
    return (
        <Auxiliary>
            <header>header components will go here</header>
            <main className={classes.content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

export default Layout;