import React, { Component, Suspense, lazy } from 'react';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer'
import { Switch, Route, Redirect } from 'react-router';
import BurgerBuilder from '../../containers/BurgerBuilder';
// import Checkout from '../../containers/Checkout';
// import Orders from '../../containers/Orders';
// import Auth from '../../containers/Auth';
import { connect } from 'react-redux';
import Logout from '../../containers/Auth/Logout';

const Checkout = lazy(() => import('../../containers/Checkout'));
const Orders = lazy(() => import('../../containers/Orders'));
const Auth = lazy(() => import('../../containers/Auth'));

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
        let routes = (
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/burger-builder" component={BurgerBuilder} />
                    <Redirect to="/burger-builder" />
                </Switch>            
        );
        if(this.props.isAuth){
            routes = (
                <Switch>
                    <Route path="/burger-builder" component={BurgerBuilder} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Redirect from="/" to="/burger-builder" />
                </Switch>
            );
        }
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawer}/>
                
                <SideDrawer 
                isAuth={this.props.isAuth}
                toggleSideDrawer={this.toggleSideDrawer}
                show={this.state.showSideDrawer}/>

                <main className={classes.content}>
                    {/* {this.props.children} */}
                    <Suspense fallback={<div>... Loading</div>}>
                        {routes}
                    </Suspense>
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state=> {
    return{
        isAuth: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);