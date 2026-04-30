export default function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Leaderboards", href: "/leaderboards" },
    { label: "Compare", href: "/compare" },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 w-full border-b border-emerald-300/10 bg-black/90 text-white backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a href="/" className="text-2xl font-black tracking-tight text-white">
          FC26 Tracker
        </a>

        <div className="flex max-w-full flex-wrap gap-1.5 text-sm font-semibold text-gray-300 sm:gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 transition hover:bg-emerald-300/10 hover:text-emerald-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
