import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }  // specific to firebase
      })
      .then(response => {
          setIsLoading(false);
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
      setIsLoading(true);
      fetch(`https://react-hooks-2e5ac.firebaseio.com/ingredients/${ingredientId}.json`, 
      {
        method: 'DELETE',
      }
      ).then(response => {
        setIsLoading(false);
          setIngredients(prevValue => prevValue.filter(ingredient => ingredient.id !== ingredientId))
        })
        .catch(error => {
          setError(error.message);
        })
    }

    const clearError = () => {
      setError(null);
      setIsLoading(false);
    }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

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
