import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        // constructor(props){
        //     super(props);
            
        //     this.state = {
        //         error: null
        //     }
            
        //     axios.interceptors.request.use(req => {
        //         this.state.error ={
        //             error: null
        //         };
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         this.state.error ={
        //             error: error
        //         };
        //     });
            
        // }

        state = {
            error: null
        }
        
        componentWillMount(){
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            this.resInter = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error
                });
            });
        }

        componentWillUnmount(){
            // We remove the interceptors because there will be multiple instances of this component and this will cause memory leak so we remove it when the wrappedComponent unmount
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);
        }
        
        
        closeModal = () => {
            this.setState({
                error: null
            });
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} closeModal={this.closeModal}>
                        <p>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
