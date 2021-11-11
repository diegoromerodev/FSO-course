
import {useApolloClient, useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import {ALL_BOOKS} from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [logged, setLogged] = useState(false);
  const client = useApolloClient();
  const something = client.readQuery({query: ALL_BOOKS});
  console.log({something});

  useEffect(() => {
    const token = localStorage.getItem('libLoginGql');
    if (token) setLogged(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    client.clearStore();
  };


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {logged && <button onClick={() => setPage('add')}>add book</button>}
        {logged && <button onClick={() => setPage('recom')}>recommendations
        </button>}
        <button onClick={() => setPage('login')}>
          {!logged ? 'login' : 'logout'}
        </button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add' && logged}
      />

      <Recommendations
        show={page === 'recom' && logged}
      />

      <LoginForm
        show={page === 'login'}
        setLogged={setLogged}
        logged={logged}
        handleLogout={handleLogout}
      />

    </div>
  );
};

export default App;
