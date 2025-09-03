"use client";

import { useState, useMemo } from "react";
import { useMutation } from "convex/react";
import { toast } from "react-toastify";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { NoteWithProperties, TableColumn, SortConfig, PropertyType, PROPERTY_TYPE_ICONS } from "../types";
import { PropertyEditor } from "./PropertyEditor";

interface TableViewProps {
  notes: NoteWithProperties[];
  columns: TableColumn[];
  onEdit: (noteId: Id<"notes">) => void;
  onDelete: (noteId: Id<"notes">) => void;
  onArchive: (noteId: Id<"notes">) => void;
  onRestore: (noteId: Id<"notes">) => void;
  isArchived?: boolean;
}

export function TableView({ 
  notes, 
  columns, 
  onEdit, 
  onDelete, 
  onArchive, 
  onRestore,
  isArchived = false 
}: TableViewProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [editingCell, setEditingCell] = useState<{ noteId: Id<"notes">; propertyName: string } | null>(null);
  
  const addProperty = useMutation(api.notes.addProperty);
  const updateProperty = useMutation(api.notes.updateProperty);

  // Sort notes based on current sort configuration
  const sortedNotes = useMemo(() => {
    if (!sortConfig) return notes;

    return [...notes].sort((a, b) => {
      const aValue = getPropertyValue(a, sortConfig.columnId);
      const bValue = getPropertyValue(b, sortConfig.columnId);

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortConfig.direction === "asc" ? 1 : -1;
      if (bValue === null) return sortConfig.direction === "asc" ? -1 : 1;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [notes, sortConfig]);

  const handleSort = (columnId: string) => {
    setSortConfig(prev => {
      if (prev?.columnId === columnId) {
        return {
          columnId,
          direction: prev.direction === "asc" ? "desc" : "asc"
        };
      }
      return { columnId, direction: "asc" };
    });
  };

  const getPropertyValue = (note: NoteWithProperties, columnId: string) => {
    if (columnId === "title") return note.title;
    if (columnId === "created") return new Date(note._creationTime);
    
    const property = note.properties.find(p => p.name === columnId);
    return property?.value || null;
  };

  const handlePropertyChange = async (noteId: Id<"notes">, propertyName: string, value: any) => {
    try {
      const note = notes.find(n => n._id === noteId);
      if (!note) return;

      const existingProperty = note.properties.find(p => p.name === propertyName);
      
      if (existingProperty) {
        await updateProperty({
          propertyId: existingProperty._id,
          value: value
        });
      } else {
        // Find the column definition to get the type
        const column = columns.find(c => c.name === propertyName);
        if (column) {
          await addProperty({
            noteId: noteId,
            name: propertyName,
            type: column.type,
            value: value
          });
        }
      }
      
      toast.success("Property updated");
    } catch (error) {
      console.error("Failed to update property:", error);
      toast.error("Failed to update property");
    }
  };

  const formatValue = (value: any, type: PropertyType) => {
    if (value === null || value === undefined) return "";
    
    switch (type) {
      case "date":
        return value instanceof Date ? value.toLocaleDateString() : new Date(value).toLocaleDateString();
      case "checkbox":
        return value ? "✓" : "";
      case "multiSelect":
        return Array.isArray(value) ? value.join(", ") : "";
      case "number":
        return typeof value === "number" ? value.toString() : "";
      default:
        return String(value);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable !== false ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  style={{ width: column.width ? `${column.width}px` : "auto" }}
                  onClick={() => column.sortable !== false && handleSort(column.name)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{PROPERTY_TYPE_ICONS[column.type]}</span>
                    <span>{column.name}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        <svg
                          className={`w-3 h-3 ${
                            sortConfig?.columnId === column.name && sortConfig.direction === "asc"
                              ? "text-blue-600"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                        <svg
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.columnId === column.name && sortConfig.direction === "desc"
                              ? "text-blue-600"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedNotes.map((note) => (
              <tr
                key={note._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => {
                  const value = getPropertyValue(note, column.name);
                  const isEditing = editingCell?.noteId === note._id && editingCell?.propertyName === column.name;
                  
                  return (
                    <td
                      key={column.id}
                      className="px-4 py-3 text-sm text-gray-900"
                      onClick={() => setEditingCell({ noteId: note._id, propertyName: column.name })}
                    >
                      {isEditing ? (
                        <PropertyEditor
                          type={column.type}
                          value={value}
                          options={column.options}
                          onChange={(newValue) => handlePropertyChange(note._id, column.name, newValue)}
                          onBlur={() => setEditingCell(null)}
                          className="w-full"
                        />
                      ) : (
                        <div className="min-h-[20px] flex items-center">
                          {formatValue(value, column.type)}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note._id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-blue-600 transition-colors"
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
                          onRestore(note._id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-green-600 transition-colors"
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
                          onArchive(note._id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors"
                        title="Archive"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note._id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
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
      
      {sortedNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No notes found</div>
          <div className="text-gray-500 text-sm">Create your first note to get started</div>
        </div>
      )}
    </div>
  );
}
