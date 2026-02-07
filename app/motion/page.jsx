"use client";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center gap-16 p-6 overflow-hidden">

            {/* 1️⃣ Draggable DIV */}
            <motion.div
                drag
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // screen boundaries
                dragElastic={0.3} // smooth drag feel
                whileDrag={{ scale: 1.05 }} // slight scale when dragging
                whileTap={{ scale: 0.95 }} // press effect
                className="w-64 h-40 bg-blue-600 rounded-xl shadow-2xl flex items-center justify-center cursor-pointer fixed"
                style={{ top: "20%", left: "50%", transform: "translateX(-50%)" }} // initial top-center
            >
                <p className="text-white font-bold text-lg text-center">
                    Drag Me Anywhere!
                </p>
            </motion.div>

            <div className="flex flex-col items-center gap-12">

                {/* 2️⃣ Normal Button */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">
                        Normal Button
                    </p>
                    <button className="px-8 py-4 bg-gray-600 text-white rounded-lg text-lg">
                        Click Me
                    </button>
                </div>

                {/* 3️⃣ Scale + Glow Button */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-blue-400 text-sm uppercase tracking-wider">
                        Scale + Glow
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.2, boxShadow: "0px 0px 25px rgba(59,130,246,0.8)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="px-10 py-5 bg-blue-600 text-white text-lg font-semibold rounded-2xl"
                    >
                        Hover Me
                    </motion.button>
                </div>

                {/* 4️⃣ Bounce Button */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-green-400 text-sm uppercase tracking-wider">
                        Bounce Button
                    </p>
                    <motion.button
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-green-500 text-white text-lg font-semibold rounded-full"
                    >
                        Bounce
                    </motion.button>
                </div>

                {/* 5️⃣ Color Shift + Rotate Button */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-pink-400 text-sm uppercase tracking-wider">
                        Color + Rotate
                    </p>
                    <motion.button
                        whileHover={{
                            rotate: [0, 5, -5, 0],
                            backgroundColor: ["#f472b6", "#f87171", "#f472b6"],
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="px-10 py-5 text-white text-lg font-bold rounded-lg bg-pink-500"
                    >
                        Try Me
                    </motion.button>
                </div>

            </div>
        </div>
    );
}
