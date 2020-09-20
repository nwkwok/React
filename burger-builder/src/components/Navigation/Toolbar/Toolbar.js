import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from './MenuButton/MenuButton'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuButton clicked={props.openSideBar}>Menu</MenuButton>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar