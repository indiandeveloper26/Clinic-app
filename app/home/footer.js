'use client';

import Link from "next/link";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Phone,
    MapPin,
    Clock,
    HeartPulse
} from "lucide-react";
import { useAuth } from '../contextapi/cliniccontext'; // Aapka clinic context

export default function Footer() {
    const { theme } = useAuth();
    const isDark = theme === "dark";

    return (
        <footer className={`mt-24 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0f172a] text-white" : "bg-slate-50 text-slate-900"
            }`}>

            {/* Premium Top Border Accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

            <div className="container mx-auto px-6 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Branding & Clinic Intro */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black italic text-2xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-500/30">
                                A
                            </div>
                            <span className="text-3xl font-black italic tracking-tighter uppercase">
                                Admya<span className="text-blue-600">Clinic.</span>
                            </span>
                        </Link>

                        <div className={`text-sm font-medium leading-relaxed max-w-sm uppercase tracking-wider text-[11px] space-y-4 ${isDark ? "opacity-60" : "text-slate-500"}`}>
                            <p className="flex items-start gap-2">
                                <MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" />
                                <span>Main Road, Near Ram Ki Paidi, Ayodhya, Uttar Pradesh - 224123</span>
                            </p>
                            <div className="flex flex-col gap-2">
                                <span className="flex items-center gap-2">
                                    <Phone size={14} className="text-blue-600" /> +91 78508 20955
                                </span>
                                <span className="flex items-center gap-2">
                                    <Mail size={14} className="text-blue-600" /> contact@admyaclinic.com
                                </span>
                            </div>
                        </div>

                        {/* Social Presence */}
                        <div className="flex gap-3 pt-2">
                            {[
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Twitter, href: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 ${isDark
                                            ? "bg-slate-800 text-white hover:bg-blue-600"
                                            : "bg-white shadow-md text-slate-400 hover:bg-blue-600 hover:text-white"
                                        }`}
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {["Home", "Services", "Book Appointment", "Dashboard"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : item === 'Book Appointment' ? '/crate' : `/${item.toLowerCase()}`}
                                        className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-blue-600 transition-all flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Clinic Specialities */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Specialities</h3>
                        <ul className="space-y-4">
                            {[
                                "Speech Therapy",
                                "Hearing Aids",
                                "Audiology",
                                "Child Development",
                                "Language Care"
                            ].map((service) => (
                                <li key={service} className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 cursor-default transition-opacity">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Operating Hours Card */}
                    <div className="lg:col-span-4">
                        <div className={`p-8 rounded-[2.5rem] border transition-all ${isDark
                                ? "bg-slate-900/50 border-slate-800 hover:border-blue-900"
                                : "bg-white shadow-2xl shadow-blue-500/5 border-slate-100"
                            }`}>
                            <div className="flex items-center gap-3 mb-6">
                                <Clock className="text-blue-600" size={20} />
                                <h3 className="text-sm font-black italic uppercase tracking-tighter">Clinic Timings</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center opacity-70">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Mon - Sat</span>
                                    <span className="text-[10px] font-bold">10:00 AM - 07:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center text-blue-600">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Sunday</span>
                                    <span className="text-[10px] font-bold underline decoration-2 offset-4">By Appointment</span>
                                </div>
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                                    <Link
                                        href="/crate"
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        <HeartPulse size={14} /> Emergency Support
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className={`mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? "border-slate-800" : "border-slate-200"
                    }`}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center md:text-left">
                        © {new Date().getFullYear()} Admya Speech & Hearing Clinic. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 cursor-pointer transition-opacity">Privacy Policy</span>
                        <div className="w-1.5 h-1.5 bg-blue-600/20 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 cursor-pointer transition-opacity">Terms of Care</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}