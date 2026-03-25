import { useState } from "react";
import { NotesProvider } from "@/context/NotesContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import { cn } from "@/lib/utils";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay — darkens background when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — drawer on mobile, static on desktop */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-12 transition-transform duration-200",
            "md:relative md:translate-x-0 md:mt-0 md:flex md:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar onNoteSelect={() => setSidebarOpen(false)} />
        </div>

        {/* Main editor area */}
        <main className="flex-1 flex overflow-hidden min-w-0">
          <Editor />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NotesProvider>
      <AppLayout />
    </NotesProvider>
  );
}
