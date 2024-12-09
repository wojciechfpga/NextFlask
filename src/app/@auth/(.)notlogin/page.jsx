'use client'
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from 'next/navigation';
export default function NoView() {
    const router =useRouter()
    
    useEffect(()=>{
        router.push("/")
    },[router])

    return (<div><nav>
        <Link href="/login"><button className="bg-red-800 text-white py-2 px-4 rounded-lg m-8">Register by open P.Routes @auth and intercept register route</button></Link>
    </nav></div>)
}