// src/components/HelpPanel.jsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const SHORTCUTS = [
  { keys: ["Alt", "N"], description: "Create a new note" },
  { keys: ["Ctrl", "S"], description: "Force save current note" },
];

const TIPS = [
  {
    title: "Writing in Markdown",
    items: [
      "# Heading 1,  ## Heading 2,  ### Heading 3",
      "**bold text**  or  *italic text*",
      "`inline code`  or  ``` code block ```",
      "- item  for bullet lists,  1. item  for numbered",
      "> text  for a blockquote",
      "[link text](https://url.com)  for links",
    ],
  },
  {
    title: "Managing Notes",
    items: [
      "Click the pin icon to keep a note at the top",
      "Click the copy icon to duplicate a note",
      "Click the download icon to export as a .md file",
      "Click the trash icon to delete — a confirmation will appear",
      "Notes autosave 500ms after you stop typing",
      "The green dot means your note is saved",
    ],
  },
  {
    title: "Tags",
    items: [
      "Type a tag name in the tag bar and press Enter",
      "Press comma ( , ) to also confirm a tag",
      "Backspace on empty tag input removes the last tag",
      "Click a tag in the sidebar to filter notes by it",
      "Click the same tag again to clear the filter",
    ],
  },
  {
    title: "Search",
    items: [
      "The search bar filters notes by title and content",
      "Search and tag filter work together at the same time",
      "Click × in the search bar to clear your query",
    ],
  },
  {
    title: "Mobile",
    items: [
      "Tap the menu icon in the header to open the sidebar",
      "Tap the eye icon to switch to preview mode",
      "Tap the eye-off icon to return to the editor",
    ],
  },
];

function KeyBadge({ label }) {
  return (
    <kbd
      className="inline-flex items-center px-1.5 py-0.5 rounded
        border border-border bg-secondary
        text-[10px] font-mono text-muted-foreground"
    >
      {label}
    </kbd>
  );
}

export default function HelpPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title="Help & shortcuts"
        >
          <HelpCircle size={15} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[340px] sm:w-[400px] bg-background border-border overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="font-serif-italic text-2xl text-primary">
            NoteFlow Guide
          </SheetTitle>
          <p className="text-xs text-muted-foreground font-sans leading-relaxed">
            Everything you need to know to get the most out of NoteFlow.
          </p>
        </SheetHeader>

        {/* Keyboard shortcuts */}
        <div className="mb-6">
          <h3 className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Keyboard Shortcuts
          </h3>
          <div className="space-y-2">
            {SHORTCUTS.map((shortcut) => (
              <div
                key={shortcut.description}
                className="flex items-center justify-between py-2 px-3
                  rounded-md bg-secondary/50 border border-border"
              >
                <span className="text-xs font-sans text-foreground/80">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <span key={key} className="flex items-center gap-1">
                      <KeyBadge label={key} />
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-[10px] text-muted-foreground">
                          +
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips sections */}
        <div className="space-y-6">
          {TIPS.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2 text-xs font-sans text-foreground/75 leading-relaxed"
                  >
                    <span className="text-primary mt-0.5 shrink-0">›</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-[11px] font-mono text-muted-foreground text-center">
            All notes are saved locally in your browser
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
