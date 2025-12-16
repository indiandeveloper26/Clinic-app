'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, getDocs } from 'firebase/firestore';
import { FaUser, FaCalendarAlt, FaClock, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const appointmentsRef = collection(db, 'appointments');

    /* ======================
       FETCH ALL APPOINTMENTS
    ====================== */
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(appointmentsRef);
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

            // Sort by date & time
            data.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
            setAppointments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Group appointments by date
    const groupedByDate = appointments.reduce((acc, appt) => {
        if (!acc[appt.date]) acc[appt.date] = [];
        acc[appt.date].push(appt);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">🏥 Clinic Dashboard</h1>

            {loading ? (
                <p className="text-center">Loading appointments...</p>
            ) : (
                <>
                    {Object.keys(groupedByDate).length === 0 && (
                        <p className="text-center text-gray-500">No appointments booked yet</p>
                    )}

                    {Object.entries(groupedByDate).map(([date, appts]) => (
                        <div key={date} className="mb-8 bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-600">
                                <FaCalendarAlt /> {date} ({appts.length} {appts.length > 1 ? 'appointments' : 'appointment'})
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white rounded-lg">
                                    <thead className="bg-blue-100 text-blue-800">
                                        <tr>
                                            <th className="py-2 px-4 text-left">Patient <FaUser className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">Phone</th>
                                            <th className="py-2 px-4 text-left">Description <FaInfoCircle className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">Time <FaClock className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">User Email <FaEnvelope className="inline ml-1" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appts.map((appt) => (
                                            <tr key={appt.id} className="border-b hover:bg-gray-50 transition">
                                                <td className="py-2 px-4 font-semibold">{appt.name}</td>
                                                <td className="py-2 px-4">{appt.phone}</td>
                                                <td className="py-2 px-4">{appt.description}</td>
                                                <td className="py-2 px-4">{appt.time}</td>
                                                <td className="py-2 px-4">{appt.uid || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    ))}
                </>
            )}
            <div>
                <Link href={"/"}>go now</Link>
            </div>
        </div>
    );
}
