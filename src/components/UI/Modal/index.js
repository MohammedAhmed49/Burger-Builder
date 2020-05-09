import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop';
import Aux from '../../../hoc/Auxiliary';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateX(0)' : 'translateX(100vw)',
                    opacity: this.props.show ? 1 : 0
                }}>
                    {this.props.children}
                </div>
            </Aux> 
        )
    }
}

export default Modal;
