// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  todoDataValidator,
  todoPatchValidator,
  todoQueryValidator,
  todoResolver,
  todoExternalResolver,
  todoDataResolver,
  todoPatchResolver,
  todoQueryResolver
} from "./todos.schema";

import type { Application } from "../../declarations";
import { TodoService, getOptions } from "./todos.class";
import { todoPath, todoMethods } from "./todos.shared";

export * from "./todos.class";
export * from "./todos.schema";

// A configure function that registers the service and its hooks via `app.configure`
export const todo = (app: Application) => {
  // Register our service on the Feathers application
  app.use(todoPath, new TodoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: todoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(todoPath).hooks({
    around: {
      all: [
        authenticate("jwt"),
        schemaHooks.resolveExternal(todoExternalResolver),
        schemaHooks.resolveResult(todoResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(todoQueryValidator), schemaHooks.resolveQuery(todoQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(todoDataValidator), schemaHooks.resolveData(todoDataResolver)],
      patch: [schemaHooks.validateData(todoPatchValidator), schemaHooks.resolveData(todoPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [todoPath]: TodoService;
  }
}
