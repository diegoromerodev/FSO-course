import {useLazyQuery, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {GENRE_BOOKS, SESSION} from '../queries';

const Recommendations = ({show}) => {
  const [recoms, setRecoms] = useState(null);
  const [getRecoms, result] = useLazyQuery(GENRE_BOOKS);
  const sessionResult = useQuery(SESSION);

  useEffect(() => {
    if (sessionResult.data) {
      getRecoms({
        variables: {
          genre: sessionResult.data.me.favoriteGenre,
        },
      });
    }
  }, [sessionResult.data]);

  useEffect(() => {
    if (result.data) {
      setRecoms(result.data.allBooks);
    }
  }, [result.data]);

  if (!show) return null;

  if (result.loading || sessionResult.loading) {
    return <p>getting recommendations...</p>;
  }

  return (
    <div>
      <h1>Recommended books</h1>
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
          {recoms && recoms.map((a) =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
