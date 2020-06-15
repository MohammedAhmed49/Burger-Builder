import React, {Component} from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from './auth.module.css';
import {authInit} from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {
    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfiq: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                rules:{
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfiq: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                rules:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    changedInput = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].rules),
                touched: true
            }
        }

        this.setState({
            controls: updatedControls
        });
    }

    switchMode = (e) => {
        this.setState(prevState => {
            return{
                isSignup: !prevState.isSignup
            }
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.authInit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    
    
    render(){

        const formInputs = [];
        for(let input in this.state.controls){
            formInputs.push({
                id: input,
                confiq: {...this.state.controls[input]}
            });
        }
        let error = null;
        let form = <form onSubmit={this.submitHandler}>
                        {formInputs.map(input => 
                            <Input 
                            key={input.id} 
                            {...input.confiq}
                            changed={(event) => {this.changedInput(event, input.id)}}
                            invalid={!input.confiq.valid}
                            touched={input.confiq.touched}/>
                        )}
                        <Button btnType="Success">Submit</Button>
                    </form>
        let redirect = null;
        if(this.props.loading){
            form = <Spinner />
        }
        if(this.props.error){
            error = <p>{this.props.error}</p>
        }
        if(this.props.idToken !== null){
            redirect = <Redirect to="/" />
        }
        return(
            <div className={classes.Auth}>
                {redirect}
                {error}
                {form}
                <Button btnType="Danger" clicked={this.switchMode}>Swich to {this.state.isSignup ? 'sign in' : 'sign up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        idToken: state.auth.idToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        authInit: (email, password, isSignup) => dispatch(authInit(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);