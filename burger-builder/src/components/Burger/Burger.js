import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

    //The prop that we wanting to add to the Burger component is prop.ingredients
    //Because the state of the object ingredients is NOT an array, we cannot map through it
    //Therefore, we must make it an array. To do so, I wil use Object.keys()
    //Object.keys() is a built in JS function. This will extract the keys (property names) of a given object
    //and place them into a new array

    let transformedIngredients = Object.keys(props.ingredients)
    // transformedIngredients now = ["lettuce", "bacon", "cheese", "meat"]

      .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            //if ingredients = {lettuce: 1, bacon: 1, cheese: 2, meat: 2}
            //returns [], [], [ , ], [ , ] => These are four array created and inside is the empty amount
            //of how many are represented in the object ingredients. (# of cheese, meat, lettuce and bacon)
            
            .map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
            //if ingredients = {lettuce: 1, bacon: 1, cheese: 2, meat: 2}
            //returns key = lettuce0, bacon0, cheese0, cheese1, meat0, meat1 
            //returns type =  lettuce, bacon, cheese, cheese, meat, meat
            }); 
        })

        //.reduce() reduces an array down to one value. If we want to create some kind of a message for
        //someone to start adding an ingredients to the burger we have to indicate something when the 
        //transformedIngredients array is empty / holds no ingredients.  
        .reduce((arr, currentValue) => {
            return arr.concat(currentValue);
        }, []);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding some ingredients</p>
        }
        
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" /> 
        </div>
    )
}


export default Burger;