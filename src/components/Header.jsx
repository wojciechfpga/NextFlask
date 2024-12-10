import Link from "next/link";

const HeaderLayout = ({ children }) => {
    return (
        <header className="bg-gray-900 text-white py-4 px-8 shadow-md border-b border-gray-700">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <h1 className="text-xl font-bold tracking-wide mr-8">Rooms Reservation</h1>
                    </Link>
                    <Link href="/rooms">
                        <h2 className=" text-white py-2 px-4 border-none">
                            Our rooms
                        </h2>
                    </Link>
                </div>
                <div>{children}</div>
            </div>
        </header>
    );
}

export default HeaderLayout;
