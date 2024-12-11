import Link from "next/link";
const HeaderRoomsLink = () => {

    return (
        <Link href="/rooms">
            <h2 className=" text-white py-2 px-4 border-none">
                Our rooms
            </h2>
        </Link>
    )
}

export default HeaderRoomsLink