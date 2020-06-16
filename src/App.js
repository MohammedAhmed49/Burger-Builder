import React, {Component} from 'react';
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthLocal } from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthLocal()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <BurgerBuilder />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthLocal: () => dispatch(checkAuthLocal())
  }
}

export default connect(null, mapDispatchToProps)(App);
