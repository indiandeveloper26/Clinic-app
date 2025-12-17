'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contextapi/cliniccontext';

/* ======================
   TIME SLOTS (1 hour)
====================== */
const TIME_SLOTS = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
];

/* ======================
   HELPERS
====================== */
const isPastSlot = (date, time) => {
    if (!date || !time) return false;
    const now = new Date();
    const slot = new Date(`${date}T${time}`);
    return slot < now;
};

const getBlockedSlots = (bookedSlots) => {
    const blocked = new Set();
    bookedSlots.forEach(({ time }) => {
        blocked.add(time);
    });
    return Array.from(blocked);
};

export default function Page() {
    const { user } = useAuth();

    console.log('userdata', user?.displayName

    )

    const [selectedDate, setSelectedDate] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const appointmentsRef = collection(db, 'appointments');

    /* ======================
       FETCH BOOKED SLOTS
    ====================== */
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

    /* ======================
       BOOK APPOINTMENT
    ====================== */
    const handleBooking = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!user) {
            setMessage('❌ Please login first');
            return;
        }

        if (!selectedDate || !selectedTime) {
            setMessage('❌ Select date & time');
            return;
        }

        if (isPastSlot(selectedDate, selectedTime)) {
            setMessage('❌ Past date/time not allowed');
            return;
        }

        try {
            setLoading(true);

            await addDoc(appointmentsRef, {
                uid: user.uid,
                username: user?.displayName,
                name: form.name,
                phone: form.phone,
                description: form.description,
                date: selectedDate,
                time: selectedTime,
                duration: 60,
                createdAt: new Date(),
            });

            setMessage('✅ Appointment booked successfully');
            setForm({ name: '', phone: '', description: '' });
            setSelectedTime('');
            fetchBookedSlots(selectedDate);
        } catch (err) {
            console.error(err);
            setMessage('❌ Booking failed');
        } finally {
            setLoading(false);
        }
    };

    /* ======================
       UI
    ====================== */
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">
                <h1 className="text-3xl font-bold text-center text-blue-700">
                    🏥 Clinic Appointment
                </h1>
                <p className="text-center text-gray-500 mt-1 mb-6">
                    Select 1-hour time slot and describe your appointment
                </p>

                {/* Date Picker */}
                <div className="mb-6">
                    <label className="font-semibold block mb-1">Select Date</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                    />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                    <>
                        <h2 className="font-semibold mb-2">Time Slots</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {TIME_SLOTS.map((time) => {
                                const blocked = getBlockedSlots(bookedSlots).includes(time);
                                const past = isPastSlot(selectedDate, time);

                                return (
                                    <button
                                        key={time}
                                        disabled={blocked || past}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-2 rounded-lg text-sm font-medium
                      ${blocked
                                                ? 'bg-red-100 text-red-600'
                                                : past
                                                    ? 'bg-gray-200 text-gray-500'
                                                    : selectedTime === time
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-green-100 hover:bg-green-200'
                                            }`}
                                    >
                                        {time}
                                        {blocked && ' ❌'}
                                        {past && ' ⏱'}
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
                        className="mt-8 bg-gray-50 p-4 rounded-xl space-y-3"
                    >
                        <input
                            placeholder="Patient Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                            className="w-full border p-2 rounded"
                        />

                        <input
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                            className="w-full border p-2 rounded"
                        />

                        <input
                            placeholder="Appointment Description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            required
                            className="w-full border p-2 rounded"
                        />

                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg"
                        >
                            {loading ? 'Booking...' : `Confirm 1-Hour Slot`}
                        </button>
                    </form>
                )}

                {message && (
                    <p className="text-center mt-4 font-semibold">{message}</p>
                )}
            </div>
        </div>
    );
}
