# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

This is a single-page React application that simulates a terminal portfolio interface. The entire application is contained within a single component (`src/App.jsx`) for simplicity.

### Key Architecture Points

- **Single-file architecture**: The main application logic, terminal commands, data, and UI are all contained in `src/App.jsx`
- **State management**: Uses React's built-in `useState` and a custom `useLocalStorage` hook for persistence
- **Data structure**: Portfolio data is defined in `DUMMY_DATA` constant within the App component
- **Theming**: Theme configurations are defined in `THEMES` object with support for default and retro themes
- **Command system**: Terminal commands are handled in the `run()` function with a switch statement

### Terminal Commands Available

The application implements a command-line interface with these commands:
- `about`, `skills`, `experience`, `education`, `projects`, `contact`, `whoami`
- `echo <text>`, `clear`, `help`
- `darkmode [on|off|toggle]` - toggles dark mode
- `theme <default|retro>` - switches between themes

### Data Modification

To update portfolio content, modify the `DUMMY_DATA` object in `src/App.jsx`. This includes:
- Personal information (name, title, location, etc.)
- Skills array
- Experience array with company, role, period, and bullets
- Education array
- Projects array
- Contact information array

### Styling

- Uses **Tailwind CSS** for styling with dark mode support via `class` strategy
- Mobile-first responsive design
- Custom terminal-like UI with glassmorphism effects
- Monospace font family for terminal authenticity

### Local Storage

The app persists these settings in localStorage:
- `terminal-dark`: dark mode preference
- `terminal-theme`: selected theme
- `terminal-resume`: portfolio data (currently uses DUMMY_DATA)