import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
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
      fetch(`https://react-hooks-2e5ac.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE',
        }).then(response => {
          setIngredients(prevValue => prevValue.filter(ingredient => ingredient.id !== ingredientId))
        })
    }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filterIngredientsHandler}/>
        <IngredientList 
        ingredients={ingredients} 
        onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
