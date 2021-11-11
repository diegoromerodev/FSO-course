import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {ALL_BOOKS} from '../queries';

const Books = (props) => {
  if (!props.show) {
    return null;
  }
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [genres, setGenres] = useState([]);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  useEffect(() => {
    const gSet = new Set();
    books.forEach((b) => b.genres.forEach((g) => gSet.add(g)));
    setGenres(Array.from(gSet));
  }, [books]);

  if (!books.length) return null;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter((b) => filter ? b.genres.includes(filter) : true)
              .map((a) =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>,
              )}
        </tbody>
      </table>
      {genres.map((g) => <button key={g} onClick={() => setFilter(g)}>
        {g}
      </button>)}
      <button onClick={() => setFilter('')}>all genres</button>
    </div>
  );
};

export default Books;
