import React from 'react'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {

    return(
        <div className={classes.CheckoutSummary}>
            <h1>Does this look like the burger you made?</h1>
            <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )

}

export default CheckoutSummary