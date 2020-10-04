import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get here') //only happens if we dispatch and action we dont have
  }
}

const httpReducer = (httpState, action) => {
  switch(action.type) {
    case 'SEND':
      return {loading: true, error: null};
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage}
    case 'CLEAR':
      return {...httpState, error: null }
    default:
        throw new Error('Should not be reached');
  }
}

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null})
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'});
    // setIsLoading(true)
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }  // specific to firebase
      })
      .then(response => {
        dispatchHttp({type: 'RESPONSE'});
          return response.json();  // fulfills a promise to start another one
        })
      .then( responseData => {
        // setIngredients(prevValue => [
        //   ...prevValue,
        //   {id: responseData.name,   //specific to firebase
        //   ...ingredient}
        //   ]);
        dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
        })
    }

    const removeIngredientHandler = useCallback(ingredientId => {
      dispatchHttp({type: 'SEND'});
      fetch(`https://react-hooks-2e5ac.firebaseio.com/ingredients/${ingredientId}.json`, 
      {
        method: 'DELETE',
      }
      ).then(response => {
        dispatchHttp({type: 'RESPONSE'});
        //   setIngredients(prevValue => prevValue.filter(ingredient => ingredient.id !== ingredientId))
        // })
        dispatch({type: 'DELETE', id: ingredientId})
      })
        .catch(error => {
          dispatchHttp({type: 'ERROR', errorMessage: error.message});
        })
    }, [])

    const clearError = () => {
      dispatchHttp({type: 'CLEAR' })
      // setError(null);
      // setIsLoading(false);
    }

    const ingredientList = useMemo(() => {
      return (
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
      />
    )
    }, [ingredients, removeIngredientHandler])

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filterIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
