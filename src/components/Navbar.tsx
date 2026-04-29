export default function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Leaderboards", href: "/leaderboards" },
    { label: "Compare", href: "/compare" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="text-2xl font-black tracking-tight">
          FC26 Tracker
        </a>

        <div className="flex flex-wrap gap-2 text-sm font-semibold text-gray-300">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
