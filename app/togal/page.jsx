'use client';

import { useAuth } from "../contextapi/cliniccontext";



export default function ThemeToggleScreen() {
    const { theme, toggleTheme } = useAuth();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Appearance</h1>

            <div style={styles.card}>
                <span style={styles.label}>
                    {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </span>

                <button onClick={toggleTheme} style={styles.button}>
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
            </div>
        </div>
    );
}



const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        color: 'var(--text)',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
    },
    label: {
        fontSize: 18,
    },
    button: {
        padding: '10px 18px',
        borderRadius: 20,
        border: 'none',
        cursor: 'pointer',
        background: '#1db954',
        color: '#fff',
        fontSize: 14,
    },
};
