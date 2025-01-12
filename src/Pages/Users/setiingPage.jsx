import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function SettingsPage() {
    return(
        <div className="w-[100%] h-[100%] px-10 py-6">
            <div className="w-[20%] flex items-center gap-2">
                <div><IoSettingsOutline className="w-[25px] h-[25px]"/></div>
                <div className="text-2xl font-bold text-gray-600">Settings</div>
            </div>

            <div className="md:w-[30%] mt-10 flex flex-col gap-4">
                <Link to={'/settings/profileManager'}>
                    <div className="text-xl font-semibold text-gray-600">
                        Manage Profile
                    </div>
                </Link>

                <Link to={'/settings/accountManager/delete/'}>
                    <div className="text-xl font-semibold text-red-600">
                        Delete Account
                    </div>
                </Link>

                {/* <Link to={'/settings/privacyManager'}>
                    <div className="text-xl font-semibold text-gray-600">
                        Privacy
                    </div>                
                </Link>

                <Link to={'/settings/notificationManager'}>
                    <div className="text-xl font-semibold text-gray-600">                
                        Notification                
                    </div>                
                </Link>                 */}
                
            </div> 

            <div>
                <Link to={'/home'}>
                    <button
                        className="px-4 md:w-[30%] h-[45px] mt-10 bg-[#405cf5] text-white rounded-xl lg:w-[20%]"
                    >
                        Back to Home
                    </button>
                </Link>                
            </div>           
            
        </div>
    )
}

export default SettingsPage;