const HeaderLayout=({ children }) => {
    return (
        <header className="bg-gray-900 text-white py-4 px-8 shadow-md border-b border-gray-700">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold uppercase tracking-wide">Solid Application</h1>
                <div>{children}</div>
            </div>
        </header>
    );
}
export default HeaderLayout