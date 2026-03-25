import { useNotes } from "@/context/NotesContext";
import { getWordCount, getReadingTime, exportNote } from "@/lib/utils";
import { Trash2, Pin, PinOff, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TagInput from "./TagInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Toolbar({ note }) {
  const { deleteNote, pinNote, saveStatus, duplicateNote } = useNotes();

  if (!note) return null;

  const wordCount = getWordCount(note.content);
  const readingTime = getReadingTime(note.content);

  return (
    <div className="shrink-0 border-b border-border">
      {/* Stats + actions row */}
      <div className="h-9 flex items-center justify-between px-4 bg-background">
        {/* Left — stats */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-muted-foreground">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {readingTime}
          </span>
        </div>

        {/* Center — autosave indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              saveStatus === "saving"
                ? "bg-amber-400 animate-pulse"
                : "bg-emerald-500",
            )}
          />
          <span className="text-[11px] font-mono text-muted-foreground">
            {saveStatus === "saving" ? "Saving..." : "Saved"}
          </span>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-1">
          {/* Duplicate */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => duplicateNote(note.id)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Duplicate note"
          >
            <Copy size={13} />
          </Button>

          {/* Export */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => exportNote(note)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Export as .md"
          >
            <Download size={13} />
          </Button>

          {/* Pin */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => pinNote(note.id)}
            className={cn(
              "h-7 w-7",
              note.pinned
                ? "text-primary hover:text-primary/80"
                : "text-muted-foreground hover:text-foreground",
            )}
            title={note.pinned ? "Unpin note" : "Pin note"}
          >
            {note.pinned ? <PinOff size={13} /> : <Pin size={13} />}
          </Button>

          {/* Delete with confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                title="Delete note"
              >
                <Trash2 size={13} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-serif-italic text-xl text-foreground">
                  Delete this note?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground font-sans text-sm">
                  <span className="text-foreground font-medium">
                    "{note.title || "Untitled"}"
                  </span>{" "}
                  will be permanently deleted. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-secondary text-foreground border-border
                    hover:bg-secondary/80 font-mono text-xs"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteNote(note.id)}
                  className="bg-destructive text-destructive-foreground
                    hover:bg-destructive/90 font-mono text-xs"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tag input row */}
      <TagInput note={note} />
    </div>
  );
}
