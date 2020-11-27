import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ToDoList from 'components/ToDoList';

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
.then(result => console.log(result));

function App() {
  const { data } = getAll();
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <div>
          <ToDoList data={data} />
        </div>
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));
