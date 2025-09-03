"use client";

import { useState } from "react";
import { TableColumn, PropertyType, DEFAULT_PROPERTY_TYPES, PROPERTY_TYPE_ICONS, PROPERTY_TYPE_DESCRIPTIONS } from "../types";

interface ColumnManagerProps {
  columns: TableColumn[];
  onColumnsChange: (columns: TableColumn[]) => void;
}

export function ColumnManager({ columns, onColumnsChange }: ColumnManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState<PropertyType>("text");
  const [newColumnOptions, setNewColumnOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

    const newColumn: TableColumn = {
      id: `col_${Date.now()}`,
      name: newColumnName.trim(),
      type: newColumnType,
      sortable: true,
      filterable: true,
      options: newColumnType === "select" || newColumnType === "multiSelect" ? newColumnOptions : undefined,
    };

    onColumnsChange([...columns, newColumn]);
    setNewColumnName("");
    setNewColumnType("text");
    setNewColumnOptions([]);
    setNewOption("");
  };

  const handleRemoveColumn = (columnId: string) => {
    onColumnsChange(columns.filter(col => col.id !== columnId));
  };

  const handleColumnTypeChange = (columnId: string, newType: PropertyType) => {
    onColumnsChange(columns.map(col => 
      col.id === columnId 
        ? { 
            ...col, 
            type: newType,
            options: (newType === "select" || newType === "multiSelect") ? col.options || [] : undefined
          }
        : col
    ));
  };

  const handleColumnNameChange = (columnId: string, newName: string) => {
    onColumnsChange(columns.map(col => 
      col.id === columnId ? { ...col, name: newName } : col
    ));
  };

  const handleAddOption = () => {
    if (newOption.trim() && !newColumnOptions.includes(newOption.trim())) {
      setNewColumnOptions([...newColumnOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (option: string) => {
    setNewColumnOptions(newColumnOptions.filter(opt => opt !== option));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
      >
        <span>Manage Columns</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Columns</h3>
            
            {/* Existing Columns */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Columns</h4>
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={column.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <span className="text-sm">{PROPERTY_TYPE_ICONS[column.type]}</span>
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={column.type}
                      onChange={(e) => handleColumnTypeChange(column.id, e.target.value as PropertyType)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {Object.entries(DEFAULT_PROPERTY_TYPES).map(([type, config]) => (
                        <option key={type} value={type}>
                          {PROPERTY_TYPE_ICONS[type as PropertyType]} {config.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveColumn(column.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Remove column"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Column */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Column</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Column Name</label>
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter column name..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Column Type</label>
                  <select
                    value={newColumnType}
                    onChange={(e) => setNewColumnType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {Object.entries(DEFAULT_PROPERTY_TYPES).map(([type, config]) => (
                      <option key={type} value={type}>
                        {PROPERTY_TYPE_ICONS[type as PropertyType]} {config.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {PROPERTY_TYPE_DESCRIPTIONS[newColumnType]}
                  </p>
                </div>

                {/* Options for select/multiSelect */}
                {(newColumnType === "select" || newColumnType === "multiSelect") && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Options</label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                          placeholder="Add option..."
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                        />
                        <button
                          onClick={handleAddOption}
                          className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      {newColumnOptions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {newColumnOptions.map((option) => (
                            <span
                              key={option}
                              className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                            >
                              {option}
                              <button
                                onClick={() => handleRemoveOption(option)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddColumn}
                  disabled={!newColumnName.trim()}
                  className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Column
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
