"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("dark");
  const pathname = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Leaderboards", href: "/leaderboards" },
    { label: "Compare", href: "/compare" },
    { label: "Updates", href: "/patches" },
  ];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("proclubshq-theme");
    const preferredTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";

    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("proclubshq-theme", nextTheme);
  }

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 w-full border-b border-emerald-300/10 bg-black/90 text-white backdrop-blur"
    >
      <div className="mx-auto flex max-w-[84rem] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <a href="/" className="text-2xl font-semibold tracking-tight text-white">
          ProClubsHQ
        </a>

        <div className="flex max-w-full flex-wrap items-center gap-2 text-sm font-semibold text-gray-300">
          <div className="flex flex-wrap gap-1.5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  link.href === "/"
                    ? pathname === "/"
                      ? "page"
                      : undefined
                    : pathname?.startsWith(link.href)
                      ? "page"
                      : undefined
                }
                className={`app-pill-link ${
                  link.href === "/"
                    ? pathname === "/"
                      ? "app-pill-link-active"
                      : ""
                    : pathname?.startsWith(link.href)
                      ? "app-pill-link-active"
                      : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            aria-label="Theme options"
            className="ml-0 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.04] p-1 sm:ml-2"
          >
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              aria-pressed={theme === "dark"}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                theme === "dark"
                  ? "bg-white text-black"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              aria-pressed={theme === "light"}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                theme === "light"
                  ? "bg-emerald-300 text-black"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              Light
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
