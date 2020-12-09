import React from 'react';
import { render } from 'react-dom';
import { useTodos } from './hooks/hooks';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ToDoList from "./components/ToDoList";

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

export const createTodo = () => client
.mutate({
  mutation: gql`
    mutation {
      createToDo (
        createToDoInput: {
            text: "New item"
        }
      )
      {
        id,
        text,
        completed
      }
    }`
}).then(result => console.log(result))

const App = () => {
  const { data, loading } = useTodos();

  console.log('data', data);

  const addNewTodo = () => {
    createTodo();
  }

  /*React.useEffect(async () => {
    const { getToDos } = await getAll();
    setTodos(getToDos);
    createTodo();

    return () => setTodos([]);
  }, [])*/

  return (
    <div>
      <div>
        {!loading && <ToDoList data={data} />}
        <button onClick={() => addNewTodo()}>Add new todo</button>
      </div>
    </div>
  );
}

render(<App/>, document.getElementById('root'));
