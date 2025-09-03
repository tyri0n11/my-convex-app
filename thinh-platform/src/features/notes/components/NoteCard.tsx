"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "react-toastify";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { showConfirmationToast } from "./ConfirmationToast";

interface NoteCardProps {
  id: Id<"notes">;
  title: string;
  content: string;
  createdAt: number;
  isArchived?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDuplicate?: () => void;
  isMultiSelected?: boolean;
  onMultiSelect?: (isSelected: boolean) => void;
}

export function NoteCard({ id, title, content, createdAt, isArchived = false, isSelected = false, onSelect, onEdit, onDuplicate, isMultiSelected = false, onMultiSelect }: NoteCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [lastDuplicateTime, setLastDuplicateTime] = useState<number>(0);
  const archiveNote = useMutation(api.notes.archive);
  const restoreNote = useMutation(api.notes.restore);
  const deleteNote = useMutation(api.notes.deleteNote);
  const duplicateNote = useMutation(api.notes.duplicateNote);

  const handleArchive = async () => {
    try {
      await archiveNote({ id });
      toast.success("Note archived successfully");
    } catch (error) {
      console.error("Failed to archive note:", error);
      toast.error("Failed to archive note");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreNote({ id });
      toast.success("Note restored successfully");
    } catch (error) {
      console.error("Failed to restore note:", error);
      toast.error("Failed to restore note");
    }
  };

  const handleDelete = async () => {
    showConfirmationToast({
      message: "Are you sure you want to permanently delete this note? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteNote({ id });
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

  const handleDuplicate = async () => {
    const now = Date.now();
    const timeSinceLastDuplicate = now - lastDuplicateTime;
    
    if (timeSinceLastDuplicate < 5000) { // 5 seconds rate limit
      const remainingTime = Math.ceil((5000 - timeSinceLastDuplicate) / 1000);
      toast.warning(`Please wait ${remainingTime} second(s) before duplicating again`);
      return;
    }

    try {
      console.log("Duplicating note with ID:", id);
      const duplicatedId = await duplicateNote({ id });
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

  // Parse Slack formatting for preview
  const parseSlackFormatting = (text: string): string => {
    return text
      // Remove code blocks for preview
      .replace(/```[\s\S]*?```/g, '[code block]')
      // Keep inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      // Bold
      .replace(/\*([^*]+)\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
      // Strikethrough
      .replace(/~([^~]+)~/g, '<del class="line-through">$1</del>')
      // Remove quotes and lists for preview
      .replace(/^> (.+)$/gm, '$1')
      .replace(/^• (.+)$/gm, '$1');
  };

  // Get first line only for preview
  const getFirstLine = (text: string): string => {
    const firstLine = text.split('\n')[0];
    return firstLine.length > 100 ? firstLine.substring(0, 100) + "..." : firstLine;
  };

  const firstLineContent = getFirstLine(content);
  const formattedPreview = parseSlackFormatting(firstLineContent);

  return (
    <div
      className={`group relative flex items-start space-x-3 p-3 transition-colors duration-150 cursor-pointer rounded ${
        isSelected 
          ? 'bg-blue-50 border-l-4 border-blue-500' 
          : isMultiSelected
          ? 'bg-blue-50 border-l-4 border-blue-400'
          : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
      onDoubleClick={onEdit}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Multi-select Checkbox */}
      {onMultiSelect && (
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={isMultiSelected}
            onChange={(e) => {
              e.stopPropagation();
              onMultiSelect(e.target.checked);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
      )}
      
      {/* Note Icon */}
      <div className="flex-shrink-0 w-4 h-4 mt-1">
        <div className="w-full h-full bg-gray-300 rounded-sm"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
              {title || "Untitled"}
            </h3>
            {content && (
              <div 
                className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedPreview }}
              />
            )}
          </div>
          
          {/* Actions */}
          <div className={`flex items-center space-x-1 ml-2 transition-opacity duration-150 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-400 hover:text-blue-600 transition-colors touch-manipulation flex items-center justify-center"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            {isArchived ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRestore();
                }}
                className="p-1.5 hover:bg-gray-200 rounded-md text-gray-400 hover:text-green-600 transition-colors touch-manipulation flex items-center justify-center"
                title="Restore"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleArchive();
                }}
                className="p-1.5 hover:bg-gray-200 rounded-md text-gray-400 hover:text-gray-600 transition-colors touch-manipulation flex items-center justify-center"
                title="Archive"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6m0 0l6-6m-6 6V4" />
                </svg>
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDuplicate();
              }}
              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-400 hover:text-purple-600 transition-colors touch-manipulation flex items-center justify-center"
              title="Duplicate Note"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete();
              }}
              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-400 hover:text-red-600 transition-colors touch-manipulation flex items-center justify-center"
              title="Delete Permanently"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Date */}
        <div className="mt-2 text-xs text-gray-500">
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
}
