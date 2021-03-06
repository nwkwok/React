import React, { useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator'
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: title, amount: amount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Item</label>
            <input 
            type="text"
            autoComplete="off" 
            id="title" 
            value={title} 
            onChange={event => {
              setTitle(event.target.value);
              }}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
            type="number"
            autoComplete="off" 
            id="amount" 
            value={amount} 
            onChange={event => {
              setAmount(event.target.value);
            }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit" onSubmit={submitHandler}>Add Item</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
