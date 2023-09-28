// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import { userSchema } from "../users/users.schema";
import format from "date-fns/format";

// Main data model schema
export const messageSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    createdAt: Type.String(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: "Message", additionalProperties: false }
);
export type Message = Static<typeof messageSchema>;
export const messageValidator = getValidator(messageSchema, dataValidator);
export const messageResolver = resolve<Message, HookContext>({});

export const messageExternalResolver = resolve<Message, HookContext>({
  user: virtual(async (message, context) => {
    return context.app.service("users").get(message.userId);
  })
});

// Schema for creating new entries
export const messageDataSchema = Type.Pick(messageSchema, ["text"], {
  $id: "MessageData"
});
export type MessageData = Static<typeof messageDataSchema>;
export const messageDataValidator = getValidator(messageDataSchema, dataValidator);
export const messageDataResolver = resolve<Message, HookContext>({
  userId: async (_value, _message, context) => {
    return context.params.user.id;
  },
  createdAt: async () => {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
});

// Schema for updating existing entries
export const messagePatchSchema = Type.Partial(messageSchema, {
  $id: "MessagePatch"
});
export type MessagePatch = Static<typeof messagePatchSchema>;
export const messagePatchValidator = getValidator(messagePatchSchema, dataValidator);
export const messagePatchResolver = resolve<Message, HookContext>({});

// Schema for allowed query properties
export const messageQueryProperties = Type.Pick(messageSchema, ["id", "text", "createdAt", "userId"]);
export const messageQuerySchema = Type.Intersect(
  [
    querySyntax(messageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type MessageQuery = Static<typeof messageQuerySchema>;
export const messageQueryValidator = getValidator(messageQuerySchema, queryValidator);
export const messageQueryResolver = resolve<MessageQuery, HookContext>({
  // We want to be able to find all messages but
  // only let a user modify their own messages otherwise
  userId: async (value, user, context) => {
    if (context.params.user && context.method !== "find") {
      return context.params.user.id;
    }

    return value;
  }
});
