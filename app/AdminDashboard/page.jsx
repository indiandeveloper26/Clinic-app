'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, getDocs } from 'firebase/firestore';
import { FaUser, FaCalendarAlt, FaClock, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contextapi/cliniccontext';

export default function AdminDashboard() {
    const { theme } = useAuth();
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
            console.error('Error fetching appointments:', err);
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

    /* ======================
       THEME COLORS
    ====================== */
    const colors = {
        light: {
            bg: '#f0f4f8',
            card: '#ffffff',
            text: '#1f2937',
            muted: '#4b5563',
            blueLight: '#dbeafe',
            blue: '#2563eb',
            grayHover: '#f9fafb',
        },
        dark: {
            bg: '#1f2937',
            card: '#374151',
            text: '#f9fafb',
            muted: '#d1d5db',
            blueLight: '#1e3a8a',
            blue: '#3b82f6',
            grayHover: '#4b5563',
        },
    };

    const themeColors = theme === 'dark' ? colors.dark : colors.light;

    return (
        <div
            className="min-h-screen p-6"
            style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
        >
            <h1
                className="text-3xl font-bold text-center mb-6"
                style={{ color: themeColors.blue }}
            >
                🏥 Clinic Dashboard
            </h1>

            {loading ? (
                <p className="text-center" style={{ color: themeColors.muted }}>
                    Loading appointments...
                </p>
            ) : (
                <>
                    {Object.keys(groupedByDate).length === 0 && (
                        <p className="text-center" style={{ color: themeColors.muted }}>
                            No appointments booked yet
                        </p>
                    )}

                    {Object.entries(groupedByDate).map(([date, appts]) => (
                        <div
                            key={date}
                            className="mb-8 rounded-lg shadow-md p-4"
                            style={{ backgroundColor: themeColors.card }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3 flex items-center gap-2"
                                style={{ color: themeColors.blue }}
                            >
                                <FaCalendarAlt /> {date} ({appts.length}{' '}
                                {appts.length > 1 ? 'appointments' : 'appointment'})
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full rounded-lg">
                                    <thead
                                        style={{ backgroundColor: themeColors.blueLight, color: themeColors.text }}
                                    >
                                        <tr>
                                            <th className="py-2 px-4 text-left">Patient <FaUser className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">Phone</th>
                                            <th className="py-2 px-4 text-left">Description <FaInfoCircle className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">Time <FaClock className="inline ml-1" /></th>
                                            <th className="py-2 px-4 text-left">Username <FaEnvelope className="inline ml-1" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appts.map((appt) => (
                                            <tr
                                                key={appt.id}
                                                className="border-b transition hover:bg-gray-100"
                                                style={{ borderColor: themeColors.muted, backgroundColor: themeColors.card }}
                                            >
                                                <td className="py-2 px-4 font-semibold" style={{ color: themeColors.text }}>
                                                    {appt.name}
                                                </td>
                                                <td className="py-2 px-4" style={{ color: themeColors.text }}>
                                                    {appt.phone}
                                                </td>
                                                <td className="py-2 px-4" style={{ color: themeColors.text }}>
                                                    {appt.description}
                                                </td>
                                                <td className="py-2 px-4" style={{ color: themeColors.text }}>
                                                    {appt.time}
                                                </td>
                                                <td className="py-2 px-4" style={{ color: themeColors.text }}>
                                                    {appt.username || 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
