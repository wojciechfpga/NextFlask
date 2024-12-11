'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../lib/features/auth/authSlice";

const ClearAuthButton = () => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logout());

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    return (
        user ? (
            <div className="relative z-50">
                <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 m-4"
                >
                    Logout
                </button>
            </div>
        ) : null
    );
}

export default ClearAuthButton;
