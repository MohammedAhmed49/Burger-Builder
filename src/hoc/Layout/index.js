import React, { Component } from 'react';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    toggleSideDrawer = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        });
    }
    render(){
        return (
            <Auxiliary>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
                
                <SideDrawer 
                toggleSideDrawer={this.toggleSideDrawer}
                show={this.state.showSideDrawer}/>

                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;