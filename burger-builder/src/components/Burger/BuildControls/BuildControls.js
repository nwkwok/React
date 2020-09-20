import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                
                <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientDeducted(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label} 
                disabled={props.disabled[ctrl.type]}
                />
                //disabled is a default property for HTML that will de-active element if set to true
            ))}
            <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>ORDER NOW</button>
        </div>
    )

}

export default BuildControls;