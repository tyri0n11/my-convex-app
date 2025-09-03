import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  notes: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    isArchived: v.optional(v.boolean()),
    properties: v.optional(v.record(v.string(), v.any())), // Dynamic properties
  }).index("by_author", ["authorId"]),
  
  // Property definitions for notes (like Notion's property types)
  noteProperties: defineTable({
    noteId: v.id("notes"),
    name: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("number"),
      v.literal("select"),
      v.literal("multiSelect"),
      v.literal("date"),
      v.literal("checkbox"),
      v.literal("url"),
      v.literal("email"),
      v.literal("phone")
    ),
    value: v.any(), // The actual property value
    options: v.optional(v.array(v.string())), // For select/multiSelect options
  }).index("by_note", ["noteId"]),
});
