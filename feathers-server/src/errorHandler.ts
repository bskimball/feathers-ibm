import { FeathersKoaContext } from "@feathersjs/koa";
import { app } from "./app";
import { FeathersError } from "@feathersjs/errors";
import send from "koa-send";

export const errorHandler = () => async (ctx: FeathersKoaContext, next: () => Promise<any>) => {
  try {
    await next();
    if (ctx.body === undefined) {
      await send(ctx, "/index.html", { root: app.get("public") });
    }
  } catch (err: any) {
    ctx.response.status = err instanceof FeathersError ? err.code : 500;
    ctx.body = typeof err.toJSON === "function" ? err.toJSON : { message: err.message };
  }
};
