import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal//Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
import axios from '../../axios-orders'


//global constants are typically placed in all caps

class BurgerBuilder extends Component {
//Here we set the state for ingredients. 
//Ingredients will be an object that holds key value pairs.

state = {
    purchasing: false,
}

componentDidMount () {
    console.log(this.props);
    this.props.onInitingredients();

}

purchaseHandler = () => {
    this.setState({purchasing: true});
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
}

updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el; 
        }, 0);
        return sum > 0;
}

    render (){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner /> 

        if (this.props.ings) {
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls  
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientDeducted={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price} 
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} />
            </Aux>
            );
            orderSummary = <OrderSummary 
            price={this.props.price}
            ingredients={this.props.ings} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        }

        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

                 
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitingredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
