export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold">
          FC26 Tracker
        </a>

        <div className="flex gap-6 text-sm text-gray-300">
          <a href="/" className="hover:text-white">
            Home
          </a>

          <a href="/search" className="hover:text-white">
            Search
          </a>

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