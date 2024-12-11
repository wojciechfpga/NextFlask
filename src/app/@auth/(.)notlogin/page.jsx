'use client'

import AuthButtons from "../../../components/Auth/AuthButtons";
import AuthClearButton from "../../../components/Auth/AuthClearButton";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
const NoView = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter()
    useEffect(() => {
        router.push("/")
    }, [router])
    return (
        <div>
            <nav>
                {user ? (
                    <AuthClearButton />
                ) : (
                    <AuthButtons />
                )}
            </nav>
        </div>
    );
}

export default NoView;
