# 🖥️ Terminal Portfolio

A modern, interactive terminal-style portfolio built with React, Vite, and Tailwind CSS. Experience a unique take on personal portfolios that simulates a terminal interface with command-line interactions.

## ✨ Features

### 🎨 **Multiple Themes**
- **Default**: Clean macOS-inspired light/dark theme
- **Retro**: Nostalgic vintage terminal aesthetic
- **iTerm**: Classic iTerm2 blue color scheme
- **Dracula**: Popular dark theme with purple and cyan accents
- **Monokai**: Sublime Text's famous green and pink theme
- **Ocean**: Base16 Ocean with cool blue tones
- **Solarized**: Ethan Schoonover's scientifically designed low-contrast theme
- **Cyberpunk**: Futuristic neon green and magenta theme

### 📱 **Responsive Design**
- **Terminal Sizing**: 5 different screen sizes (small, medium, large, xlarge, full)
- **Mobile Optimized**: Touch-friendly interface with mobile-specific tips
- **Adaptive Layouts**: Works seamlessly across all devices

### ⌨️ **Interactive Terminal**
- **Tab Completion**: Smart command completion and cycling
- **Command History**: Navigate with arrow keys
- **Help System**: Comprehensive `--help` and `-h` support for all commands
- **Color-coded Output**: Green responses, yellow commands, red errors

### 🎯 **Available Commands**
```bash
about           # Display basic information
skills          # List technical skills and expertise
experience      # Show work experience and career history
education       # Display educational background
projects        # Show notable projects and contributions
contact         # Display contact information and social links
whoami          # Show current user identity
echo <text>     # Display the given text
clear           # Clear the terminal screen
darkmode        # Toggle between light/dark modes
theme <name>    # Switch between visual themes
resize <size>   # Change terminal screen size
help            # Show list of available commands
```

### 💾 **Persistent Settings**
- Theme preferences saved to localStorage
- Dark/light mode preference retained
- Terminal size preference maintained
- Seamless experience across browser sessions

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SASWAT123/terminal-portfolio.git
cd terminal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 🛠️ Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage Examples

```bash
# Get help for any command
about --help
theme -h

# Switch themes
theme dracula
theme solarized

# Resize terminal
resize large
resize full

# Toggle dark mode
darkmode on
darkmode off
darkmode        # toggle

# View information
about
skills
experience
projects
```

## 🏗️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom themes
- **Icons**: Terminal window controls and visual elements
- **Fonts**: Monospace fonts for authentic terminal feel
- **Storage**: localStorage for persistent user preferences

## 📁 Project Structure

```
terminal-portfolio/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build configuration
└── CLAUDE.md           # Development guidelines and architecture
```

## 🎨 Theme Customization

The application supports easy theme customization through the `THEMES` object in `src/App.jsx`. Each theme includes:

- Background colors for light/dark modes
- Text colors with proper contrast ratios
- Panel colors with transparency effects
- Prompt and accent colors for highlights
- Secondary text colors for subtle elements

## 📱 Mobile Experience

- **Touch Optimized**: Large touch targets and smooth interactions
- **Mobile Tips**: Contextual help for mobile users
- **Responsive Text**: Scalable fonts and spacing
- **Gesture Support**: Swipe and tap interactions

## 🔧 Development

The project follows modern React patterns:

- **Single Component Architecture**: Main logic in one file for simplicity
- **Custom Hooks**: `useLocalStorage` for persistent state
- **ANSI Color Support**: Terminal-style color formatting
- **Command Pattern**: Extensible command system

## 🌟 Features Highlights

- **Real-time Theme Switching**: Instant visual feedback
- **Smart Tab Completion**: Context-aware command suggestions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and minimal re-renders
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! The codebase is designed to be easily modifiable:

1. Update personal information in `DUMMY_DATA`
2. Add new themes to the `THEMES` object
3. Extend commands in the `run()` function
4. Customize styling in Tailwind classes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Connect

- **Portfolio**: [Live Demo](https://your-portfolio-url.com)
- **LinkedIn**: [Saswat Priyadarshan](https://www.linkedin.com/in/saswat-priyadarshan-ba2241122/)
- **GitHub**: [@saswat123](https://github.com/saswat123)

---

Built with ❤️ by [Saswat Priyadarshan](https://github.com/saswat123) using React, Vite, and Tailwind CSS.