import React from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  data: Todo[],
}

const ToDoList = ({ data }: Props) => {

   return (
     <ul>
       {
         data.map((thing) => <li>{thing.text}</li>)
       }
     </ul>
  )
};

export default ToDoList;
