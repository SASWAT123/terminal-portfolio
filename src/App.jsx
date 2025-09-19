import React, { useEffect, useMemo, useRef, useState } from "react";

// ---- Terminal Portfolio (Single-file React component) ----
// Mobile-first, TailwindCSS styling, dark-mode toggle via terminal command
// Commands: about, skills, experience, education, projects, contact, clear,
//           darkmode [on|off|toggle], echo, whoami, linkedin, theme <name>, <command> --help/-h
// Notes:
// - Help text is shown only when the user explicitly requests via --help or -h.
// - Resume data is loaded from uploaded PDF and represented in DUMMY_DATA.

const DUMMY_DATA = {
  name: "Saswat Priyadarshan",
  title: "Software Engineer @ Microsoft",
  location: "Raleigh, NC, USA",
  email: "psaswat21@gmail.com",
  website: "https://saswat.dev",
  summary:
    "Software Engineer at Microsoft enabling seamless Azure DevOps infrastructure for silicon engineering teams. Experienced in pipeline automation, Docker, and Ansible. Master's in Computer Science from NCSU.",
  skills: [
    "Android Development",
    "C++",
    "Firebase",
    "DevOps: Docker, Azure DevOps, Ansible",
    "Web: React, SpringBoot, Node.js, Express, MongoDB",
    "Cloud-Native: Azure Service Bus, Event Hub, Kusto DB",
  ],
  experience: [
    {
      company: "Microsoft",
      role: "Software Engineer",
      period: "Feb 2023 — Present",
      bullets: [
        "Led Haia platform rollout, reducing licensing costs and saving hundreds of developer hours.",
        "Scaled agent pools with Docker and Azure, reducing pipeline latency by 60%.",
        "Designed YAML-based regression workflows with dynamic job control.",
        "Implemented publish-subscribe model using Azure Service Bus and Event Hub.",
      ],
    },
    {
      company: "Microsoft",
      role: "Software Engineer Intern",
      period: "May 2022 — Jul 2022",
      bullets: [
        "Built DevOps command-line tools in Python for Azure pipelines.",
        "Solved critical data import/export issue with efficient custom data structures.",
      ],
    },
    {
      company: "Walmart Global Tech India",
      role: "Software Engineer II",
      period: "Jul 2020 — Jul 2021",
      bullets: [
        "Automated incentive calculation flows, improving performance in STI domain.",
        "Developed scalable batch processes and integrated Azure LUIS chatbots.",
      ],
    },
    {
      company: "Verizon",
      role: "Member Of Technical Staff I (Full Stack Developer)",
      period: "Jul 2018 — Jul 2020",
      bullets: [
        "Built scalable web apps with React, SpringBoot, MySQL, microservices.",
        "Collaborated in 5G coverage architecture and data mapping consistency.",
      ],
    },
    {
      company: "Infosys",
      role: "Systems Engineer Trainee",
      period: "Feb 2018 — May 2018",
      bullets: [
        "Developed educator allotment system with Angular2, Node.js, Express, MongoDB.",
      ],
    },
  ],
  education: [
    { school: "North Carolina State University", degree: "M.S. in Computer Science", period: "Aug 2021 — Dec 2022" },
    { school: "SRM University", degree: "B.Tech in Information Technology", period: "2014 — 2018" },
  ],
  projects: [
    { name: "Haia Platform", desc: "AI-powered case management replacing Halo, reducing costs and improving automation." },
    { name: "System Design Evaluator", link: "https://github.com/saswat123/system-design-evaluator", desc: "Drag-and-drop system components with LLM feedback." },
  ],
  contact: [
    { label: "Email", value: "psaswat21@gmail.com" },
    { label: "LinkedIn", value: "https://www.linkedin.com/in/saswat-priyadarshan-ba2241122/" },
    { label: "GitHub", value: "https://github.com/saswat123" },
  ],
};

const THEMES = {
  default: {
    bg: "bg-gray-50 dark:bg-gray-900",
    text: "text-gray-900 dark:text-gray-100",
    panel: "bg-white/80 dark:bg-gray-800/90",
    prompt: "text-blue-600 dark:text-blue-400",
    secondary: "text-gray-700 dark:text-gray-300",
    accent: "text-blue-600 dark:text-blue-400",
  },
  retro: {
    bg: "bg-[#f4f1de] dark:bg-[#0b0c10]",
    text: "text-[#333] dark:text-[#e6e6e6]",
    panel: "bg-white/70 dark:bg-[#1f2833]/60",
    prompt: "text-[#2a9d8f] dark:text-[#66fcf1]",
    secondary: "text-[#555] dark:text-[#b3b3b3]",
    accent: "text-[#2a9d8f] dark:text-[#66fcf1]",
  },
  iterm: {
    bg: "bg-[#f7f7f7] dark:bg-[#1d1f21]",
    text: "text-[#333] dark:text-[#c5c8c6]",
    panel: "bg-white/90 dark:bg-[#282a2e]/95",
    prompt: "text-[#007acc] dark:text-[#81a2be]",
    secondary: "text-[#666] dark:text-[#969896]",
    accent: "text-[#007acc] dark:text-[#81a2be]",
  },
  dracula: {
    bg: "bg-[#f8f8f2] dark:bg-[#282a36]",
    text: "text-[#282a36] dark:text-[#f8f8f2]",
    panel: "bg-white/90 dark:bg-[#44475a]/90",
    prompt: "text-[#8be9fd] dark:text-[#8be9fd]",
    secondary: "text-[#6272a4] dark:text-[#6272a4]",
    accent: "text-[#ff79c6] dark:text-[#ff79c6]",
  },
  monokai: {
    bg: "bg-[#f8f8f2] dark:bg-[#272822]",
    text: "text-[#272822] dark:text-[#f8f8f2]",
    panel: "bg-white/90 dark:bg-[#3e3d32]/90",
    prompt: "text-[#a6e22e] dark:text-[#a6e22e]",
    secondary: "text-[#75715e] dark:text-[#75715e]",
    accent: "text-[#f92672] dark:text-[#f92672]",
  },
  ocean: {
    bg: "bg-[#eff1f5] dark:bg-[#2b303b]",
    text: "text-[#2b303b] dark:text-[#c0c5ce]",
    panel: "bg-white/90 dark:bg-[#343d46]/90",
    prompt: "text-[#8fa1b3] dark:text-[#8fa1b3]",
    secondary: "text-[#65737e] dark:text-[#65737e]",
    accent: "text-[#bf616a] dark:text-[#bf616a]",
  },
  solarized: {
    bg: "bg-[#fdf6e3] dark:bg-[#002b36]",
    text: "text-[#586e75] dark:text-[#839496]",
    panel: "bg-[#fdf6e3]/90 dark:bg-[#073642]/90",
    prompt: "text-[#268bd2] dark:text-[#268bd2]",
    secondary: "text-[#93a1a1] dark:text-[#586e75]",
    accent: "text-[#2aa198] dark:text-[#2aa198]",
  },
  cyberpunk: {
    bg: "bg-[#f0f3ff] dark:bg-[#0f0f23]",
    text: "text-[#0f0f23] dark:text-[#00ff41]",
    panel: "bg-white/90 dark:bg-[#1a1a2e]/90",
    prompt: "text-[#ff0080] dark:text-[#ff0080]",
    secondary: "text-[#666] dark:text-[#00d4aa]",
    accent: "text-[#00d4aa] dark:text-[#ffcc02]",
  },
};

const TERMINAL_SIZES = {
  small: "max-w-xl",
  medium: "max-w-3xl",
  large: "max-w-5xl",
  xlarge: "max-w-7xl",
  full: "max-w-none",
};

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

function formatSection(title) {
  return `\n\x1b[1m${title}\x1b[0m`;
}

function ansiToHtml(s) {
  return s
    .replaceAll("\x1b[1m", '<span class="font-semibold">')
    .replaceAll("\x1b[32m", '<span class="text-green-600 dark:text-green-400">')
    .replaceAll("\x1b[31m", '<span class="text-red-600 dark:text-red-400">')
    .replaceAll("\x1b[33m", '<span class="text-yellow-600 dark:text-yellow-400">')
    .replaceAll("\x1b[36m", '<span class="text-cyan-600 dark:text-cyan-400">')
    .replaceAll("\x1b[0m", "</span>")
    .replaceAll("\n", "<br/>");
}

export default function App() {
  const [dark, setDark] = useLocalStorage("terminal-dark", true);
  const [theme, setTheme] = useLocalStorage("terminal-theme", "default");
  const [terminalSize, setTerminalSize] = useLocalStorage("terminal-size", "medium");
  const [resume, setResume] = useLocalStorage("terminal-resume", DUMMY_DATA);
  const [lines, setLines] = useState([`Welcome to ${resume.name}'s portfolio! Type \x1b[1mhelp\x1b[0m to list commands or \x1b[1m<command> --help\x1b[0m for details.`]);
  const [cmd, setCmd] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabSuggestions, setTabSuggestions] = useState([]);
  const inputRef = useRef(null);

  const themeCfg = THEMES[theme] || THEMES.default;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const prompt = useMemo(
    () => (
      <span>
        <span className={`${themeCfg.prompt}`}>saswat@portfolio</span>
        <span className="mx-1">:</span>
        <span className={`${themeCfg.accent}`}>~</span>
        <span className="mx-1">$</span>
      </span>
    ),
    [themeCfg]
  );

  function print(text) {
    setLines((prev) => [...prev, ...(Array.isArray(text) ? text : [text])]);
  }

  function clear() {
    setLines([]);
  }

  function help() {
    return [
      "about",
      "skills",
      "experience",
      "education",
      "projects",
      "contact",
      "whoami",
      "echo <text>",
      "clear",
      "darkmode [on|off|toggle]",
      "theme <default|retro|iterm|dracula|monokai|ocean|solarized|cyberpunk>",
      "resize <small|medium|large|xlarge|full>",
    ];
  }

  function getCommands() {
    return [
      "about",
      "skills",
      "experience",
      "education",
      "projects",
      "contact",
      "whoami",
      "echo",
      "clear",
      "darkmode",
      "theme",
      "resize",
      "help"
    ];
  }

  function handleTabCompletion() {
    const input = cmd.trim();
    const commands = getCommands();

    if (tabSuggestions.length === 0) {
      // First tab - find matching commands
      const matches = commands.filter(command => command.startsWith(input));
      if (matches.length === 0) return;

      setTabSuggestions(matches);
      setTabIndex(0);
      setCmd(matches[0]);
    } else {
      // Subsequent tabs - cycle through suggestions
      const nextIndex = (tabIndex + 1) % tabSuggestions.length;
      setTabIndex(nextIndex);
      setCmd(tabSuggestions[nextIndex]);
    }
  }

  function run(raw) {
    const input = raw.trim();
    if (!input) return;
    setHistory((h) => [...h, input]);
    setHistIdx(-1);

    const [c, ...rest] = input.split(/\s+/);
    const arg = rest.join(" ");
    const isHelp = rest.includes("--help") || rest.includes("-h");

    switch (c) {
      case "about":
        if (isHelp) {
          print(`\x1b[32mabout - Display basic information about ${resume.name}\x1b[0m`);
        } else {
          print(`\x1b[32m${resume.name} — ${resume.title}\x1b[0m`);
        }
        break;
      case "skills":
        if (isHelp) {
          print(`\x1b[32mskills - List technical skills and expertise\x1b[0m`);
        } else {
          print(`\x1b[32m${resume.skills.join("\n")}\x1b[0m`);
        }
        break;
      case "experience":
        if (isHelp) {
          print(`\x1b[32mexperience - Show work experience and career history\x1b[0m`);
        } else {
          resume.experience.forEach((e) => {
            print(`\x1b[32m${e.role} at ${e.company} (${e.period})\x1b[0m`);
            e.bullets.forEach((b) => print(`\x1b[32m - ${b}\x1b[0m`));
          });
        }
        break;
      case "education":
        if (isHelp) {
          print(`\x1b[32meducation - Display educational background and degrees\x1b[0m`);
        } else {
          resume.education.forEach((e) => print(`\x1b[32m${e.degree} — ${e.school} (${e.period})\x1b[0m`));
        }
        break;
      case "projects":
        if (isHelp) {
          print(`\x1b[32mprojects - Show notable projects and contributions\x1b[0m`);
        } else {
          resume.projects.forEach((p) => print(`\x1b[32m${p.name}: ${p.desc} ${p.link || ""}\x1b[0m`));
        }
        break;
      case "contact":
        if (isHelp) {
          print(`\x1b[32mcontact - Display contact information and social links\x1b[0m`);
        } else {
          resume.contact.forEach((c) => print(`\x1b[32m${c.label}: ${c.value}\x1b[0m`));
        }
        break;
      case "whoami":
        if (isHelp) {
          print(`\x1b[32mwhoami - Show current user identity (same as about)\x1b[0m`);
        } else {
          print(`\x1b[32m${resume.name} — ${resume.title}\x1b[0m`);
        }
        break;
      case "echo":
        if (isHelp) {
          print(`\x1b[32mecho <text> - Display the given text\x1b[0m`);
          print(`\x1b[32mUsage: echo Hello World\x1b[0m`);
        } else {
          print(`\x1b[32m${arg}\x1b[0m`);
        }
        break;
      case "clear":
        if (isHelp) {
          print(`\x1b[32mclear - Clear the terminal screen\x1b[0m`);
        } else {
          clear();
        }
        break;
      case "darkmode":
        if (isHelp) {
          print(`\x1b[32mdarkmode [on|off|toggle] - Toggle dark mode\x1b[0m`);
          print(`\x1b[32mUsage: darkmode on, darkmode off, or darkmode (toggle)\x1b[0m`);
        } else {
          const a = rest.filter(arg => !arg.startsWith("-"))[0];
          if (a == "on") setDark(true);
          else if (a == "off") setDark(false);
          else setDark((d) => !d);
        }
        break;
      case "theme":
        if (isHelp) {
          print(`\x1b[32mtheme <name> - Switch between visual themes\x1b[0m`);
          print(`\x1b[32mAvailable themes: ${Object.keys(THEMES).join(", ")}\x1b[0m`);
          print(`\x1b[32mUsage: theme default, theme retro\x1b[0m`);
        } else {
          const t = (rest.filter(arg => !arg.startsWith("-"))[0] || "default").toLowerCase();
          if (THEMES[t]) {
            setTheme(t);
            print(`\x1b[32mtheme set to ${t}\x1b[0m`);
          } else {
            print(`\x1b[31munknown theme: ${t}\x1b[0m`);
          }
        }
        break;
      case "resize":
        if (isHelp) {
          print(`\x1b[32mresize <size> - Change terminal screen size\x1b[0m`);
          print(`\x1b[32mAvailable sizes: ${Object.keys(TERMINAL_SIZES).join(", ")}\x1b[0m`);
          print(`\x1b[32mUsage: resize large, resize small, resize full\x1b[0m`);
        } else {
          const size = (rest.filter(arg => !arg.startsWith("-"))[0] || "medium").toLowerCase();
          if (TERMINAL_SIZES[size]) {
            setTerminalSize(size);
            print(`\x1b[32mterminal size set to ${size}\x1b[0m`);
          } else {
            print(`\x1b[31munknown size: ${size}\x1b[0m`);
            print(`\x1b[32mAvailable sizes: ${Object.keys(TERMINAL_SIZES).join(", ")}\x1b[0m`);
          }
        }
        break;
      case "help":
        if (isHelp) {
          print(`\x1b[32mhelp - Show list of available commands\x1b[0m`);
          print(`\x1b[32mTip: Use <command> --help or <command> -h for detailed help\x1b[0m`);
        } else {
          print(`\x1b[32m${help().join("\n")}\x1b[0m`);
        }
        break;
      default:
        print(`\x1b[31mcommand not found: ${c} (try help)\x1b[0m`);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === "Enter") {
      const value = cmd;
      print(`${promptToText()} \x1b[33m${value}\x1b[0m`);
      setCmd("");
      setTabSuggestions([]);
      setTabIndex(0);
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setTabSuggestions([]);
      setTabIndex(0);
      setHistIdx((idx) => {
        const next = idx < 0 ? history.length - 1 : Math.max(0, idx - 1);
        setCmd(history[next] || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setTabSuggestions([]);
      setTabIndex(0);
      setHistIdx((idx) => {
        const next = Math.min(history.length - 1, idx + 1);
        setCmd(history[next] || "");
        return next;
      });
    } else {
      // Reset tab completion on any other key
      setTabSuggestions([]);
      setTabIndex(0);
    }
  }

  function promptToText() {
    return "saswat@portfolio:~$";
  }

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen ${themeCfg.bg} ${themeCfg.text} transition-colors duration-300`}>
      <div className={`mx-auto ${TERMINAL_SIZES[terminalSize] || TERMINAL_SIZES.medium} px-3 py-6 sm:px-6`}>
        {/* Header */}
        <div className={`mb-4 rounded-2xl ${themeCfg.panel} backdrop-blur p-4 shadow-sm flex items-center justify-between`}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{resume.name}</h1>
            <p className={`text-sm ${themeCfg.secondary}`}>{resume.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className={`rounded-xl px-3 py-1 text-sm border transition-all duration-200 ${
                dark
                  ? 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700'
              }`}
            >
              {dark ? "Light" : "Dark"}
            </button>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`rounded-xl px-2 py-1 text-sm border transition-all duration-200 ${
                dark
                  ? 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700'
              }`}
            >
              {Object.keys(THEMES).map((k) => (<option key={k} value={k} className="bg-inherit">{k}</option>))}
            </select>
            <select
              value={terminalSize}
              onChange={(e) => setTerminalSize(e.target.value)}
              className={`rounded-xl px-2 py-1 text-sm border transition-all duration-200 ${
                dark
                  ? 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700'
              }`}
            >
              {Object.keys(TERMINAL_SIZES).map((size) => (<option key={size} value={size} className="bg-inherit">{size}</option>))}
            </select>
          </div>
        </div>

        {/* Terminal */}
        <div className={`rounded-2xl ${themeCfg.panel} backdrop-blur p-3 sm:p-4 shadow-lg`} style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className={`ml-2 text-xs ${themeCfg.secondary}`}>terminal — {resume.name}</span>
          </div>

          <div className="mt-3 text-sm sm:text-base leading-6 break-words">
            {lines.map((l, i) => (<div key={i} dangerouslySetInnerHTML={{ __html: ansiToHtml(l) }} />))}
            <div className="flex items-center gap-2 mt-1">
              <span className="whitespace-pre">{prompt}</span>
              <input ref={inputRef} value={cmd} onChange={(e) => setCmd(e.target.value)} onKeyDown={onKeyDown} className="flex-1 bg-transparent outline-none placeholder:opacity-40 min-w-0" placeholder="type a command (try: help)" autoCapitalize="off" autoCorrect="off" spellCheck={false} />
            </div>
          </div>

          {/* Mobile tips */}
          <div className={`mt-3 text-xs ${themeCfg.secondary} sm:hidden`}>
            Tip: tap input, type a command, then hit Go/Enter. Use <code>darkmode</code> to switch.
          </div>
        </div>

        {/* Footer */}
        <div className={`text-xs ${themeCfg.secondary} mt-4 text-center`}>
          Type <span className="font-semibold">help</span> to explore • Connect on{" "}
          <a href="https://www.linkedin.com/in/saswat-priyadarshan-ba2241122/" target="_blank" rel="noopener noreferrer" className={`underline ${themeCfg.accent} hover:opacity-80`}>LinkedIn</a>
          {" "} • {" "}
          <a href="https://github.com/saswat123" target="_blank" rel="noopener noreferrer" className={`underline ${themeCfg.accent} hover:opacity-80`}>GitHub</a>
        </div>
      </div>
    </div>
  );
}
