import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './index';
import BuildControls from '../../components/Burger/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder /> tests', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder initIngredients={()=>{}}/>);
    });
    it('should has <BuildControl /> if there are ingredients', () => {
        wrapper.setProps({ ingredients: {salad: 0} });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});