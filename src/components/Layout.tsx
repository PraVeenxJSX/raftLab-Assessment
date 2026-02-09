import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={`min-h-screen flex flex-col ${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} RaftLabs Movies. All rights reserved.
            </footer>
        </div>
    );
}
