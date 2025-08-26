import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function Content() {
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const updateTodoStatus = useMutation(api.todos.updateTodoStatus);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  
  const [newTodoText, setNewTodoText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await addTodo({ text: newTodoText.trim() });
      setNewTodoText("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTodo = async (id: Id<"todos">, completed: boolean) => {
    try {
      await updateTodoStatus({ id, completed: !completed });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (todos === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            ))}
          </div>
          <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const activeCount = totalCount - completedCount;

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">Todo App</h1>
        <p className="text-slate-600 dark:text-slate-400">Stay organized and productive</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-teal-600 mb-2">{totalCount}</div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">Total Tasks</div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{activeCount}</div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">Active</div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Add New Task */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Add New Task</h2>
        </div>
        <form onSubmit={handleAddTodo}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-4 py-3 border border-slate-300 dark:border-slate-600 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newTodoText.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "all"
              ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "active"
              ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "completed"
              ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {filter === "completed" ? "🎉" : filter === "active" ? "⏰" : "📝"}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
              {filter === "completed" 
                ? "No completed tasks"
                : filter === "active" 
                ? "No active tasks" 
                : "No tasks yet"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {filter === "completed" 
                ? "Complete some tasks to see them here!"
                : filter === "active" 
                ? "All tasks are completed! Great job!" 
                : "Add your first task above to get started!"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>

      {/* Bottom Stats */}
      {totalCount > 0 && (
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          You've completed {completedCount} of {totalCount} tasks. Keep it up!
        </div>
      )}
    </div>
  );
}

function TodoItem({ 
  todo, 
  onToggle, 
  onDelete 
}: { 
  todo: any;
  onToggle: (id: Id<"todos">, completed: boolean) => void;
  onDelete: (id: Id<"todos">) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo._id);
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border transition-all duration-200 ${
      todo.completed 
        ? 'border-green-200 dark:border-green-800' 
        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
    }`}>
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo._id, todo.completed)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 scale-110'
              : 'border-slate-300 dark:border-slate-600 hover:border-green-500 hover:scale-105'
          }`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          <div className={`font-medium transition-all duration-200 ${
            todo.completed 
              ? 'line-through text-slate-500 dark:text-slate-400' 
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {todo.text}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Created: {new Date(parseInt(todo.createdAt)).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group"
          title="Delete task"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-slate-300 border-t-red-500 rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h1a1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-1a1 1 0 100-2h1a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 11a1 1 0 102 0v2a1 1 0 11-2 0v-2zm4-1a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}