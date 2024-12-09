import Link from "next/link";

export default function NoView() {
    return (
        <div>
                <Link href="/login">
                    <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 m-4">
                        Login
                    </button>
                </Link>
        </div>
    );
}