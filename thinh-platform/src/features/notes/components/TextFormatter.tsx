"use client";

import { useState, useRef } from "react";

interface SlackFormatterProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

export function TextFormatter({ value, onChange, onKeyDown, placeholder, className }: SlackFormatterProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-convert - to • at line beginnings
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    // Check if user just typed "- " at the beginning of a line
    const lines = newValue.split('\n');
    let modifiedValue = newValue;
    let cursorOffset = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('- ')) {
        // Replace - with • in this line
        const newLine = '• ' + line.substring(2);
        modifiedValue = modifiedValue.replace(line, newLine);
        
        // Adjust cursor position if it's in this line
        const lineStart = newValue.indexOf(line);
        if (cursorPosition >= lineStart && cursorPosition <= lineStart + line.length) {
          cursorOffset = 1; // • is 1 character longer than -
        }
      }
    }
    
    onChange(modifiedValue);
    
    // Restore cursor position with offset
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = cursorPosition + cursorOffset;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // Handle keyboard shortcuts for formatting
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check for Ctrl/Cmd + key combinations
    if (e.ctrlKey || e.metaKey) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);

      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          if (selectedText) {
            // Wrap selected text with bold formatting
            const newValue = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
            onChange(newValue);
            setTimeout(() => {
              textarea.setSelectionRange(start + 1, end + 1);
            }, 0);
          } else {
            insertFormatting("*", "*", "bold text");
          }
          break;
        case 'i':
          e.preventDefault();
          if (selectedText) {
            // Wrap selected text with italic formatting
            const newValue = value.substring(0, start) + `_${selectedText}_` + value.substring(end);
            onChange(newValue);
            setTimeout(() => {
              textarea.setSelectionRange(start + 1, end + 1);
            }, 0);
          } else {
            insertFormatting("_", "_", "italic text");
          }
          break;
        case 'k':
          e.preventDefault();
          if (selectedText) {
            // Wrap selected text with strikethrough formatting
            const newValue = value.substring(0, start) + `~${selectedText}~` + value.substring(end);
            onChange(newValue);
            setTimeout(() => {
              textarea.setSelectionRange(start + 1, end + 1);
            }, 0);
          } else {
            insertFormatting("~", "~", "strikethrough text");
          }
          break;
        case '`':
          e.preventDefault();
          if (selectedText) {
            // Wrap selected text with code formatting
            const newValue = value.substring(0, start) + `\`${selectedText}\`` + value.substring(end);
            onChange(newValue);
            setTimeout(() => {
              textarea.setSelectionRange(start + 1, end + 1);
            }, 0);
          } else {
            insertFormatting("`", "`", "code");
          }
          break;
      }
    }

    // Call the original onKeyDown handler if provided
    onKeyDown?.(e);
  };

  // Slack-style formatting functions
  const insertFormatting = (before: string, after: string = "", placeholder: string = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newValue = 
      value.substring(0, start) + 
      before + textToInsert + after + 
      value.substring(end);

    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatBold = () => insertFormatting("*", "*", "bold text");
  const formatItalic = () => insertFormatting("_", "_", "italic text");
  const formatStrikethrough = () => insertFormatting("~", "~", "strikethrough text");
  const formatCode = () => insertFormatting("`", "`", "code");
  const formatCodeBlock = () => insertFormatting("```\n", "\n```", "code block");
  const formatQuote = () => insertFormatting("> ", "", "quote");
  const formatList = () => insertFormatting("• ", "", "list item");
  const formatDashList = () => insertFormatting("- ", "", "list item");

  // Parse Slack formatting to HTML for preview
  const parseSlackFormatting = (text: string): string => {
    return text
      // Code blocks (handle multiline)
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
      // Bold
      .replace(/\*([^*]+)\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      // Italic
      .replace(/_([^_]+)_/g, '<em class="italic text-gray-700">$1</em>')
      // Strikethrough
      .replace(/~([^~]+)~/g, '<del class="line-through text-gray-500">$1</del>')
      // Quotes (multiline support)
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-300 pl-4 py-2 bg-blue-50 text-gray-700 italic my-2">$1</blockquote>')
      // Lists (multiline support)
      .replace(/^• (.+)$/gm, '<li class="ml-4 mb-1 flex items-start"><span class="text-gray-400 mr-2">•</span><span>$1</span></li>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1 flex items-start"><span class="text-gray-400 mr-2">-</span><span>$1</span></li>')
      // Headers (simple)
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-gray-900 mt-4 mb-2">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold text-gray-900 mt-3 mb-2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-medium text-gray-900 mt-2 mb-1">$1</h3>')
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  const toolbarButtons = [
    { label: "Bold", shortcut: "*text*", onClick: formatBold, icon: "B", disabled: isPreview },
    { label: "Italic", shortcut: "_text_", onClick: formatItalic, icon: "I", disabled: isPreview },
    { label: "Strikethrough", shortcut: "~text~", onClick: formatStrikethrough, icon: "S", disabled: isPreview },
    { label: "Code", shortcut: "`code`", onClick: formatCode, icon: "C", disabled: isPreview },
    { label: "Code Block", shortcut: "```", onClick: formatCodeBlock, icon: "{}", disabled: isPreview },
    { label: "Quote", shortcut: ">", onClick: formatQuote, icon: "Q", disabled: isPreview },
    { label: "List", shortcut: "•", onClick: formatList, icon: "•", disabled: isPreview },
    { label: "Dash List", shortcut: "-", onClick: formatDashList, icon: "-", disabled: isPreview },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              disabled={button.disabled}
              className={`px-1 py-0.5 text-xs font-medium rounded transition-colors ${
                button.disabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              title={button.disabled ? 'Switch to edit mode to format text' : `${button.label} (${button.shortcut})`}
            >
              {button.icon}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-200 rounded p-1">
            <button
              onClick={() => setIsPreview(false)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                !isPreview 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setIsPreview(true)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                isPreview 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {isPreview ? (
          <div className="p-2 min-h-[200px] bg-gray-50">
            {value.trim() ? (
              <div 
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: parseSlackFormatting(value) }}
              />
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Nothing to preview yet</p>
                  <p className="text-xs text-gray-400 mt-1">Switch to edit mode to start writing</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full min-h-[200px] border-none outline-none resize-none text-gray-700 placeholder-gray-400 leading-relaxed p-2 ${className}`}
            />
          </div>
        )}
      </div>

      {/* Formatting Help */}
      {!isPreview && (
        <div className="px-2 py-1 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
          <div className="flex flex-wrap gap-4">
            <span><strong>*bold*</strong> <span className="text-gray-400">(Ctrl+B)</span></span>
            <span><em>_italic_</em> <span className="text-gray-400">(Ctrl+I)</span></span>
            <span><del>~strikethrough~</del> <span className="text-gray-400">(Ctrl+K)</span></span>
            <span><code>`code`</code> <span className="text-gray-400">(Ctrl+`)</span></span>
            <span>```code block```</span>
            <span>&gt; quote</span>
            <span>• list</span>
            <span>- dash list</span>
            <span># header</span>
          </div>
        </div>
      )}
      
      {/* Preview Help */}
      {isPreview && value.trim() && (
        <div className="px-2 py-1 border-t border-gray-100 bg-blue-50 text-xs text-blue-600">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview mode - Switch to edit mode to make changes</span>
          </div>
        </div>
      )}
    </div>
  );
}
