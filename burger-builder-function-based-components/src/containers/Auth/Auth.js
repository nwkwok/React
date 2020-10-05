import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

const Auth = props => {
    const [controls, setControl] = useState({       
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        })
    const [isSignUp, setisSignUp] = useState(true)

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
    }}, []);
 
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControl(updatedControls);
    }


    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignUp)
    }

    const switchAuthModeHandler = () => {
        setisSignUp(!isSignUp)
    }

 
        const formElementsArray = []
        for (let key in controls) {  
            // key is like key value pair -- so for every key (key: value)
            // key would be email or password 
            formElementsArray.push({
                id: key,
                // you picked 'id' and setting the value to be key (email or password)
                config: controls[key]
                // you picked 'config' and set that value to be everything inside of the object 
                // located at ['email'] or [password]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
 
            ) );

            if (props.loading) {
                form = <Spinner />
            }

            let errorMessage = null;
            if (props.error) {
                errorMessage = (
                    <p className={classes.Error} >{props.error.message}</p>
                )
            }

            let authRedirect = null;
            if (props.isAuthenticated) {
                authRedirect = <Redirect to={props.authRedirectPath} />
            }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 