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
    bg: "bg-zinc-100 dark:bg-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    panel: "bg-white/70 dark:bg-zinc-800/60",
    prompt: "text-emerald-600 dark:text-emerald-400",
  },
  retro: {
    bg: "bg-[#f4f1de] dark:bg-[#0b0c10]",
    text: "text-[#222] dark:text-[#c5c6c7]",
    panel: "bg-white/70 dark:bg-[#1f2833]/60",
    prompt: "text-[#2a9d8f] dark:text-[#66fcf1]",
  },
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
    .replaceAll("\x1b[32m", '<span class="text-green-400">')
    .replaceAll("\x1b[31m", '<span class="text-red-400">')
    .replaceAll("\x1b[33m", '<span class="text-yellow-400">')
    .replaceAll("\x1b[0m", "</span>")
    .replaceAll("\n", "<br/>");
}

export default function App() {
  const [dark, setDark] = useLocalStorage("terminal-dark", true);
  const [theme, setTheme] = useLocalStorage("terminal-theme", "default");
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
        <span className="text-blue-600 dark:text-blue-400">~</span>
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
      "theme <default|retro>",
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

    switch (c) {
      case "about":
        print(`\x1b[32m${resume.name} — ${resume.title}\x1b[0m`);
        break;
      case "skills":
        print(`\x1b[32m${resume.skills.join("\n")}\x1b[0m`);
        break;
      case "experience":
        resume.experience.forEach((e) => {
          print(`\x1b[32m${e.role} at ${e.company} (${e.period})\x1b[0m`);
          e.bullets.forEach((b) => print(`\x1b[32m - ${b}\x1b[0m`));
        });
        break;
      case "education":
        resume.education.forEach((e) => print(`\x1b[32m${e.degree} — ${e.school} (${e.period})\x1b[0m`));
        break;
      case "projects":
        resume.projects.forEach((p) => print(`\x1b[32m${p.name}: ${p.desc} ${p.link || ""}\x1b[0m`));
        break;
      case "contact":
        resume.contact.forEach((c) => print(`\x1b[32m${c.label}: ${c.value}\x1b[0m`));
        break;
      case "whoami":
        print(`\x1b[32m${resume.name} — ${resume.title}\x1b[0m`);
        break;
      case "echo":
        print(`\x1b[32m${arg}\x1b[0m`);
        break;
      case "clear":
        clear();
        break;
      case "darkmode": {
        const a = rest[0];
        if (a == "on") setDark(true);
        else if (a == "off") setDark(false);
        else setDark((d) => !d);
        break;
      }
      case "theme": {
        const t = (rest[0] || "default").toLowerCase();
        if (THEMES[t]) {
          setTheme(t);
          print(`\x1b[32mtheme set to ${t}\x1b[0m`);
        } else {
          print(`\x1b[31munknown theme: ${t}\x1b[0m`);
        }
        break;
      }
      case "help":
        print(`\x1b[32m${help().join("\n")}\x1b[0m`);
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
      <div className="mx-auto max-w-3xl px-3 py-6 sm:px-6">
        {/* Header */}
        <div className={`mb-4 rounded-2xl ${themeCfg.panel} backdrop-blur p-4 shadow-sm flex items-center justify-between`}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{resume.name}</h1>
            <p className="text-sm opacity-80">{resume.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark((d) => !d)} className="rounded-xl px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700 hover:opacity-80">
              {dark ? "Light" : "Dark"}
            </button>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="rounded-xl px-2 py-1 text-sm border border-zinc-300 dark:border-zinc-700 bg-transparent">
              {Object.keys(THEMES).map((k) => (<option key={k} value={k}>{k}</option>))}
            </select>
          </div>
        </div>

        {/* Terminal */}
        <div className={`rounded-2xl ${themeCfg.panel} backdrop-blur p-3 sm:p-4 shadow-lg`} style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs opacity-70">terminal — {resume.name}</span>
          </div>

          <div className="mt-3 text-sm sm:text-base leading-6 break-words">
            {lines.map((l, i) => (<div key={i} dangerouslySetInnerHTML={{ __html: ansiToHtml(l) }} />))}
            <div className="flex items-center gap-2 mt-1">
              <span className="whitespace-pre">{prompt}</span>
              <input ref={inputRef} value={cmd} onChange={(e) => setCmd(e.target.value)} onKeyDown={onKeyDown} className="flex-1 bg-transparent outline-none placeholder:opacity-40 min-w-0" placeholder="type a command (try: help)" autoCapitalize="off" autoCorrect="off" spellCheck={false} />
            </div>
          </div>

          {/* Mobile tips */}
          <div className="mt-3 text-xs opacity-70 sm:hidden">
            Tip: tap input, type a command, then hit Go/Enter. Use <code>darkmode</code> to switch.
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs opacity-70 mt-4 text-center">
          Type <span className="font-semibold">help</span> to explore • Connect on{" "}
          <a href="https://www.linkedin.com/in/saswat-priyadarshan-ba2241122/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
