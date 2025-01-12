import { useContext } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { Link } from "react-router-dom";

function DeleteUserAccountPage () {

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const {firstName , lastName, instaId} = loggedInUserDetails;

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">

            <Link to={'/settings'}>
                <div className="absolute top-10 right-10 md:right-20">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Go Back
                    </button>
                </div>
            </Link>
            

            <div>
                <div className="text-lg text-center md:text-2xl font-bold mb-5">
                    <h1>Delete Your Account ? {firstName} {lastName} ({instaId})</h1>
                </div>
                <div className="text-sm text-center md:text-lg font-bold text-red-700">
                    <p>Are you sure you want to delete your account? This action is permanent
                    and your data will be lost forever...
                    </p>
                </div>
            </div>


            <Link to={'/auth/delete'}>
                <div className="mt-5">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                        Delete My Account
                    </button>
                </div>
            </Link>
            

        </div>
    )
}

export default DeleteUserAccountPage;