
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider, db } from '../firebas/firebasatuh';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Save user to Firestore
    const saveUser = async (user) => {
        await setDoc(
            doc(db, 'users', user.uid),
            {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                lastLogin: new Date(),
            },
            { merge: true }
        );
    };

    // 🔹 Google Login
    const login = async () => {
        const result = await signInWithPopup(auth, provider);
        const loggedUser = result.user;

        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        await saveUser(loggedUser);
    };

    // 🔹 Logout
    const logout = async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem('user');
    };

    // 🔹 Auto login (refresh ke baad bhi)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                localStorage.setItem('user', JSON.stringify(firebaseUser));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 🔹 Custom hook
export const useAuth = () => useContext(AuthContext);
