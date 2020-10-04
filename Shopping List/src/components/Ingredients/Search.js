import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState ('')

  useEffect(() => {
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
  }, [filter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
          type="text"  
          value={filter} 
          onChange={(event) => setFilter(event.target.value)}
          autoComplete="off"/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
