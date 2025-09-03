"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "react-toastify";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { showConfirmationToast } from "./ConfirmationToast";

interface NotesTableViewProps {
  notes: Array<{
    _id: Id<"notes">;
    _creationTime: number;
    title: string;
    content: string;
    authorId: Id<"users">;
    isArchived?: boolean;
  }>;
  onEdit: (noteId: Id<"notes">) => void;
  onSelect: (noteId: Id<"notes">) => void;
  selectedNoteId: Id<"notes"> | null;
  isArchived?: boolean;
  onDuplicate?: () => void;
  selectedNotes?: Set<string>;
  onMultiSelect?: (noteId: string, isSelected: boolean) => void;
}

export function NotesTableView({ 
  notes, 
  onEdit, 
  onSelect, 
  selectedNoteId,
  isArchived = false,
  onDuplicate,
  selectedNotes = new Set(),
  onMultiSelect
}: NotesTableViewProps) {
  const [lastDuplicateTime, setLastDuplicateTime] = useState<number>(0);
  const archiveNote = useMutation(api.notes.archive);
  const restoreNote = useMutation(api.notes.restore);
  const deleteNote = useMutation(api.notes.deleteNote);
  const duplicateNote = useMutation(api.notes.duplicateNote);

  const handleArchive = async (noteId: Id<"notes">) => {
    try {
      await archiveNote({ id: noteId });
      toast.success("Note archived successfully");
    } catch (error) {
      console.error("Failed to archive note:", error);
      toast.error("Failed to archive note");
    }
  };

  const handleRestore = async (noteId: Id<"notes">) => {
    try {
      await restoreNote({ id: noteId });
      toast.success("Note restored successfully");
    } catch (error) {
      console.error("Failed to restore note:", error);
      toast.error("Failed to restore note");
    }
  };

  const handleDelete = async (noteId: Id<"notes">) => {
    showConfirmationToast({
      message: "Are you sure you want to permanently delete this note? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteNote({ id: noteId });
          toast.success("Note deleted permanently");
        } catch (error) {
          console.error("Failed to delete note:", error);
          toast.error("Failed to delete note");
        }
      },
      confirmText: "Yes, Delete",
      cancelText: "Cancel"
    });
  };

  const handleDuplicate = async (noteId: Id<"notes">) => {
    const now = Date.now();
    const timeSinceLastDuplicate = now - lastDuplicateTime;
    
    if (timeSinceLastDuplicate < 5000) { // 5 seconds rate limit
      const remainingTime = Math.ceil((5000 - timeSinceLastDuplicate) / 1000);
      toast.warning(`Please wait ${remainingTime} second(s) before duplicating again`);
      return;
    }

    try {
      console.log("Duplicating note with ID:", noteId);
      const duplicatedId = await duplicateNote({ id: noteId });
      console.log("Note duplicated successfully with ID:", duplicatedId);
      setLastDuplicateTime(now);
      
      toast.success("Note duplicated successfully");
      onDuplicate?.(); // Call the callback to reset pagination
    } catch (error) {
      console.error("Failed to duplicate note:", error);
      toast.error("Failed to duplicate note");
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit",
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {onMultiSelect && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectedNotes.size === notes.length && notes.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        notes.forEach(note => onMultiSelect?.(note._id, true));
                      } else {
                        notes.forEach(note => onMultiSelect?.(note._id, false));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notes.map((note) => (
              <tr
                key={note._id}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedNoteId === note._id ? 'bg-blue-50' : ''
                } ${selectedNotes.has(note._id) ? 'bg-blue-50' : ''}`}
                onClick={() => onSelect(note._id)}
              >
                {onMultiSelect && (
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedNotes.has(note._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        onMultiSelect(note._id, e.target.checked);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                )}
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="font-medium">
                    {note.title || "Untitled"}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <div className="max-w-xs">
                    {truncateText(note.content)}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatDate(note._creationTime)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note._id);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    {isArchived ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestore(note._id);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-green-600 transition-colors flex items-center justify-center"
                        title="Restore"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(note._id);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
                        title="Archive"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6m0 0l6-6m-6 6V4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(note._id);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-purple-600 transition-colors flex items-center justify-center"
                      title="Duplicate Note"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note._id);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center"
                      title="Delete Permanently"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {notes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No notes found</div>
          <div className="text-gray-500 text-sm">Create your first note to get started</div>
        </div>
      )}
    </div>
  );
}
