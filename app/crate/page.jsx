'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contextapi/cliniccontext';
import { toast } from 'react-toastify';

const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

const isPastSlot = (date, time) => {
    if (!date || !time) return false;
    const now = new Date();
    const slot = new Date(`${date}T${time}`);
    return slot < now;
};

const getBlockedSlots = (bookedSlots) => {
    const blocked = new Set();
    bookedSlots.forEach(({ time }) => blocked.add(time));
    return Array.from(blocked);
};

const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);
const isValidPhone = (phone) => /^\d{10,15}$/.test(phone);
const isValidDescription = (desc) => desc.trim().length >= 3;

export default function AppointmentPage() {
    const { user, theme } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const appointmentsRef = collection(db, 'appointments');

    const fetchBookedSlots = async (date) => {
        if (!date) return;
        const q = query(appointmentsRef, where('date', '==', date));
        const snapshot = await getDocs(q);
        setBookedSlots(snapshot.docs.map((d) => ({ time: d.data().time })));
    };

    useEffect(() => {
        if (selectedDate) {
            fetchBookedSlots(selectedDate);
            setSelectedTime('');
        }
    }, [selectedDate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!user) {
            setMessage('❌ Please login first to book an appointment');
            return;
        }

        if (!selectedDate || !selectedTime) {
            setMessage('❌ Please select both date and time');
            return;
        }

        if (isPastSlot(selectedDate, selectedTime)) {
            setMessage('❌ Cannot book a past slot');
            return;
        }

        if (!isValidName(form.name)) {
            setMessage('❌ Please enter a valid name (letters only)');
            return;
        }

        if (!isValidPhone(form.phone)) {
            setMessage('❌ Phone number should be 10-15 digits');
            return;
        }

        if (!isValidDescription(form.description)) {
            setMessage('❌ Description must be at least 3 characters');
            return;
        }

        try {
            setLoading(true);
            await addDoc(appointmentsRef, {
                uid: user.uid,
                username: user?.displayName || 'Unknown',
                name: form.name,
                phone: form.phone,
                description: form.description,
                date: selectedDate,
                time: selectedTime,
                duration: 60,
                createdAt: new Date(),
            });

            toast.success("✅ Appointment booked successfully")
            setMessage('✅ Appointment booked successfully! We look forward to seeing you.');
            setForm({ name: '', phone: '', description: '' });
            setSelectedTime('');
            fetchBookedSlots(selectedDate);
        } catch (err) {
            console.error(err);
            setMessage('❌ Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const colors = {
        light: {
            bg: '#f0f4f8',
            card: '#ffffff',
            text: '#1f2937',
            muted: '#4b5563',
            blue: '#2563eb',
            green: '#10b981',
            red: '#ef4444',
            slotAvailable: '#d1fae5',
            slotSelected: '#10b981',
            slotBlocked: '#fee2e2',
            slotPast: '#e5e7eb',
        },
        dark: {
            bg: '#1f2937',
            card: '#374151',
            text: '#f9fafb',
            muted: '#d1d5db',
            blue: '#3b82f6',
            green: '#34d399',
            red: '#f87171',
            slotAvailable: '#065f46',
            slotSelected: '#10b981',
            slotBlocked: '#b91c1c',
            slotPast: '#4b5563',
        },
    };

    const themeColors = theme === 'dark' ? colors.dark : colors.light;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
        >
            <h1
                className="text-4xl font-bold mb-4 text-center"
                style={{ color: themeColors.blue }}
            >
                🩺 Welcome to Our Clinic!
            </h1>
            <p className="text-center mb-6" style={{ color: themeColors.muted }}>
                Book a convenient 1-hour slot with our specialists. Fill in your details and we’ll take care of the rest!
            </p>

            <div
                className="w-full max-w-2xl rounded-3xl shadow-xl p-8 space-y-6"
                style={{ backgroundColor: themeColors.card }}
            >
                {/* Date Selection */}
                <div className="mb-4">
                    <label className="font-semibold block mb-2">Choose Your Date</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                        style={{
                            backgroundColor: themeColors.bg,
                            color: themeColors.text,
                            borderColor: themeColors.muted,
                        }}
                    />
                    <small style={{ color: themeColors.muted }}>Pick a date for your appointment</small>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                    <>
                        <h2 className="font-semibold mb-2">Available Time Slots</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {TIME_SLOTS.map((time) => {
                                const blocked = getBlockedSlots(bookedSlots).includes(time);
                                const past = isPastSlot(selectedDate, time);
                                const selected = selectedTime === time;

                                let bgColor = themeColors.slotAvailable;
                                let textColor = themeColors.text;

                                if (blocked) {
                                    bgColor = themeColors.slotBlocked;
                                    textColor = themeColors.red;
                                } else if (past) {
                                    bgColor = themeColors.slotPast;
                                    textColor = themeColors.muted;
                                } else if (selected) {
                                    bgColor = themeColors.slotSelected;
                                    textColor = '#ffffff';
                                }

                                return (
                                    <button
                                        key={time}
                                        disabled={blocked || past}
                                        onClick={() => setSelectedTime(time)}
                                        className="py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                                        style={{ backgroundColor: bgColor, color: textColor }}
                                    >
                                        {time} {blocked && '❌'} {past && '⏱'}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Booking Form */}
                {selectedTime && (
                    <form
                        onSubmit={handleBooking}
                        className="mt-6 space-y-4"
                    >
                        <input
                            placeholder="Your Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                            style={{
                                backgroundColor: themeColors.bg,
                                color: themeColors.text,
                                borderColor: themeColors.muted,
                            }}
                        />

                        <input
                            placeholder="Phone Number"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                            style={{
                                backgroundColor: themeColors.bg,
                                color: themeColors.text,
                                borderColor: themeColors.muted,
                            }}
                        />

                        <textarea
                            placeholder="Reason for Appointment"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            required
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                            style={{
                                backgroundColor: themeColors.bg,
                                color: themeColors.text,
                                borderColor: themeColors.muted,
                            }}
                        />

                        <button
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-semibold transition-transform hover:scale-105"
                            style={{ backgroundColor: themeColors.blue, color: '#ffffff' }}
                        >
                            {loading ? 'Booking...' : 'Confirm Appointment'}
                        </button>
                    </form>
                )}

                {message && (
                    <p className="text-center mt-4 font-medium" style={{ color: themeColors.text }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
