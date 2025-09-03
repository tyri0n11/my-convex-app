"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { NotesTableView } from "./NotesTableView";
import { Pagination } from "./Pagination";


export function NotesGrid() {
  const [editingNoteId, setEditingNoteId] = useState<Id<"notes"> | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<Id<"notes"> | null>(null);
  const [showNewNote, setShowNewNote] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "table">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const notes = useQuery(api.notes.list, { showArchived });
  
  // Mutations for bulk actions
  const archiveNote = useMutation(api.notes.archive);
  const restoreNote = useMutation(api.notes.restore);
  const deleteNote = useMutation(api.notes.deleteNote);
  




  const handleSelectNote = (noteId: Id<"notes">) => {
    setSelectedNoteId(noteId);
    setShowNewNote(false);
  };

  const handleEditNote = (noteId: Id<"notes">) => {
    setEditingNoteId(noteId);
    setSelectedNoteId(noteId);
    setShowNewNote(false);
  };

  const handleNewNote = () => {
    setShowNewNote(true);
    setEditingNoteId(null);
    setSelectedNoteId(null);
  };

  const handleSave = () => {
    setEditingNoteId(null);
    setShowNewNote(false);
  };

  // Pagination logic
  const totalItems = notes?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotes = notes?.slice(startIndex, endIndex) || [];

  // Debug logging
  console.log("Notes data:", notes);
  console.log("Total items:", totalItems);
  console.log("Current page:", currentPage);
  console.log("Paginated notes:", paginatedNotes);

  // Monitor notes changes
  useEffect(() => {
    console.log("Notes data changed:", notes?.length, "notes");
    if (notes) {
      console.log("Notes IDs:", notes.map(n => n._id));
    }
  }, [notes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedNotes(new Set()); // Clear selection when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    setSelectedNotes(new Set()); // Clear selection when changing items per page
  };

  // Reset to first page when switching between archived/active or view modes
  const handleShowArchivedChange = (showArchived: boolean) => {
    setShowArchived(showArchived);
    setCurrentPage(1);
    setSelectedNotes(new Set()); // Clear selection when switching views
  };

  const handleViewModeChange = (mode: "list" | "table") => {
    setViewMode(mode);
    setCurrentPage(1);
    setSelectedNotes(new Set()); // Clear selection when switching view modes
  };

  const handleDuplicate = () => {
    console.log("Duplicate callback triggered, resetting to page 1");
    setCurrentPage(1); // Reset to first page to show the new duplicated note
  };

  // Multi-select handlers
  const handleMultiSelectNote = (noteId: string, isSelected: boolean) => {
    setSelectedNotes(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(noteId);
      } else {
        newSet.delete(noteId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    // Select/deselect all notes on the current page only
    if (selectedNotes.size === paginatedNotes.length) {
      setSelectedNotes(new Set());
    } else {
      setSelectedNotes(new Set(paginatedNotes.map(note => note._id)));
    }
  };

  const handleBulkArchive = async () => {
    if (selectedNotes.size === 0) return;
    
    try {
      for (const noteId of selectedNotes) {
        await archiveNote({ id: noteId as Id<"notes"> });
      }
      setSelectedNotes(new Set());
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to archive notes:", error);
    }
  };

  const handleBulkRestore = async () => {
    if (selectedNotes.size === 0) return;
    
    try {
      for (const noteId of selectedNotes) {
        await restoreNote({ id: noteId as Id<"notes"> });
      }
      setSelectedNotes(new Set());
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to restore notes:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedNotes.size === 0) return;
    
    try {
      for (const noteId of selectedNotes) {
        await deleteNote({ id: noteId as Id<"notes"> });
      }
      setSelectedNotes(new Set());
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to delete notes:", error);
    }
  };



  if (notes === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Notion-style Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-600 text-sm">📝</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Notes</h1>
                <p className="text-sm text-gray-500">Your personal workspace</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded p-1">
                <button
                  onClick={() => handleViewModeChange("list")}
                  className={`px-3 py-1.5 text-sm rounded transition-colors font-medium ${
                    viewMode === "list"
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => handleViewModeChange("table")}
                  className={`px-3 py-1.5 text-sm rounded transition-colors font-medium ${
                    viewMode === "table"
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedNotes.size > 0 && (
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded">
                  <span className="text-sm text-blue-700 font-medium">
                    {selectedNotes.size} selected on this page
                  </span>
                  <div className="flex items-center space-x-1">
                    {showArchived ? (
                      <button
                        onClick={handleBulkRestore}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Restore selected"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={handleBulkArchive}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Archive selected"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6m0 0l6-6m-6 6V4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={handleBulkDelete}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete selected"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleShowArchivedChange(!showArchived)}
                className={`px-3 py-1.5 text-sm rounded transition-colors font-medium ${
                  showArchived
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showArchived ? (
                    // @ts-ignore
                    <ion-icon name="folder-open-outline"></ion-icon>
                ) : (
                  // @ts-ignore
                  <ion-icon name="archive-outline"></ion-icon>
                )}
              </button>
              <button
                onClick={handleNewNote}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors font-medium"
              > 
                {/* @ts-ignore */}
                <ion-icon name="add-circle-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* New Note Editor */}
        {showNewNote && (
          <div className="mb-8">
            <NoteEditor onSave={handleSave} onCancel={() => setShowNewNote(false)} />
          </div>
        )}

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{showArchived ? '📦' : '📝'}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {showArchived ? 'No archived notes' : 'No notes yet'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {showArchived 
                ? 'You haven\'t archived any notes yet. Archived notes are hidden from your main view but can be restored anytime.'
                : 'Get started by creating your first note. Capture your thoughts, ideas, and important information.'
              }
            </p>
            {!showArchived && (
              <button
                onClick={handleNewNote}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
              >
                Create your first note
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Select All Checkbox */}
            {paginatedNotes.length > 0 && (
              <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedNotes.size === paginatedNotes.length && paginatedNotes.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Select all on this page ({paginatedNotes.length} notes)
                  </span>
                </label>
              </div>
            )}

            {viewMode === "list" ? (
              <div className="space-y-1">
                {paginatedNotes.map((note) => (
                  <div key={note._id}>
                    {editingNoteId === note._id ? (
                      <NoteEditor
                        noteId={note._id}
                        initialTitle={note.title}
                        initialContent={note.content}
                        onSave={handleSave}
                        onCancel={() => setEditingNoteId(null)}
                      />
                    ) : (
                      <NoteCard
                        id={note._id}
                        title={note.title}
                        content={note.content}
                        createdAt={note._creationTime}
                        isArchived={note.isArchived || false}
                        isSelected={selectedNoteId === note._id}
                        onSelect={() => handleSelectNote(note._id)}
                        onEdit={() => handleEditNote(note._id)}
                        onDuplicate={handleDuplicate}
                        isMultiSelected={selectedNotes.has(note._id)}
                        onMultiSelect={(isSelected) => handleMultiSelectNote(note._id, isSelected)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <NotesTableView
                notes={paginatedNotes}
                onEdit={handleEditNote}
                onSelect={handleSelectNote}
                selectedNoteId={selectedNoteId}
                isArchived={showArchived}
                onDuplicate={handleDuplicate}
                selectedNotes={selectedNotes}
                onMultiSelect={handleMultiSelectNote}
              />
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
