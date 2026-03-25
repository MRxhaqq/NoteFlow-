import { useState, useRef, useCallback } from "react";
import { useNotes } from "@/context/NotesContext";
import { getTagColor } from "@/lib/utils";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TagInput({ note }) {
  const { updateNote } = useNotes();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Add a tag — normalise to lowercase, no duplicates, no empty strings
  const addTag = useCallback(
    (raw) => {
      const tag = raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "");
      if (!tag) return;
      if (note.tags.includes(tag)) {
        setInputValue("");
        return;
      }
      updateNote(note.id, { tags: [...note.tags, tag] });
      setInputValue("");
    },
    [note.id, note.tags, updateNote],
  );

  // Remove a tag by index
  const removeTag = useCallback(
    (index) => {
      const newTags = note.tags.filter((_, i) => i !== index);
      updateNote(note.id, { tags: newTags });
    },
    [note.id, note.tags, updateNote],
  );

  const handleKeyDown = useCallback(
    (e) => {
      // Confirm tag on Enter or comma
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue);
        return;
      }
      // Remove last tag on Backspace if input is empty
      if (e.key === "Backspace" && inputValue === "" && note.tags.length > 0) {
        removeTag(note.tags.length - 1);
      }
    },
    [inputValue, addTag, removeTag, note.tags.length],
  );

  const handleBlur = useCallback(() => {
    // Confirm any pending tag when input loses focus
    if (inputValue.trim()) {
      addTag(inputValue);
    }
    setIsFocused(false);
  }, [inputValue, addTag]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 px-4 py-2 border-b border-border",
        "min-h-[38px] cursor-text transition-colors",
        isFocused && "bg-secondary/30",
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Render existing tags as badges */}
      {note.tags.map((tag, index) => {
        const color = getTagColor(tag);
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
              text-[11px] font-mono bg-secondary transition-all group"
            style={{ color }}
          >
            #{tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="text-muted-foreground hover:text-destructive
                opacity-0 group-hover:opacity-100 transition-opacity ml-0.5"
              tabIndex={-1}
            >
              <X size={10} />
            </button>
          </span>
        );
      })}

      {/* Tag input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder={note.tags.length === 0 ? "Add tags..." : ""}
        className="flex-1 min-w-[80px] bg-transparent text-[11px] font-mono
          text-foreground placeholder:text-muted-foreground/50
          focus:outline-none"
      />

      {/* Hint text — only shown when focused and typing */}
      {isFocused && inputValue && (
        <span className="text-[10px] font-mono text-muted-foreground/50 ml-auto">
          Enter to add
        </span>
      )}
    </div>
  );
}
