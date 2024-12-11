'use client'

import { usePathname} from 'next/navigation';
import AuthButtons from "../../components/Auth/AuthButtons";
import { useDispatch } from 'react-redux'
import { changeLoginUrl} from "../../lib/features/auth/authSlice"
const DefaultView = () => {

    const dispatch = useDispatch(); 
    const currentUrl = usePathname();
    dispatch(changeLoginUrl(currentUrl))
    return (
        <AuthButtons />
    );
}

export default DefaultView;
