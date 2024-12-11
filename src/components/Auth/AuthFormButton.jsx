const AuthFormButton = ({ type , onSubmit }) => {

    return (
        <button
            onClick={onSubmit}
            className="w-full px-4 py-2 text-white bg-gray-800 hover:bg-gray-500 transition-colors"
        >
            {type}
        </button>
    )
}

export default AuthFormButton