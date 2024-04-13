// LoginPage.js
import React, { useState } from 'react';
import { Axios } from 'axios';
import './Login.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Admin from './App';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await Axios.post('http://localhost:3000/login', {
  //       username,
  //       password
  //     });

  //     console.log('Login Successful:', response.data);
  //   } catch (error) {
  //     console.error('Login Failed:', error);
  //   }
  // };

  const MyButton = () => {
    // const history = useHistory();
  
    // const handleClick = () => {
    //   history.push('/');
    // };

    // handleClick();
  
    // return (
    //   <button onClick={handleClick}>Go to About Page</button>
    // );
  };

  return (
    <div className='login-container'>
      {/* <form className='login-form' onSubmit={handleSubmit}> 
        <div>
          <label htmlFor="username">NAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={MyButton}>Login</button>
      </form> */}
    </div>
  );
};

export default LoginPage;
