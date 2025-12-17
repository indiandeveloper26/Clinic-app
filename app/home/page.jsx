// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { FaStethoscope, FaHeartbeat, FaUserMd, FaClock } from 'react-icons/fa';

// export default function HomePage() {
//     return (
//         <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">

//             {/* ================= Hero Section ================= */}
//             <section className="relative bg-blue-600 text-white">
//                 <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-8">

//                     {/* Text */}
//                     <div className="md:w-1/2 space-y-6">
//                         <h1 className="text-4xl md:text-5xl font-bold">Welcome to 🌿 Therapy Clinic</h1>
//                         <p className="text-lg md:text-xl text-blue-100">
//                             Your health and wellness are our priority. Book your appointment today and take the first step towards a healthier life.
//                         </p>
//                         <Link href="src/crate">
//                             <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
//                                 <FaClock /> Book Appointment
//                             </button>
//                         </Link>
//                     </div>

//                     {/* Image */}
//                     <div className="md:w-1/2">
//                         <Image
//                             src="/images/img.png"
//                             alt="Therapy Clinic"
//                             width={1000}
//                             height={300}
//                             className="rounded-xl shadow-lg object-cover w-full"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* ================= Services Section ================= */}
//             <section className="max-w-7xl mx-auto px-4 py-20">
//                 <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Our Services</h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//                     <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
//                         <FaStethoscope className="text-4xl text-blue-600 mb-4" />
//                         <h3 className="font-semibold text-lg mb-2">General Checkup</h3>
//                         <p className="text-gray-500 text-sm">Comprehensive health assessment for every patient.</p>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
//                         <FaHeartbeat className="text-4xl text-red-500 mb-4" />
//                         <h3 className="font-semibold text-lg mb-2">Heart Therapy</h3>
//                         <p className="text-gray-500 text-sm">Advanced heart wellness and monitoring services.</p>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
//                         <FaUserMd className="text-4xl text-green-600 mb-4" />
//                         <h3 className="font-semibold text-lg mb-2">Physiotherapy</h3>
//                         <p className="text-gray-500 text-sm">Personalized therapy to improve mobility and reduce pain.</p>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
//                         <FaClock className="text-4xl text-yellow-500 mb-4" />
//                         <h3 className="font-semibold text-lg mb-2">Flexible Appointments</h3>
//                         <p className="text-gray-500 text-sm">Book appointments at your convenience online or via phone.</p>
//                     </div>
//                 </div>
//             </section>

//             {/* ================= About Section ================= */}
//             <section className="bg-blue-50 py-20">
//                 <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
//                     <div className="md:w-1/2">
//                         <Image
//                             src="/images/img3.png"
//                             alt="Therapy Clinic"
//                             width={800}
//                             height={500}
//                             className="rounded-xl shadow-lg object-cover w-full"
//                         />
//                     </div>
//                     <div className="md:w-1/2 space-y-6">
//                         <h2 className="text-3xl font-bold text-blue-700">About Our Clinic</h2>
//                         <p className="text-gray-600 text-lg">
//                             Our therapy clinic provides holistic care for body and mind. We combine advanced medical therapies with personalized care to ensure every patient receives the best treatment.
//                         </p>
//                         <Link href="src/crate">
//                             <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
//                                 Schedule Your Visit
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* ================= Footer ================= */}
//             <footer className="bg-blue-600 text-white py-6 mt-12 text-center">
//                 <p>© {new Date().getFullYear()} Therapy Clinic. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaStethoscope,
    FaUserMd,
    FaCheckCircle,
    FaSmile,
} from "react-icons/fa";

export default function HomePage() {
    return (
        // 🔒 FORCE LIGHT MODE (NO SYSTEM EFFECT)
        <div
            className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen"
            style={{ colorScheme: "light" }}
        >

            {/* ================= HERO ================= */}
            <section className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-10">

                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Admya Speech & Hearing Clinic
                        </h1>

                        <p className="text-blue-100 text-lg">
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
                                <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
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
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
                    Our Services
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <ServiceCard
                        title="Hearing Assessment"
                        desc="Detailed hearing evaluation using modern audiology equipment."
                    />
                    <ServiceCard
                        title="Speech Therapy"
                        desc="Therapy for speech delay, articulation and fluency issues."
                    />
                    <ServiceCard
                        title="Language Therapy"
                        desc="Support for language development in children and adults."
                    />
                    <ServiceCard
                        title="Audiology Consultation"
                        desc="Professional guidance for hearing care and management."
                    />
                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section className="bg-blue-50 py-20">
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
                        <h2 className="text-3xl font-bold text-blue-700">
                            About Admya Clinic
                        </h2>

                        <p className="text-gray-600">
                            Admya Speech & Hearing Clinic, located above R S Dental Art on
                            Ayodhya Dham Road, provides comprehensive speech and hearing
                            therapy services to patients across Ayodhya.
                        </p>

                        <p className="text-gray-600">
                            Our clinic follows evidence-based therapy approaches with
                            individual attention, ensuring every patient receives
                            effective and compassionate care.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= WHY CHOOSE US ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
                    Why Choose Admya Clinic
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <WhyItem text="Qualified and experienced speech & hearing professionals" />
                    <WhyItem text="Modern diagnostic and therapy equipment" />
                    <WhyItem text="Child-friendly and comfortable clinic environment" />
                    <WhyItem text="Transparent consultation and therapy process" />
                </div>
            </section>

            {/* ================= CONTACT + MAP ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
                    Contact & Location
                </h2>

                <div className="grid md:grid-cols-2 gap-10">

                    <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-red-500" />
                            Located in: R S Dental Art
                        </p>

                        <p className="text-gray-600">
                            Ayodhya dham road, above R S Dental clinic, Durgapuri Colony,
                            Naka Bypass, Ayodhya, Faizabad, Uttar Pradesh 224001
                        </p>

                        <p className="flex items-center gap-3">
                            <FaPhoneAlt className="text-blue-600" />
                            078508 20955
                        </p>

                        <p className="flex items-center gap-3">
                            <FaClock className="text-green-600" />
                            Open · Closes 6:30 PM
                        </p>

                        <p className="text-gray-500">Areas Served: Ayodhya</p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps?q=Ayodhya%20dham%20road%20R%20S%20Dental%20Art&output=embed"
                            width="100%"
                            height="100%"
                            className="min-h-[350px] border-0"
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="bg-blue-600 text-white text-center py-6">
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
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <FaStethoscope className="text-3xl text-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
        </div>
    );
}

function TrustItem({ icon, text }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="text-3xl text-blue-600 mb-3">{icon}</div>
            <p className="font-medium text-gray-700">{text}</p>
        </div>
    );
}

function WhyItem({ text }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-3">
            <FaCheckCircle className="text-green-500" />
            <p className="text-gray-700">{text}</p>
        </div>
    );
}
