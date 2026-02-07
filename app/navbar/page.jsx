'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    FaUserCircle,
    FaSignOutAlt,
    FaSignInAlt,
    FaCalendarAlt,
    FaMoon,
    FaSun,
    FaThLarge
} from 'react-icons/fa';
import { Menu, X, LayoutDashboard, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../contextapi/cliniccontext'; // Aapka purana context

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, login, theme, toggleTheme } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Appointment', path: '/crate', icon: <FaCalendarAlt size={16} /> },
        { name: 'Dashboard', path: '/AdminDashboard', icon: <LayoutDashboard size={18} /> },
    ];

    // Handle Scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        router.push("/");
    };

    return (
        <header
            className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled
                    ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-xl"
                    : "py-5 bg-blue-600 dark:bg-slate-900 shadow-md"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* ================= LOGO ================= */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-300 -rotate-3 group-hover:rotate-0 ${scrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                        }`}>
                        A
                    </div>
                    <span className={`text-2xl font-black tracking-tighter uppercase transition-colors ${scrolled ? "text-slate-900 dark:text-white" : "text-white"
                        }`}>
                        Admya<span className={scrolled ? "text-blue-600" : "text-blue-200"}>Clinic.</span>
                    </span>
                </Link>

                {/* ================= DESKTOP NAVIGATION ================= */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-[12px] font-bold uppercase tracking-widest transition-all px-3 py-2 rounded-lg flex items-center gap-2 ${scrolled
                                    ? (pathname === link.path ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:text-blue-600")
                                    : (pathname === link.path ? "bg-white/20 text-white" : "text-white/80 hover:text-white")
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* ================= ACTIONS (Theme & User) ================= */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${scrolled
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-blue-500"
                                : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                    >
                        {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border ${scrolled ? "border-slate-200 dark:border-slate-700" : "border-white/30"
                                    }`}>
                                    <FaUserCircle className={scrolled ? "text-blue-600" : "text-white"} size={20} />
                                    <span className={`text-sm font-bold ${scrolled ? "text-slate-700 dark:text-slate-200" : "text-white"}`}>
                                        {user.displayName?.split(' ')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={`p-2 rounded-xl transition-colors ${scrolled ? "text-red-500 hover:bg-red-50" : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    <FaSignOutAlt size={20} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={login}
                                className={`px-6 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${scrolled
                                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                                        : "bg-white text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl ${scrolled ? "text-slate-900 dark:text-white" : "text-white"
                            }`}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* ================= MOBILE OVERLAY ================= */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white dark:bg-slate-950 z-[110] p-8 flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-black text-2xl uppercase tracking-tighter text-blue-600">
                                Menu.
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 text-2xl font-bold transition-colors ${pathname === link.path ? "text-blue-600" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                >
                                    <span className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl">{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                        <FaUserCircle size={30} className="text-blue-600" />
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white leading-none">{user.displayName}</p>
                                            <p className="text-xs text-slate-500 mt-1">Patient Account</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { login(); setIsOpen(false); }}
                                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20"
                                >
                                    Sign In to Clinic
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}