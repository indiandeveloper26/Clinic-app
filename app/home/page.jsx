'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Framer motion add kiya
import {
    FaPhoneAlt,
    FaStethoscope,
    FaUserMd,
    FaCheckCircle,
    FaSmile,
    FaMoon,
    FaSun,
    FaCalendarAlt
} from "react-icons/fa";

export default function HomePage() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Animations Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-500">

            {/* ================= NAVBAR & TOGGLE ================= */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                    >
                        Admya Clinic
                    </motion.div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-blue-400 transition-all"
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
                    </button>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="md:w-1/2 space-y-8"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">
                            Trusted Speech & Hearing Care
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Unlock the Power of <br />
                            <span className="text-blue-600">Communication</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                            Specialized care for speech and hearing disorders in Ayodhya.
                            We empower lives through expert therapy and modern technology.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="tel:07850820955"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-blue-500/30 transition-all"
                            >
                                <FaPhoneAlt /> Call Now
                            </motion.a>
                            <Link href="/crate">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-all"
                                >
                                    <FaCalendarAlt className="text-blue-600" /> Book Appointment
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                            <Image
                                src="/images/img3.png"
                                alt="Clinic Hero"
                                width={800}
                                height={500}
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                            <div className="bg-green-100 p-3 rounded-xl"><FaCheckCircle className="text-green-600 text-xl" /></div>
                            <div>
                                <p className="text-sm font-bold tracking-tight">100% Certified</p>
                                <p className="text-xs text-slate-500">Expert Specialists</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= TRUST BADGES ================= */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <TrustItem icon={<FaUserMd />} title="Expert Doctors" text="Qualified Speech & Hearing Specialists" />
                    <TrustItem icon={<FaCheckCircle />} title="Proven Results" text="Personalized Therapy Plans" />
                    <TrustItem icon={<FaSmile />} title="Patient Care" text="Caring & Friendly Environment" />
                </motion.div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialized Services</h2>
                    <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <ServiceCard title="Hearing Assessment" desc="Detailed hearing evaluation using modern audiology equipment." />
                    <ServiceCard title="Speech Therapy" desc="Therapy for speech delay, articulation and fluency issues." />
                    <ServiceCard title="Language Therapy" desc="Support for language development in children and adults." />
                    <ServiceCard title="Audiology Consultation" desc="Professional guidance for hearing care and management." />
                </motion.div>
            </section>

            {/* ================= ABOUT SECTION ================= */}
            <section className="bg-slate-100 dark:bg-slate-800/50 py-24">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        className="md:w-1/2"
                    >
                        <Image
                            src="/images/img4.webp"
                            alt="Clinic Interior"
                            width={600}
                            height={400}
                            className="rounded-3xl shadow-xl hover:rotate-2 transition-transform duration-500"
                        />
                    </motion.div>

                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 50 }}
                        className="md:w-1/2 space-y-6"
                    >
                        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            Empowering Lives Through Better Communication
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Admya Speech & Hearing Clinic provides comprehensive speech and hearing
                            therapy services across Ayodhya. We use evidence-based therapy with
                            individual attention and compassionate care.
                        </p>
                        <ul className="space-y-3">
                            {['Modern Equipment', 'Child-Friendly Spaces', 'Affordable Care'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <FaCheckCircle className="text-blue-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} <span className="font-bold text-blue-600">Admya Clinic</span>.
                        Made with care for better health.
                    </p>
                </div>
            </footer>
        </div>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

function ServiceCard({ title, desc }) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300"
        >
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <FaStethoscope className="text-2xl text-blue-600 dark:text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
        </motion.div>
    );
}

function TrustItem({ icon, title, text }) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-50 dark:border-slate-700"
        >
            <div className="text-3xl text-blue-600 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">{icon}</div>
            <div>
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
            </div>
        </motion.div>
    );
}