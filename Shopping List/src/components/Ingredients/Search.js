import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState ('')
  const inputRef = useRef();

  useEffect(() => {
   const timer = setTimeout (() => {
      const query = 
      filter.length === 0 
        ? '' 
        : `?orderBy="title"&equalTo="${filter}"`;
        //This param is specific to firebase
    fetch('https://react-hooks-2e5ac.firebaseio.com/ingredients.json' + query)
    .then(response => response.json())
    .then(responseData => { 
      const loadedIngredients = [];
      for (const key in responseData) {  
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      onLoadIngredients(loadedIngredients)
      })
    }, 700);
    return () => { 
      clearTimeout(timer);
    };   
  }, [filter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Item</label>
          <input 
          type="text"
          ref={inputRef}  
          value={filter} 
          onChange={(event) => setFilter(event.target.value)}
          autoComplete="off"/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
