import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    RaftLabs Movies
                </Link>
                <div className="flex gap-6">
                    <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                    {/* Add more links if needed */}
                </div>
            </div>
        </nav>
    );
}
