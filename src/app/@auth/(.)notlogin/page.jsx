'use client'
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "../../../lib/features/auth/authSlice";
export default function NoView() {
    const router = useRouter()
    const { user, token, error } = useSelector((state) => state.auth);
    const dispatch=useDispatch()
    const handleLogout = () => dispatch(logout());
    useEffect(() => {
        router.push("/")
    }, [router])

    return (<div><nav>
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
            <div>
                <Link href="/login">
                    <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 m-4">
                        Login
                    </button>
                </Link>
            </div>
        )}

    </nav></div>)
}