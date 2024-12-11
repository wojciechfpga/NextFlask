'use client'

import AuthButtons from "../../../components/AuthButtons";
import ClearAuthButton from "../../../components/ClearAuthButton";
import { useSelector } from "react-redux";

const NoView = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            <nav>
                {user ? (
                    <ClearAuthButton />
                ) : (
                    <AuthButtons />
                )}
            </nav>
        </div>
    );
}

export default NoView;
