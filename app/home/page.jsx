'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaPhoneAlt,
    FaStethoscope,
    FaUserMd,
    FaCheckCircle,
    FaSmile
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

    return (
        <div className="min-h-screen bg-gradient-to-br 
            from-blue-50 to-green-50 
            dark:from-gray-900 dark:to-gray-800
            text-gray-800 dark:text-gray-100">

            {/* ================= THEME TOGGLE BUTTON ================= */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:scale-105 transition"
                >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            {/* ================= HERO ================= */}
            <section className="bg-blue-600 dark:bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-10">

                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Admya Speech & Hearing Clinic
                        </h1>

                        <p className="text-blue-100 dark:text-gray-300 text-lg">
                            Specialized care for speech, hearing and communication disorders
                            in Ayodhya. Trusted therapy services for children and adults.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <a href="tel:07850820955">
                                <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                                    <FaPhoneAlt /> Call Now
                                </button>
                            </a>

                            <Link href="/crate">
                                <button className="border border-white px-6 py-3 rounded-lg font-semibold 
                                    hover:bg-white hover:text-blue-600
                                    dark:hover:bg-gray-800 dark:hover:text-white">
                                    Book Appointment
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <Image
                            src="/images/img3.png"
                            alt="Admya Speech and Hearing Clinic"
                            width={900}
                            height={600}
                            className="rounded-xl shadow-lg"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* ================= TRUST BADGES ================= */}
            <section className="max-w-7xl mx-auto px-4 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <TrustItem icon={<FaUserMd />} text="Qualified Speech & Hearing Specialists" />
                    <TrustItem icon={<FaCheckCircle />} text="Personalized Therapy Plans" />
                    <TrustItem icon={<FaSmile />} text="Patient-Friendly & Caring Environment" />
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-12">
                    Our Services
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <ServiceCard title="Hearing Assessment" desc="Detailed hearing evaluation using modern audiology equipment." />
                    <ServiceCard title="Speech Therapy" desc="Therapy for speech delay, articulation and fluency issues." />
                    <ServiceCard title="Language Therapy" desc="Support for language development in children and adults." />
                    <ServiceCard title="Audiology Consultation" desc="Professional guidance for hearing care and management." />
                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section className="bg-blue-50 dark:bg-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">

                    <div className="md:w-1/2">
                        <Image
                            src="/images/img4.webp"
                            alt="Clinic Interior"
                            width={800}
                            height={500}
                            className="rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="md:w-1/2 space-y-5">
                        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                            About Admya Clinic
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300">
                            Admya Speech & Hearing Clinic provides comprehensive speech and hearing
                            therapy services across Ayodhya.
                        </p>

                        <p className="text-gray-600 dark:text-gray-300">
                            Evidence-based therapy with individual attention and compassionate care.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="bg-blue-600 dark:bg-gray-900 text-white text-center py-6">
                <p>
                    © {new Date().getFullYear()} Admya Speech & Hearing Clinic.
                    All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}

/* ================= COMPONENTS ================= */
function ServiceCard({ title, desc }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <FaStethoscope className="text-3xl text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
        </div>
    );
}

function TrustItem({ icon, text }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="text-3xl text-blue-600 dark:text-blue-400 mb-3">{icon}</div>
            <p className="font-medium text-gray-700 dark:text-gray-300">{text}</p>
        </div>
    );
}
