import { Id } from "../../../convex/_generated/dataModel";

// Property types supported by the table view
export type PropertyType = 
  | "text"
  | "number" 
  | "select"
  | "multiSelect"
  | "date"
  | "checkbox"
  | "url"
  | "email"
  | "phone";

// Property value types based on property type
export type PropertyValue = 
  | string // text, url, email, phone
  | number // number
  | string[] // multiSelect
  | Date // date
  | boolean; // checkbox

// Property definition
export interface PropertyDefinition {
  id: string;
  name: string;
  type: PropertyType;
  options?: string[]; // For select/multiSelect
}

// Property instance with value
export interface PropertyInstance {
  _id: Id<"noteProperties">;
  _creationTime: number;
  noteId: Id<"notes">;
  name: string;
  type: PropertyType;
  value: PropertyValue | null;
  options?: string[];
}

// Note with properties for table view
export interface NoteWithProperties {
  _id: Id<"notes">;
  _creationTime: number;
  title: string;
  content: string;
  authorId: Id<"users">;
  isArchived?: boolean;
  properties: PropertyInstance[];
}

// Table column definition
export interface TableColumn {
  id: string;
  name: string;
  type: PropertyType;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  options?: string[]; // For select/multiSelect columns
}

// Table view configuration
export interface TableViewConfig {
  id: string;
  name: string;
  columns: TableColumn[];
  filters?: TableFilter[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Filter definition
export interface TableFilter {
  columnId: string;
  operator: "equals" | "contains" | "startsWith" | "endsWith" | "greaterThan" | "lessThan" | "isNotEmpty" | "isEmpty";
  value: any;
}

// Sort configuration
export interface SortConfig {
  columnId: string;
  direction: "asc" | "desc";
}

// Default property types with their configurations
export const DEFAULT_PROPERTY_TYPES: Record<PropertyType, Partial<PropertyDefinition>> = {
  text: {
    type: "text",
    name: "Text",
  },
  number: {
    type: "number", 
    name: "Number",
  },
  select: {
    type: "select",
    name: "Select",
    options: [],
  },
  multiSelect: {
    type: "multiSelect",
    name: "Multi-select",
    options: [],
  },
  date: {
    type: "date",
    name: "Date",
  },
  checkbox: {
    type: "checkbox",
    name: "Checkbox",
  },
  url: {
    type: "url",
    name: "URL",
  },
  email: {
    type: "email",
    name: "Email",
  },
  phone: {
    type: "phone",
    name: "Phone",
  },
};

// Property type icons (using simple text for now, can be replaced with actual icons)
export const PROPERTY_TYPE_ICONS: Record<PropertyType, string> = {
  text: "📝",
  number: "🔢",
  select: "📋",
  multiSelect: "📋",
  date: "📅",
  checkbox: "☑️",
  url: "🔗",
  email: "📧",
  phone: "📞",
};

// Property type descriptions
export const PROPERTY_TYPE_DESCRIPTIONS: Record<PropertyType, string> = {
  text: "Plain text",
  number: "Numeric value",
  select: "Single choice from options",
  multiSelect: "Multiple choices from options",
  date: "Date and time",
  checkbox: "True or false",
  url: "Web address",
  email: "Email address",
  phone: "Phone number",
};
