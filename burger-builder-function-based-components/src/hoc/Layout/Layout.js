import React, { useState } from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const Layout = props => {
    
const [showSideDrawer, setShowSideDrawer] = useState(false)    

    const sideDrawerClosedHandler = () => {
       setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        showSideDrawer(!showSideDrawer)
    }
        return (

        <Aux>
            <Toolbar 
                isAuth = {props.isAuthenticated}
                openSideBar={sideDrawerOpenHandler}/>
            <SideDrawer 
                isAuth={props.isAuthenticated}
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main> 
        </Aux>
        )
    }


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);