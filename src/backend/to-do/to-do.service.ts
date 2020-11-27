import { Injectable } from "@nestjs/common";
import { ID } from "@nestjs/graphql";
import { CreateToDoInput, ToDo } from "src/backend/graphql.schema";

@Injectable()
export class ToDoService {
  private toDos: ToDo[] = [{ id: 1, text: "Drop the kids off at the pool", completed: false }] ;

  add(todoInput: CreateToDoInput): ToDo {
    const id = this.toDos.length + 1;
    const todo: ToDo = {
        id: id,
        text: todoInput.text,
        completed: false
    }
    this.toDos.push(todo);
    return todo;
  }

  update(toBeUpdated: ToDo, text?: string, completed?: boolean): ToDo {
    const newToDo: ToDo = {
        id: toBeUpdated.id,
        text: text ? text : toBeUpdated.text,
        completed: completed ? completed : toBeUpdated.completed
    }
    this.toDos = this.toDos.map(
        (todo) => {
            if (todo.id === newToDo.id) {
                return newToDo;
            } else {
                return todo;
            }
        }
    );

    return newToDo;
  }

  list(): ToDo[] {
      return this.toDos;
  }

  get(id: number): ToDo {
      return this.toDos.find((todo) => todo.id === id)
  }
}
