import React from 'react';
import Burger from '../../Burger';
import Button from '../../UI/Button';

const checkoutSummary = (props) => {
    return(
        <div>
            <h2>This how your amazing burger will look! - So yummy :)</h2>
            <Burger ingredients={props.ingredients} />
            <Button btnType='Danger' clicked={props.cancelClicked}>Cancel</Button>
            <Button btnType='Success' clicked={props.continueClicked}>Continue</Button>
        </div>   
    )
}

export default checkoutSummary;
