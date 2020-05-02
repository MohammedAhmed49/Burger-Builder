import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            bacon: 0,
            salad: 0
        }
    }

    render(){
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;