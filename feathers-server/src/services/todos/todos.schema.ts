// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import { userSchema } from "../users/users.schema";
import format from "date-fns/format";

// Main data model schema
export const todoSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    createdAt: Type.String(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: "Todo", additionalProperties: false }
);
export type Todo = Static<typeof todoSchema>;
export const todoValidator = getValidator(todoSchema, dataValidator);
export const todoResolver = resolve<Todo, HookContext>({});

export const todoExternalResolver = resolve<Todo, HookContext>({
  user: virtual(async (todo, context) => {
    return context.app.service("users").get(todo.userId);
  })
});

// Schema for creating new entries
export const todoDataSchema = Type.Pick(todoSchema, ["text"], {
  $id: "TodoData"
});
export type TodoData = Static<typeof todoDataSchema>;
export const todoDataValidator = getValidator(todoDataSchema, dataValidator);
export const todoDataResolver = resolve<Todo, HookContext>({
  userId: async (_value, _todo, context) => {
    return context.params.user.id;
  },
  createdAt: async () => {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
});

// Schema for updating existing entries
export const todoPatchSchema = Type.Partial(todoSchema, {
  $id: "TodoPatch"
});
export type TodoPatch = Static<typeof todoPatchSchema>;
export const todoPatchValidator = getValidator(todoPatchSchema, dataValidator);
export const todoPatchResolver = resolve<Todo, HookContext>({});

// Schema for allowed query properties
export const todoQueryProperties = Type.Pick(todoSchema, ["id", "text", "createdAt", "userId"]);
export const todoQuerySchema = Type.Intersect(
  [
    querySyntax(todoQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type TodoQuery = Static<typeof todoQuerySchema>;
export const todoQueryValidator = getValidator(todoQuerySchema, queryValidator);
export const todoQueryResolver = resolve<TodoQuery, HookContext>({
  // We want to be able to find all todos but
  // only let a user modify their own messages otherwise
  userId: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id;
    }

    return value;
  }
});
