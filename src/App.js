import React from 'react';
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';

function App() {
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

export default App;
