import React from 'react';
import { render } from 'react-dom';
import ToDoList from 'components/ToDoList';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

export const getAll = () => client
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
.then(result => result.data);

export const createTodo = () => client
.mutate({
  mutation: gql`
        mutation createToDo ({
            createToDoInput: {
                text: "New item"
            }
        })
        {
          id,
          text,
          completed
        }
    `
}).then(result => console.log(result))

const App = () => {
  const [todos, setTodos] = React.useState([]);

  const addNewTodo = () => {
    createTodo();
  }

  React.useEffect(async () => {
    const { getToDos } = await getAll();
    setTodos(getToDos);
    createTodo();

    return () => setTodos([]);
  }, [])

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <div>
        <ul>
          {
            todos.map((thing) => <li key={thing.id}>{thing.text}</li>)
          }
        </ul>
        <button onClick={() => addNewTodo()}>Add new todo</button>
        {/*<ToDoList data={getToDos} />*/}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
