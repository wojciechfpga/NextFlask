import Link from "next/link";
const HeaderLayout = ({ children }) => {
    return (
        <header className="bg-gray-900 text-white py-4 px-8 shadow-md border-b border-gray-700">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold uppercase tracking-wide">Solid Application</h1>
                <div>
                    <Link href="/rooms">
                        <button className="bg-gray-800 text-white py-2 px-16 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
                            Our rooms
                        </button>
                    </Link>
                </div>
                <div>{children}</div>
            </div>
        </header>
    );
}
export default HeaderLayout