'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaStethoscope, FaHeartbeat, FaUserMd, FaClock } from 'react-icons/fa';

export default function HomePage() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">

            {/* ================= Hero Section ================= */}
            <section className="relative bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-8">

                    {/* Text */}
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold">Welcome to 🌿 Therapy Clinic</h1>
                        <p className="text-lg md:text-xl text-blue-100">
                            Your health and wellness are our priority. Book your appointment today and take the first step towards a healthier life.
                        </p>
                        <Link href="src/crate">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                                <FaClock /> Book Appointment
                            </button>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2">
                        <Image
                            src="/images/img.png"
                            alt="Therapy Clinic"
                            width={1000}
                            height={300}
                            className="rounded-xl shadow-lg object-cover w-full"
                        />
                    </div>
                </div>
            </section>

            {/* ================= Services Section ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Our Services</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                        <FaStethoscope className="text-4xl text-blue-600 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">General Checkup</h3>
                        <p className="text-gray-500 text-sm">Comprehensive health assessment for every patient.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                        <FaHeartbeat className="text-4xl text-red-500 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Heart Therapy</h3>
                        <p className="text-gray-500 text-sm">Advanced heart wellness and monitoring services.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                        <FaUserMd className="text-4xl text-green-600 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Physiotherapy</h3>
                        <p className="text-gray-500 text-sm">Personalized therapy to improve mobility and reduce pain.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                        <FaClock className="text-4xl text-yellow-500 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Flexible Appointments</h3>
                        <p className="text-gray-500 text-sm">Book appointments at your convenience online or via phone.</p>
                    </div>
                </div>
            </section>

            {/* ================= About Section ================= */}
            <section className="bg-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <Image
                            src="/images/img3.png"
                            alt="Therapy Clinic"
                            width={800}
                            height={500}
                            className="rounded-xl shadow-lg object-cover w-full"
                        />
                    </div>
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-blue-700">About Our Clinic</h2>
                        <p className="text-gray-600 text-lg">
                            Our therapy clinic provides holistic care for body and mind. We combine advanced medical therapies with personalized care to ensure every patient receives the best treatment.
                        </p>
                        <Link href="src/crate">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                                Schedule Your Visit
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= Footer ================= */}
            <footer className="bg-blue-600 text-white py-6 mt-12 text-center">
                <p>© {new Date().getFullYear()} Therapy Clinic. All rights reserved.</p>
            </footer>
        </div>
    );
}
