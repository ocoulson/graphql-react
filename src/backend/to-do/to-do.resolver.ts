import { Query, Args, Resolver, Mutation, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server";
import { CreateToDoInput, ToDo, UpdateToDoInput } from "src/backend/graphql.schema";
import { ToDoService } from "./to-do.service";

const pubSub = new PubSub();
@Resolver('ToDo')
export class ToDoResolver {
    constructor (
        private toDoService: ToDoService
    ) {}

    @Query()
    async getToDos() {
        return this.toDoService.list();
    }

    @Query()
    async get(@Args('id') id: number) {
        return this.toDoService.get(id);
    }

    @Mutation()
    async createToDo(@Args('createToDoInput') input: CreateToDoInput) {
        const toDoAdded =  this.toDoService.add(input);
        pubSub.publish('toDoAdded', { toDoAdded })
        return toDoAdded;
    }

    @Mutation()
    async updateToDo(@Args('updateToDoInput') updateToDoInput: UpdateToDoInput) {
        const existing: ToDo | undefined = this.toDoService.get(updateToDoInput.id);
        if (existing) {
            const updated = this.toDoService.update(existing, updateToDoInput.text, updateToDoInput.completed);
            pubSub.publish('toDoUpdated', { toDoUpdated: updated });
        } else {
            pubSub.publish('toDoUpdateFailed', { message: 'Error Updating - id not found'});
        }
    }

    @Subscription('toDoAdded')
    toDoAdded() {
      return pubSub.asyncIterator('toDoAdded');
    }

    @Subscription('toDoUpdated')
    toDoUpdated() {
        return pubSub.asyncIterator('toDoUpdated');
    }

    @Subscription('toDoUpdateFailed')
    toDoUpdateFailed() {
        return pubSub.asyncIterator('toDoUpdateFailed');
    }
}
