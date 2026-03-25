import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId, extractTitle } from "@/lib/utils";

const SEED_NOTE = {
  id: generateId(),
  title: "Welcome to NoteFlow",
  content: `# Welcome to NoteFlow

A clean, focused markdown editor for developers.

## What you can do

- Write notes in **markdown** and see a live preview
- Organise with **tags** and search across all notes
- Everything **autosaves** — no save button needed
- Pin important notes to the top

## Markdown support

\`\`\`js
// Code blocks work too
const greet = (name) => \`Hello, \${name}!\`
\`\`\`

> Blockquotes, **bold**, *italic*, and more all render live.

Start writing to see the magic.
`,
  tags: ["welcome", "markdown"],
  pinned: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function notesReducer(state, action) {
  switch (action.type) {
    case "LOAD_NOTES":
      return { ...state, notes: action.payload };

    case "ADD_NOTE": {
      const newNote = {
        id: generateId(),
        title: "Untitled",
        content: "",
        tags: [],
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id,
      };
    }

    case "UPDATE_NOTE": {
      const updatedNotes = state.notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              ...action.payload.changes,
              title: extractTitle(
                action.payload.changes.content ?? note.content,
              ),
              updatedAt: new Date().toISOString(),
            }
          : note,
      );
      return { ...state, notes: updatedNotes };
    }

    case "DELETE_NOTE": {
      const remaining = state.notes.filter(
        (note) => note.id !== action.payload,
      );
      const newActiveId =
        state.activeNoteId === action.payload
          ? (remaining[0]?.id ?? null)
          : state.activeNoteId;
      return { ...state, notes: remaining, activeNoteId: newActiveId };
    }

    case "DUPLICATE_NOTE": {
      const original = state.notes.find((n) => n.id === action.payload);
      if (!original) return state;
      const duplicate = {
        ...original,
        id: generateId(),
        title: `${original.title} (copy)`,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const index = state.notes.findIndex((n) => n.id === action.payload);
      const newNotes = [
        ...state.notes.slice(0, index + 1),
        duplicate,
        ...state.notes.slice(index + 1),
      ];
      return { ...state, notes: newNotes, activeNoteId: duplicate.id };
    }

    case "PIN_NOTE": {
      const pinnedNotes = state.notes.map((note) =>
        note.id === action.payload
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      );
      return { ...state, notes: pinnedNotes };
    }

    case "SET_ACTIVE_NOTE":
      return { ...state, activeNoteId: action.payload };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "SET_TAG_FILTER":
      return {
        ...state,
        selectedTag:
          state.selectedTag === action.payload ? null : action.payload,
      };

    case "SET_SAVE_STATUS":
      return { ...state, saveStatus: action.payload };

    case "SET_THEME":
      return { ...state, theme: action.payload };

    default:
      return state;
  }
}

const initialState = {
  notes: [],
  activeNoteId: null,
  searchQuery: "",
  selectedTag: null,
  saveStatus: "saved",
  theme: "dark",
};

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [storedNotes, setStoredNotes] = useLocalStorage("noteflow-notes", [
    SEED_NOTE,
  ]);
  const [state, dispatch] = useReducer(notesReducer, {
    ...initialState,
    notes: storedNotes,
    activeNoteId: storedNotes[0]?.id ?? null,
    theme: localStorage.getItem("noteflow-theme") ?? "dark",
  });

  useEffect(() => {
    setStoredNotes(state.notes);
  }, [state.notes]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("noteflow-theme", state.theme);
  }, [state.theme]);

  const activeNote =
    state.notes.find((n) => n.id === state.activeNoteId) ?? null;

  const filteredNotes = state.notes
    .filter((note) => {
      const matchesSearch =
        state.searchQuery === "" ||
        note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesTag =
        state.selectedTag === null || note.tags.includes(state.selectedTag);

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  const allTags = [...new Set(state.notes.flatMap((n) => n.tags))].sort();

  const addNote = useCallback(() => {
    dispatch({ type: "ADD_NOTE" });
  }, []);

  const updateNote = useCallback((id, changes) => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, changes } });
  }, []);

  const deleteNote = useCallback((id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  }, []);

  const duplicateNote = useCallback((id) => {
    dispatch({ type: "DUPLICATE_NOTE", payload: id });
  }, []);

  const pinNote = useCallback((id) => {
    dispatch({ type: "PIN_NOTE", payload: id });
  }, []);

  const setActiveNote = useCallback((id) => {
    dispatch({ type: "SET_ACTIVE_NOTE", payload: id });
  }, []);

  const setSearch = useCallback((query) => {
    dispatch({ type: "SET_SEARCH", payload: query });
  }, []);

  const setTagFilter = useCallback((tag) => {
    dispatch({ type: "SET_TAG_FILTER", payload: tag });
  }, []);

  const setSaveStatus = useCallback((status) => {
    dispatch({ type: "SET_SAVE_STATUS", payload: status });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  }, [state.theme]);

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        activeNoteId: state.activeNoteId,
        searchQuery: state.searchQuery,
        selectedTag: state.selectedTag,
        saveStatus: state.saveStatus,
        theme: state.theme,
        activeNote,
        filteredNotes,
        allTags,
        addNote,
        updateNote,
        deleteNote,
        duplicateNote,
        pinNote,
        setActiveNote,
        setSearch,
        setTagFilter,
        setSaveStatus,
        toggleTheme,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used inside a NotesProvider");
  }
  return context;
}
