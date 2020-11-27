import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ToDoModule } from "./to-do/to-do.module";

@Module({
  imports: [
    ToDoModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
  })],
})
export class AppModule {}
