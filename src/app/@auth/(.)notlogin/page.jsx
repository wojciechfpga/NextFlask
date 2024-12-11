'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../lib/features/auth/authSlice";
import AuthButtons from "../../../components/AuthButtons";

const NoView = () => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logout());

    useEffect(() => {
        router.push("/");
    }, [router]);

    return (
        <div>
            <nav>
                {user ? (
                    <div className="relative z-50">
                        <button
                            onClick={handleLogout}
                            className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 m-4"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <AuthButtons />
                )}
            </nav>
        </div>
    );
}

export default NoView;
