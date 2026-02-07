'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contextapi/cliniccontext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    User,
    Phone,
    FileText,
    CheckCircle2,
    AlertCircle,
    ChevronRight
} from 'lucide-react';

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

export default function AppointmentPage() {
    const { user, theme } = useAuth();
    const isDark = theme === 'dark';

    const [selectedDate, setSelectedDate] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', description: '' });
    const [loading, setLoading] = useState(false);

    const appointmentsRef = collection(db, 'appointments');

    const fetchBookedSlots = async (date) => {
        if (!date) return;
        const q = query(appointmentsRef, where('date', '==', date));
        const snapshot = await getDocs(q);
        setBookedSlots(snapshot.docs.map((d) => d.data().time));
    };

    useEffect(() => {
        if (selectedDate) {
            fetchBookedSlots(selectedDate);
            setSelectedTime('');
        }
    }, [selectedDate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Please login first');
        if (!selectedDate || !selectedTime) return toast.error('Select date and time');
        if (isPastSlot(selectedDate, selectedTime)) return toast.error('Cannot book past slots');

        try {
            setLoading(true);
            await addDoc(appointmentsRef, {
                uid: user.uid,
                username: user?.displayName || 'Unknown',
                ...form,
                date: selectedDate,
                time: selectedTime,
                createdAt: new Date(),
            });
            toast.success("Appointment booked successfully!");
            setForm({ name: '', phone: '', description: '' });
            setSelectedTime('');
            fetchBookedSlots(selectedDate);
        } catch (err) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen pt-28 pb-12 px-4 transition-colors duration-500 ${isDark ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
                        Book Your <span className="text-blue-600">Session.</span>
                    </h1>
                    <p className={`text-sm uppercase tracking-[0.2em] font-bold ${isDark ? 'opacity-40' : 'text-slate-500'}`}>
                        Professional Speech & Hearing Care
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8">

                    {/* Left Side: Calendar & Slots */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:col-span-3 p-6 rounded-[2.5rem] border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white shadow-xl border-slate-100'}`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar className="text-blue-600" size={20} />
                            <h3 className="text-xs font-black uppercase tracking-widest">1. Select Schedule</h3>
                        </div>

                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={`w-full p-4 rounded-2xl border mb-8 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                                }`}
                        />

                        {selectedDate && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="text-blue-600" size={18} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest">Available Slots</h4>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {TIME_SLOTS.map((time) => {
                                        const isBooked = bookedSlots.includes(time);
                                        const isPast = isPastSlot(selectedDate, time);
                                        const isSelected = selectedTime === time;

                                        return (
                                            <button
                                                key={time}
                                                disabled={isBooked || isPast}
                                                onClick={() => setSelectedTime(time)}
                                                className={`relative py-3 rounded-xl text-xs font-black transition-all overflow-hidden
                                                    ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-95' :
                                                        isBooked ? 'bg-red-50 text-red-300 cursor-not-allowed opacity-50' :
                                                            isPast ? 'bg-slate-100 text-slate-300 opacity-30' :
                                                                isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                                                `}
                                            >
                                                {time}
                                                {isBooked && <div className="absolute top-1 right-1"><AlertCircle size={8} /></div>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <AnimatePresence mode="wait">
                            {selectedTime ? (
                                <motion.form
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleBooking}
                                    className={`p-6 rounded-[2.5rem] border h-full flex flex-col ${isDark ? 'bg-slate-900 border-blue-500/30' : 'bg-white shadow-2xl border-blue-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="text-blue-600" size={20} />
                                        <h3 className="text-xs font-black uppercase tracking-widest">2. Patient Info</h3>
                                    </div>

                                    <div className="space-y-4 flex-grow">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                                            <input
                                                placeholder="Full Name"
                                                required
                                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none text-sm font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                                            <input
                                                placeholder="Phone Number"
                                                type="tel"
                                                required
                                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none text-sm font-bold ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-4 opacity-30" size={16} />
                                            <textarea
                                                placeholder="Brief Description"
                                                rows={4}
                                                required
                                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none text-sm font-bold resize-none ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                                                value={form.description}
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-6 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                                    >
                                        {loading ? "Processing..." : (
                                            <>Confirm Booking <ChevronRight size={14} /></>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <div className={`h-full flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] border border-dashed ${isDark ? 'border-slate-800 opacity-40' : 'border-slate-200 opacity-60'}`}>
                                    <Clock size={40} className="mb-4 text-blue-600" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Please select a date & time slot to continue</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Status Guide */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-40">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-blue-600" /> Available
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-red-400" /> Booked
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-slate-300" /> Past
                    </div>
                </div>

            </div>
        </div>
    );
}