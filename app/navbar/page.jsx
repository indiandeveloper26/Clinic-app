'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contextapi/cliniccontext';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout, login } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Book Appointment', path: '/crate' },
        { name: 'Dashboard', path: '/AdminDashboard' },

    ];

    return (
        <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo */}
                <Link href="/" className="font-bold text-xl">
                    🏥  Admya Clinic

                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition
                                ${pathname === link.path ? 'bg-blue-800' : 'hover:bg-blue-500'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center space-x-2">
                            <FaUserCircle className="text-lg" />
                            <span>{user.displayName}</span>
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

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white focus:outline-none text-2xl"
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-500 px-4 pt-2 pb-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition
                                ${pathname === link.path ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex flex-col space-y-1 mt-2">
                            <div className="flex items-center space-x-2">
                                <FaUserCircle className="text-lg" />
                                <span>{user.displayName}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white text-sm mt-1"
                            >
                                <FaSignOutAlt className="mr-1" /> Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="flex items-center px-3 py-2 bg-green-500 rounded hover:bg-green-600 text-white text-sm mt-2"
                        >
                            <FaSignInAlt className="mr-1" /> Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
