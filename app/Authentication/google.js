'use client';

import { useAuth } from '../contextapi/cliniccontext';

export default function GoogleLogin() {
    const { user, login, logout, loading } = useAuth();

    if (loading) {
        return (
            <p className="text-center mt-10">Checking login...</p>
        );
    }

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl text-center">
            {user ? (
                <>
                    <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                    <h2 className="font-semibold text-lg">
                        {user.displayName}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {user.email}
                    </p>

                    <button
                        onClick={logout}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">
                        Login Required
                    </h2>

                    <button
                        onClick={login}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                        Login with Google
                    </button>
                </>
            )}
        </div>
    );
}
