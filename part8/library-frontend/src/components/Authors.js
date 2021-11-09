import React, {useEffect, useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {ALL_AUTHORS, UPDATE_AUTHOR} from '../queries';

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [authors, setAuthors] = useState([]);
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ALL_AUTHORS],
  });

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    editAuthor({
      variables: {
        name,
        born,
      },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>,
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            <option value="">Select an author</option>
            {authors.map((a) => (<option key={a.name} value={a.name}>
              {a.name}
            </option>))}
          </select>
        </div>
        <div>
                    born
          <input type="text" value={born}
            onChange={({target}) => setBorn(parseInt(target.value))} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
