import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class Logout extends Component{
    componentDidMount() {
        this.props.logout();
    }
    render(){
        return(
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        logout: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);