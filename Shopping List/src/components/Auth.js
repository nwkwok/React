import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context'
import Card from './UI/Card';
import './Auth.css';

const Auth = props => {
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    authContext.login()
  };

  return (
    <div className="auth">
      <Card>
        <h2>Nick's React Shopping List</h2>
        <h3>Welcome!</h3>
        <p>Add items</p>
        <p>Remove items</p>
        <p>Search if the list is too long :)</p>
        <button onClick={loginHandler}>C'mon In!</button>
      </Card>
    </div>
  );
};

export default Auth;
