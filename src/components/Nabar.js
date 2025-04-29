'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path
      ? 'text-white bg-indigo-600'
      : 'text-indigo-700 hover:bg-indigo-100';

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          DoctorFinder
        </Link>

        <div className="space-x-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded transition ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            href="/add-doctor"
            className={`px-4 py-2 rounded transition ${isActive('/add-doctor')}`}
          >
            Add Doctor
          </Link>
        </div>
      </div>
    </nav>
  );
}