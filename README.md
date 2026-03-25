# NoteFlow

A clean, developer-focused markdown notes app. Write in markdown, see a live preview, organise with tags, and never worry about saving.

![React](https://img.shields.io/badge/built%20with-React%2018-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/bundler-Vite%205-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/styles-Tailwind%20CSS%203-06B6D4?style=flat&logo=tailwindcss)

## Features

- **Split-pane editor** — write markdown on the left, see the rendered preview on the right
- **Autosave** — notes save automatically 500ms after you stop typing
- **Tag system** — add multiple tags per note, filter by tag in the sidebar
- **Full-text search** — searches across note titles and content instantly
- **Pin notes** — keep important notes pinned to the top of the list
- **Export** — download any note as a `.md` file with frontmatter metadata
- **Duplicate** — clone a note to use as a starting template
- **Confirm delete** — confirmation dialog prevents accidental data loss
- **Light / dark mode** — warm amber dark theme by default, clean light mode available
- **Keyboard shortcuts** — `Alt+N` new note, `Ctrl+S` force save
- **Responsive** — collapses to a single pane on mobile with a slide-in sidebar drawer

## Tech Stack

| Tool                    | Version | Purpose            |
| ----------------------- | ------- | ------------------ |
| React                   | 18      | UI framework       |
| Vite                    | 5       | Build tool         |
| Tailwind CSS            | 3       | Styling            |
| shadcn/ui               | latest  | UI components      |
| react-markdown          | 9       | Markdown rendering |
| @tailwindcss/typography | latest  | Prose styling      |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/MRxhaqq/NoteFlow-.git
cd noteflow

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Editor.jsx        # Split-pane markdown editor
│   ├── EmptyState.jsx    # Empty state screens
│   ├── Header.jsx        # App header with theme toggle
│   ├── HelpPanel.jsx     # Slide-in help & shortcuts guide
│   ├── NoteCard.jsx      # Single note in the sidebar list
│   ├── Preview.jsx       # Live markdown preview
│   ├── SearchBar.jsx     # Full-text search input
│   ├── Sidebar.jsx       # Note list + search + tag filter
│   ├── TagFilter.jsx     # Tag filter strip
│   ├── TagInput.jsx      # Inline tag management
│   └── Toolbar.jsx       # Word count, autosave, actions
├── context/
│   └── NotesContext.jsx  # Global state — useReducer + Context
├── hooks/
│   ├── useDebounce.js    # Debounce hook for autosave
│   └── useLocalStorage.js # Persistent localStorage hook
├── lib/
│   └── utils.js          # Helpers: cn, formatDate, exportNote, etc.
├── App.jsx
└── main.jsx
```

## Data

All notes are stored in `localStorage` under the key `noteflow-notes`. No account, no server, no sync — your notes stay in your browser.

## Keyboard Shortcuts

| Shortcut | Action                      |
| -------- | --------------------------- |
| `Alt+N`  | Create a new note           |
| `Ctrl+S` | Force save the current note |

## License

MIT
