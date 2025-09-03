"use client";

import { useState, useEffect } from "react";
import { PropertyType, PropertyValue } from "../types";

interface PropertyEditorProps {
  type: PropertyType;
  value: PropertyValue | null;
  options?: string[];
  onChange: (value: PropertyValue | null) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export function PropertyEditor({ 
  type, 
  value, 
  options = [], 
  onChange, 
  onBlur,
  placeholder,
  className = ""
}: PropertyEditorProps) {
  const [localValue, setLocalValue] = useState<PropertyValue | null>(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: PropertyValue | null) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const renderEditor = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            value={localValue as string || ""}
            onChange={(e) => handleChange(e.target.value || null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || "Enter text..."}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={localValue as number || ""}
            onChange={(e) => {
              const numValue = e.target.value === "" ? null : Number(e.target.value);
              handleChange(numValue);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || "Enter number..."}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      case "select":
        return (
          <select
            value={localValue as string || ""}
            onChange={(e) => handleChange(e.target.value || null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          >
            <option value="">Select an option...</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "multiSelect":
        const selectedValues = (localValue as string[]) || [];
        return (
          <div className="relative">
            <div
              className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded cursor-pointer ${className}`}
              onClick={handleFocus}
            >
              {selectedValues.length === 0 ? (
                <span className="text-gray-400">Select options...</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {selectedValues.map((val) => (
                    <span
                      key={val}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800"
                    >
                      {val}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newValues = selectedValues.filter(v => v !== val);
                          handleChange(newValues.length > 0 ? newValues : null);
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-auto">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedValues, option]
                          : selectedValues.filter(v => v !== option);
                        handleChange(newValues.length > 0 ? newValues : null);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            value={localValue ? new Date(localValue as Date).toISOString().split('T')[0] : ""}
            onChange={(e) => {
              const dateValue = e.target.value ? new Date(e.target.value) : null;
              handleChange(dateValue);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={localValue as boolean || false}
            onChange={(e) => handleChange(e.target.checked)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className}`}
          />
        );

      case "url":
        return (
          <input
            type="url"
            value={localValue as string || ""}
            onChange={(e) => handleChange(e.target.value || null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || "https://..."}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      case "email":
        return (
          <input
            type="email"
            value={localValue as string || ""}
            onChange={(e) => handleChange(e.target.value || null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || "email@example.com"}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      case "phone":
        return (
          <input
            type="tel"
            value={localValue as string || ""}
            onChange={(e) => handleChange(e.target.value || null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || "+1 (555) 123-4567"}
            className={`w-full px-2 py-1 text-sm border-0 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded ${className}`}
          />
        );

      default:
        return (
          <div className="text-gray-400 text-sm">
            Unsupported type: {type}
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderEditor()}
    </div>
  );
}
