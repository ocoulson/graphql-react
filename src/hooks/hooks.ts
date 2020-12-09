import React from 'react';
import { gql } from '@apollo/client';
import { client } from '../App';

const fetchTodos = () => (
  client
  .query({
    query: gql`
        query GetTodos {
            getToDos {
                id,
                text,
                completed
            }
        }
    `
  })
);

const useTodos = () => {
  // const [data, setData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);

  React.useEffect(async () => {
    const res = await fetchTodos();

    console.log(res);
  }, []);

  return {
    // data,
    // loading,
  }
}

export {
  useTodos,
}
