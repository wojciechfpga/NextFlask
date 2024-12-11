'use client'

import AuthButtons from "../../../components/Auth/AuthButtons";
import AuthClearButton from "../../../components/Auth/AuthClearButton";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
const NoView = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter()
    const currentUrl = usePathname();
    useEffect(() => {
        router.push(currentUrl)
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
