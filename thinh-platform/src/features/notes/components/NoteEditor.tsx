"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { toast } from "react-toastify";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { TextFormatter } from "./TextFormatter";

interface NoteEditorProps {
  noteId?: Id<"notes">;
  initialTitle?: string;
  initialContent?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

export function NoteEditor({ 
  noteId, 
  initialTitle = "", 
  initialContent = "", 
  onSave, 
  onCancel 
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(!noteId);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<Id<"notes"> | null>(noteId || null);
  const [isCreating, setIsCreating] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createNote = useMutation(api.notes.create);
  const updateNote = useMutation(api.notes.update);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!title.trim() || !hasUnsavedChanges || isCreating) return;

    setSaveStatus('saving');
    try {
      if (currentNoteId) {
        // Update existing note
        await updateNote({ id: currentNoteId, title, content });
      } else {
        // Create new note only if not already creating
        setIsCreating(true);
        const newNoteId = await createNote({ title, content });
        setCurrentNoteId(newNoteId);
        setIsCreating(false);
      }
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to auto-save note:", error);
      setSaveStatus('error');
      setIsCreating(false);
      toast.error("Failed to auto-save note");
    }
  }, [currentNoteId, title, content, hasUnsavedChanges, isCreating, updateNote, createNote]);

  // Debounced auto-save effect
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (hasUnsavedChanges && title.trim()) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave();
      }, 1000); // Auto-save after 1 second of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, content, hasUnsavedChanges, autoSave]);

  const handleSave = async () => {
    if (!title.trim()) return;

    // Clear any pending auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    setSaveStatus('saving');
    try {
      if (currentNoteId) {
        await updateNote({ id: currentNoteId, title, content });
      } else {
        const newNoteId = await createNote({ title, content });
        setCurrentNoteId(newNoteId);
      }
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      setIsEditing(false);
      toast.success(currentNoteId ? "Note updated successfully" : "Note created successfully");
      onSave?.();
    } catch (error) {
      console.error("Failed to save note:", error);
      setSaveStatus('error');
      toast.error("Failed to save note");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      onCancel?.();
    }
  };

  if (!isEditing) {
    return (
      <div 
        className="flex items-start space-x-3 p-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer rounded"
        onClick={() => setIsEditing(true)}
      >
        <div className="flex-shrink-0 w-4 h-4 mt-1">
          <div className="w-full h-full bg-gray-300 rounded-sm"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {title || "Untitled"}
          </h3>
          {content && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {content}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          <span className="text-xs text-gray-500">Editing</span>
          {/* Save Status Indicator */}
          <div className="flex items-center space-x-1">
            {saveStatus === 'saving' && (
              <>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-600">Saving...</span>
              </>
            )}
            {saveStatus === 'saved' && hasUnsavedChanges === false && (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Saved</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-red-600">Error saving</span>
              </>
            )}
            {hasUnsavedChanges && saveStatus === 'saved' && (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-yellow-600">Unsaved changes</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              setIsEditing(false);
              onCancel?.();
            }}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || saveStatus === 'saving'}
            className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Editor Content */}
        <div className="p-2">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          placeholder="Untitled"
          className="w-full text-lg font-semibold border-none outline-none mb-4 text-gray-900 placeholder-gray-400"
        />
        <TextFormatter
          value={content}
          onChange={(value) => {
            setContent(value);
            setHasUnsavedChanges(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Start writing... Use *bold*, _italic_, `code`, ```code blocks```, > quotes, • lists"
          className="min-h-[300px]"
        />
      </div>

      {/* Editor Footer */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">⌘</kbd> + <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> to save, <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to cancel
          </p>
          <p className="text-xs text-gray-400">
            Auto-saves after 1 second of inactivity
          </p>
        </div>
      </div>
    </div>
  );
}
