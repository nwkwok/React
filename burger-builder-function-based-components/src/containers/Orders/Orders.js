import React, { useEffect } from 'react'
import Order from '../../components/Order/Order'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'

const Orders = props => {

    useEffect(() => { 
        props.onFetchOrders(props.token, props.userId)

    }, [])
            let orders = <Spinner />;
            if (!props.loading) {
                orders = props.orders.map(order => (
                    <Order 
                    key={order.id} 
                    price={order.price}
                    ingredients={order.ingredients} />
                ))}
        return (
            <div>
               {orders}
            </div>
            )
        }

    const mapStateToProps = state => {
        return {
            orders: state.order.orders,
            loading: state.order.loading,
            token: state.auth.token,
            userId: state.auth.userId
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
        }
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))