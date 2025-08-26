import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addTodo = mutation({
  args: { text: v.string() },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    await ctx.db.insert("todos", {
      userId,
      text: args.text,
      completed: false,
      createdAt: Date.now().toString(),
    });
    return "Added a new task";
  },
});

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");

    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});

export const updateTodoStatus = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");

    await ctx.db.patch(args.id, { completed: args.completed });
    return "Updated a task";
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");

    await ctx.db.delete(args.id);

    return "Deleted a task";
  },
});
