'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contextapi/cliniccontext'; // tumhara context
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout, login } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Book Appointment', path: '/src/crate' },
        { name: 'Dashboard', path: '/src/AdminDashboard' },
        { name: 'Admin', path: '/admin' },
    ];

    return (
        <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo / Brand */}
                <Link href="/" className="font-bold text-xl">
                    🏥 ClinicApp
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition
                ${pathname === link.path ? 'bg-blue-800' : 'hover:bg-blue-500'}
              `}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* User / Auth Buttons */}
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <FaUserCircle className="text-lg" />
                            <span className="hidden sm:inline">{user.displayName}</span>
                            <button
                                onClick={logout}
                                className="flex items-center px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white text-sm"
                            >
                                <FaSignOutAlt className="mr-1" /> Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="flex items-center px-3 py-1 bg-green-500 rounded hover:bg-green-600 text-white text-sm"
                        >
                            <FaSignInAlt className="mr-1" /> Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
