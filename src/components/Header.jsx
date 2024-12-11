import HeaderMainLink from "./HeaderSubComponets/HeaderMainLink"
import HeaderRoomsLink from "./HeaderSubComponets/HeaderRoomsLink"

const HeaderLayout = ({ children }) => {
    return (
        <header className="bg-gray-900 text-white py-4 px-8 shadow-md border-b border-gray-700">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                <HeaderMainLink/>
                <HeaderRoomsLink/>
                </div>
                <div>{children}</div>
            </div>
        </header>
    );
}

export default HeaderLayout;
