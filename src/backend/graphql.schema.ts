
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateToDoInput {
    text: string;
}

export class UpdateToDoInput {
    id: number;
    text?: string;
    completed?: boolean;
}

export abstract class IQuery {
    abstract getToDos(): ToDo[] | Promise<ToDo[]>;

    abstract get(id: number): ToDo | Promise<ToDo>;
}

export abstract class IMutation {
    abstract createToDo(createToDoInput: CreateToDoInput): ToDo | Promise<ToDo>;

    abstract updateToDo(updateToDoInput: UpdateToDoInput): ToDo | Promise<ToDo>;
}

export abstract class ISubscription {
    abstract toDoAdded(): ToDo | Promise<ToDo>;

    abstract toDoUpdated(): ToDo | Promise<ToDo>;

    abstract toDoUpdateFailed(): ErrorMessage | Promise<ErrorMessage>;
}

export class ErrorMessage {
    message: string;
}

export class ToDo {
    id: number;
    text: string;
    completed: boolean;
}
