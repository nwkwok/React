import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData => { //responseData will be an object not an array so we have to:
      const loadedIngredients = [];
      for (const key in responseData) {  
        loadedIngredients.push({
          id: key,
          title: responseData[key].ingredient.title,
          amount: responseData[key].ingredient.amount
        })
      }
      setIngredients(loadedIngredients);
    })
  }, [])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ingredient}),
      headers: { 'Content-Type': 'application/json' }  // specific to firebase
      })
      .then(response => {
          return response.json();  // fulfills a promise to start another one
        })
      .then( responseData => {
        setIngredients(prevValue => [
          ...prevValue,
          {id: responseData.name,   //specific to firebase
          ...ingredient}
          ]);
        })
    }

    const removeIngredientHandler = ingredientId => {
      setIngredients(prevValue => prevValue.filter(ingredient => ingredient.id !== ingredientId))
    }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
