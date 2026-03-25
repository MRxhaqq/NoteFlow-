import { useNotes } from "@/context/NotesContext";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelpPanel from "./HelpPanel";

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useNotes();

  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-8 w-8 text-muted-foreground hover:text-foreground md:hidden"
          title="Open sidebar"
        >
          <Menu size={15} />
        </Button>
        <span className="font-serif-italic text-xl text-primary tracking-wide">
          NoteFlow
        </span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1">
        <HelpPanel />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </Button>
      </div>
    </header>
  );
}
