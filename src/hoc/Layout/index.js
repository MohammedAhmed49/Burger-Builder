import React, { Component } from 'react';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer'
import { Switch, Route, Redirect } from 'react-router';
import BurgerBuilder from '../../containers/BurgerBuilder';
import Checkout from '../../containers/Checkout';
import Orders from '../../containers/Orders';

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
                    {/* {this.props.children} */}

                    <Switch>
                        <Route path="/burger-builder" component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Redirect from="/" to="/burger-builder" />
                    </Switch>
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;