'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebas/firebasatuh';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contextapi/cliniccontext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Calendar as CalIcon,
    Clock,
    Phone,
    MessageSquare,
    UserCheck,
    Search,
    RefreshCcw,
    ChevronDown
} from 'lucide-react';

export default function AdminDashboard() {
    const { theme } = useAuth();
    const isDark = theme === 'dark';
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'appointments'));
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            data.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
            setAppointments(data);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    const filteredAppts = appointments.filter(appt =>
        appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.phone.includes(searchTerm)
    );

    const groupedByDate = filteredAppts.reduce((acc, appt) => {
        if (!acc[appt.date]) acc[appt.date] = [];
        acc[appt.date].push(appt);
        return acc;
    }, {});

    return (
        <div className={`min-h-screen pt-24 pb-12 px-4 md:px-8 transition-colors duration-500 ${isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl font-black italic tracking-tight flex items-center gap-3">
                            <span className="bg-blue-600 text-white p-2 rounded-2xl"><Users size={32} /></span>
                            PATIENT <span className="text-blue-600">LOGS</span>
                        </h1>
                        <p className="text-sm opacity-50 font-bold uppercase tracking-[0.2em] mt-2">Central Clinic Administration</p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search Patient..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`pl-12 pr-6 py-3 rounded-2xl border outline-none w-full md:w-64 font-bold text-sm transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500 shadow-sm'
                                    }`}
                            />
                        </div>
                        <button
                            onClick={fetchAppointments}
                            className={`p-3 rounded-2xl border transition-all hover:rotate-180 ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                        >
                            <RefreshCcw size={20} className={loading ? 'animate-spin text-blue-500' : ''} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 opacity-50">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-black uppercase tracking-widest text-xs">Syncing Database...</p>
                    </div>
                ) : Object.keys(groupedByDate).length === 0 ? (
                    <div className="text-center py-20 opacity-30">
                        <Users size={64} className="mx-auto mb-4" />
                        <p className="font-black uppercase tracking-widest">No Records Found</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {Object.entries(groupedByDate).map(([date, appts], idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={date}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                                    <div className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? 'bg-slate-800/80 border-slate-700 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
                                        }`}>
                                        <CalIcon size={14} /> {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {appts.map((appt) => (
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            key={appt.id}
                                            className={`group p-6 rounded-[2rem] border transition-all ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        {appt.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-lg uppercase tracking-tight">{appt.name}</h3>
                                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-1">
                                                            <UserCheck size={10} /> Ref: {appt.username || 'Guest'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-2 rounded-xl font-black text-xs ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                                    <span className="text-blue-500 tracking-tighter">{appt.time}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-6">
                                                <div className={`p-3 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                                    <Phone size={14} className="text-blue-500" />
                                                    <span className="text-xs font-bold">{appt.phone}</span>
                                                </div>
                                                <div className={`p-3 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                                    <Clock size={14} className="text-blue-500" />
                                                    <span className="text-xs font-bold">1 Hour Slot</span>
                                                </div>
                                            </div>

                                            <div className={`mt-4 p-4 rounded-2xl border border-dashed transition-colors ${isDark ? 'bg-slate-900/50 border-slate-700 group-hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 group-hover:border-blue-200'
                                                }`}>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2">
                                                    <MessageSquare size={12} /> Diagnosis / Note
                                                </p>
                                                <p className="text-sm opacity-70 leading-relaxed italic">"{appt.description}"</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}