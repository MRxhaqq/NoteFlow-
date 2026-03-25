import { useState, useEffect, useCallback } from "react";
import { useNotes } from "@/context/NotesContext";
import { useDebounce } from "@/hooks/useDebounce";
import { cn, formatDate } from "@/lib/utils";
import Toolbar from "./Toolbar";
import Preview from "./Preview";
import { NoSelection } from "./EmptyState";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Editor() {
  const { activeNote, updateNote, setSaveStatus, addNote } = useNotes();
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Sync local content when active note changes
  useEffect(() => {
    setContent(activeNote?.content ?? "");
    setShowPreview(false);
  }, [activeNote?.id]);

  // Debounced value — only updates 500ms after typing stops
  const debouncedContent = useDebounce(content, 500);

  // Autosave — fires when debouncedContent changes
  useEffect(() => {
    if (!activeNote) return;
    if (debouncedContent === activeNote.content) return;
    setSaveStatus("saving");
    updateNote(activeNote.id, { content: debouncedContent });
    const t = setTimeout(() => setSaveStatus("saved"), 400);
    return () => clearTimeout(t);
  }, [debouncedContent]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt+N — new note
      if (e.altKey && e.key === "n") {
        e.preventDefault();
        addNote();
        return;
      }
      // Ctrl+S — force immediate save
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (!activeNote) return;
        setSaveStatus("saving");
        updateNote(activeNote.id, { content });
        setTimeout(() => setSaveStatus("saved"), 400);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNote, content, addNote, updateNote, setSaveStatus]);

  const handleChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  if (!activeNote) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <NoSelection />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 animate-fade-in">
      <Toolbar note={activeNote} />

      {/* Timestamps bar */}
      <div className="flex items-center gap-4 px-6 py-1.5 border-b border-border bg-background/50 shrink-0">
        <span className="text-[10px] font-mono text-muted-foreground/60">
          Created {formatDate(activeNote.createdAt)}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/40">
          ·
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/60">
          Edited {formatDate(activeNote.updatedAt)}
        </span>
      </div>

      {/* Split pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor pane — hidden on mobile when preview is shown */}
        <div
          className={cn(
            "flex flex-col flex-1 border-r border-border min-w-0",
            showPreview ? "hidden md:flex" : "flex",
          )}
        >
          {/* Pane label + mobile preview toggle */}
          <div className="h-9 border-b border-border flex items-center justify-between px-4 shrink-0">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              Markdown
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPreview(true)}
              className="h-7 w-7 text-muted-foreground hover:text-foreground md:hidden"
              title="Show preview"
            >
              <Eye size={13} />
            </Button>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={handleChange}
            placeholder="Start writing in markdown..."
            spellCheck={false}
            className="flex-1 w-full resize-none bg-background text-foreground/90
              font-mono text-sm leading-relaxed
              px-6 py-5 focus:outline-none
              placeholder:text-muted-foreground/40"
          />
        </div>

        {/* Preview pane — hidden on desktop unless toggled on mobile */}
        <div
          className={cn(
            "flex-1 flex-col min-w-0",
            showPreview ? "flex" : "hidden md:flex",
          )}
        >
          {/* Mobile back button */}
          <div className="md:hidden h-9 border-b border-border flex items-center justify-between px-4 shrink-0">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              Preview
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPreview(false)}
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              title="Back to editor"
            >
              <EyeOff size={13} />
            </Button>
          </div>
          <Preview content={content} />
        </div>
      </div>
    </div>
  );
}
