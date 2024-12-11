import Link from "next/link";

const AuthButtons = () => {
    return (
        <div className="flex space-x-4">
            <Link href="/login">
                <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
                    Login
                </button>
            </Link>
            <Link href="/register">
                <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
                    Register
                </button>
            </Link>
        </div>
    );
}

export default AuthButtons;
