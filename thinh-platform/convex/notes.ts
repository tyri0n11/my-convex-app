import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { 
    showArchived: v.optional(v.boolean())
  },
  returns: v.array(v.object({
    _id: v.id("notes"),
    _creationTime: v.number(),
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    isArchived: v.optional(v.boolean()),
  })),
  handler: async (ctx, args) => {
    console.log("Notes list query called");
    
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // First get all notes for this user
    const allNotes = await ctx.db
      .query("notes")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();
    
    console.log("All notes for user:", allNotes.length, "notes");
    console.log("All notes details:", allNotes.map(n => ({ id: n._id, title: n.title, isArchived: n.isArchived })));
    
    // Then apply the filter
    const notes = allNotes.filter(note => {
      if (args.showArchived) {
        return note.isArchived === true;
      } else {
        return note.isArchived === undefined || note.isArchived === false;
      }
    });
    
    console.log("Filtered notes:", notes.length, "notes");
    console.log("Filtered notes details:", notes.map(n => ({ id: n._id, title: n.title, isArchived: n.isArchived })));
    
    // Sort by creation time descending
    notes.sort((a, b) => b._creationTime - a._creationTime);

    console.log("Notes list query returning:", notes.length, "notes");
    console.log("Notes details:", notes.map(n => ({ id: n._id, title: n.title, isArchived: n.isArchived, creationTime: n._creationTime })));
    return notes;
  },
});

export const get = query({
  args: { id: v.id("notes") },
  returns: v.union(
    v.object({
      _id: v.id("notes"),
      _creationTime: v.number(),
      title: v.string(),
      content: v.string(),
      authorId: v.id("users"),
      isArchived: v.optional(v.boolean()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      return null;
    }

    return note;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
  },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("notes", {
      title: args.title,
      content: args.content || "",
      authorId: userId,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    const updates: any = {};
    if (args.title !== undefined) updates.title = args.title;
    if (args.content !== undefined) updates.content = args.content;

    await ctx.db.patch(args.id, updates);
    return null;
  },
});

export const archive = mutation({
  args: { id: v.id("notes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    await ctx.db.patch(args.id, { isArchived: true });
    return null;
  },
});

export const restore = mutation({
  args: { id: v.id("notes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    await ctx.db.patch(args.id, { isArchived: undefined });
    return null;
  },
});

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    // Delete all properties for this note
    const properties = await ctx.db
      .query("noteProperties")
      .withIndex("by_note", (q) => q.eq("noteId", args.id))
      .collect();
    
    for (const property of properties) {
      await ctx.db.delete(property._id);
    }

    await ctx.db.delete(args.id);
    return null;
  },
});

export const duplicateNote = mutation({
  args: { id: v.id("notes") },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    console.log("Duplicate note mutation called with ID:", args.id);
    
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.id);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    console.log("Original note found:", note);

    // Create duplicate note
    const duplicatedNoteData = {
      title: `${note.title} (Copy)`,
      content: note.content,
      authorId: userId,
      isArchived: false, // Duplicated notes are not archived
    };
    
    console.log("Creating duplicate note with data:", duplicatedNoteData);
    
    const duplicatedNoteId = await ctx.db.insert("notes", duplicatedNoteData);

    console.log("Duplicated note created with ID:", duplicatedNoteId);
    
    // Verify the note was created by fetching it
    const createdNote = await ctx.db.get(duplicatedNoteId);
    console.log("Verification - created note:", createdNote);

    // Duplicate all properties for this note
    const properties = await ctx.db
      .query("noteProperties")
      .withIndex("by_note", (q) => q.eq("noteId", args.id))
      .collect();
    
    console.log("Found properties to duplicate:", properties.length);
    
    for (const property of properties) {
      await ctx.db.insert("noteProperties", {
        noteId: duplicatedNoteId,
        name: property.name,
        type: property.type,
        value: property.value,
        options: property.options,
      });
    }

    console.log("Duplicate note mutation completed successfully");
    return duplicatedNoteId;
  },
});

// Property management mutations
export const addProperty = mutation({
  args: {
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
    value: v.optional(v.any()),
    options: v.optional(v.array(v.string())),
  },
  returns: v.id("noteProperties"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(args.noteId);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    return await ctx.db.insert("noteProperties", {
      noteId: args.noteId,
      name: args.name,
      type: args.type,
      value: args.value || null,
      options: args.options,
    });
  },
});

export const updateProperty = mutation({
  args: {
    propertyId: v.id("noteProperties"),
    name: v.optional(v.string()),
    value: v.optional(v.any()),
    options: v.optional(v.array(v.string())),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const property = await ctx.db.get(args.propertyId);
    if (!property) {
      throw new Error("Property not found");
    }

    const note = await ctx.db.get(property.noteId);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    const updates: any = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.value !== undefined) updates.value = args.value;
    if (args.options !== undefined) updates.options = args.options;

    await ctx.db.patch(args.propertyId, updates);
    return null;
  },
});

export const deleteProperty = mutation({
  args: { propertyId: v.id("noteProperties") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const property = await ctx.db.get(args.propertyId);
    if (!property) {
      throw new Error("Property not found");
    }

    const note = await ctx.db.get(property.noteId);
    if (!note || note.authorId !== userId) {
      throw new Error("Note not found or not authorized");
    }

    await ctx.db.delete(args.propertyId);
    return null;
  },
});

// Get notes with their properties for table view (updated validator)
export const listWithProperties = query({
  args: { showArchived: v.optional(v.boolean()) },
  returns: v.array(v.object({
    _id: v.id("notes"),
    _creationTime: v.number(),
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    isArchived: v.optional(v.boolean()),
    properties: v.array(v.object({
      _id: v.id("noteProperties"),
      _creationTime: v.number(),
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
      value: v.any(),
      options: v.optional(v.array(v.string())),
    })),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .filter((q) => {
        if (args.showArchived) {
          return q.eq(q.field("isArchived"), true);
        } else {
          return q.eq(q.field("isArchived"), undefined);
        }
      })
      .order("desc")
      .collect();

    // Fetch properties for each note
    const notesWithProperties = await Promise.all(
      notes.map(async (note) => {
        const properties = await ctx.db
          .query("noteProperties")
          .withIndex("by_note", (q) => q.eq("noteId", note._id))
          .collect();

        return {
          ...note,
          properties,
        };
      })
    );

    return notesWithProperties;
  },
});
