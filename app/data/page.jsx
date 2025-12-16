'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebas/firebasatuh'; // firebase.js ka path adjust karo
import { doc, getDoc } from 'firebase/firestore';
import GoogleLogin from '../Authentication/google';

export default function page() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6 border rounded-md w-96 mx-auto mt-10 shadow text-center">
            <GoogleLogin /> {/* Login/Logout button */}
            {userData ? (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">User Profile</h2>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>UID:</strong> {userData.uid}</p>
                    <p><strong>Last Login:</strong> {userData.lastLogin.toDate ? userData.lastLogin.toDate().toString() : userData.lastLogin}</p>
                </div>
            ) : (
                <p className="mt-4 text-gray-600">Please login to see your profile.</p>
            )}
        </div>
    );
}
