import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let input = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case 'input':
            input = <input 
            {...props.elementConfiq} 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}/>;
            break;

        case 'textarea':
            input = <textarea 
            {...props.elementConfiq} 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}/>;
            break;

        case 'select':
            input = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfiq.options.map(option => 
                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                )}
            </select> 
            break;

        default:
            input = <input 
            {...props.elementConfiq} 
            className={inputClasses.join(' ')} 
            value={props.value}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>

    )
}

export default Input;
