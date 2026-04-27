export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-black/80 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="text-xl font-bold">
          FC26 Tracker
        </a>

        <div className="flex gap-6 text-sm text-gray-300">
          <a href="/leaderboards" className="hover:text-white">
            Leaderboards
          </a>
          <a href="/compare" className="hover:text-white">
            Compare
          </a>
        </div>
      </div>
    </nav>
  );
}