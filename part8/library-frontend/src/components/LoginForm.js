import React, {useEffect, useState} from 'react';
import {USER_LOGIN} from '../queries';
import {useMutation} from '@apollo/client';

const LoginForm = ({show, setLogged, logged, handleLogout}) => {
  const [login, result] = useMutation(USER_LOGIN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (result.data) {
      localStorage.setItem('libLoginGql', result.data.login.value);
      setLogged(true);
    }
  }, [result.data] );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({variables: {
        username,
        password,
      }});
    } catch (err) {
      console.warn(err.message);
    }
  };


  if (logged && show) {
    return (
      <div>
          end session?
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  if (!show) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div>
                username
        <input type="text" value={username}
          onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
                password
        <input type="text" value={password}
          onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">
                login
      </button>
    </form>
  );
};

export default LoginForm;
