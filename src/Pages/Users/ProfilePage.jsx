import { MdHome } from "react-icons/md";
import ProfileImage from "../../Components/Profiles/ProfileImage";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import UserdetailsContext from "../../Context/User/UserdetailsContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Helpers/Auths/axiosFunctions";
import socket from "../../Helpers/SocketIo/SockcetIoSetup";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";


function ProfilePage({followers,following}){

    const {userDetails} = useContext(UserdetailsContext);
    const {setUserDetails} = useContext(UserdetailsContext);
    const {setLoggedInUserDetails} = useContext(LoggedinUserContext);

    const navigate = useNavigate();

    const {posts} = userDetails;

    console.log("user details from profile page after socket!",userDetails);

    console.log("user detials from profile page!",userDetails);

    const logoutHandler = async () => {
        console.log("logout handler hits");
        const confirm = window.confirm("Are you sure you want to logout?");
        if(!confirm) return;
        await logoutUser();
        alert("Logged out successfully!");
        setUserDetails({});
        setLoggedInUserDetails({});        
        socket.disconnect();

        navigate('/');
    }

    return(
        <div className="w-[100%] h-[100%]   flex-cols justify-center items-center">
            <div className="w-[110px] h-[110px] border-2 rounded-full mx-auto">
                <ProfileImage imgurl={userDetails.profileImage}/> 
            </div>
            <div className="w-[100%] h-[10%] text-center text-gray-800 mt-2">
                <div className="text-lg font-semibold">{userDetails.firstName} {userDetails.lastName}</div>
                <div className="text-md">{userDetails.instaId}</div>
            </div>  

            <div className="w-[100%] h-[65px] mt-2 text-gray-800 text-center overflow-hidden px-4 ">
                <div>{userDetails.firstName} ||  {userDetails.bio}</div>               
            </div>

            <div className="w-[100%] h-[10%]  text-center text-md text-gray-800 font-bold flex justify-around">
                
                <Link to={`/post/${userDetails._id}`}>
                    <div className="hover:bg-[#f5f5f5] hover:text-[#405cf5] hover:rounded-xl hover:p-2">
                        <p>Posts</p>
                        {posts.length}
                    </div>
                </Link>
                                
                <div>
                    <p>Followers</p>
                    {followers}
                </div>                
                <div>
                    <p>Following</p>
                    {following}
                </div> 
            </div>           

            <div className="w-[100%] h-[20%] mt-2 px-4 hover:bg-[#f5f5f5] hover:text-[#405cf5] hover:rounded-xl hover:p-2">
                <Link to={'/createStory'}>
                    <div className="mb-2 font-bold text-gray-800">Create Your New Story</div>
                    <div className="w-[55px]">
                        <div className="text-center">
                            <button>
                                <div className="w-[55px] h-[55px] rounded-full border-2 flex justify-center items-center">
                                        <FaPlus className="w-[15px] h-[15px]"/>
                                </div>
                                <div>New</div>
                            </button>                        
                        </div>
                    </div>
                </Link>                
            </div> 

            <div className="w-[100%] h-[20%] mt-4 mx-2  rounded-xl p-2">
                
                <Link to={'/home'}>
                    <div className="flex items-center gap-5 text-md font-semibold text-gray-700 hover:bg-[#f5f5f5] hover:text-[#405cf5] hover:rounded-xl hover:p-2">
                        <div><MdHome className="w-[25px] h-[25px]"/></div>
                        <div>Home</div>
                    </div>
                </Link>                    
                
                <div className="flex items-center mt-2 gap-5 text-md font-semibold text-gray-700">
                    <div><TfiVideoClapper className="w-[25px] h-[25px]"/></div>
                    <div>Reels</div>
                </div>

                <Link to={'/settings'}>
                    <div className="flex items-center mt-2 gap-5 text-md font-semibold text-gray-700 hover:bg-[#f5f5f5] hover:text-[#405cf5] hover:rounded-xl hover:p-2">
                        <div><IoSettingsOutline className="w-[25px] h-[25px]"/></div>
                        <div>Settings</div>
                    </div>
                </Link>
                
            </div>

            <div className="flex gap-5 mx-2">
                <button
                    onClick={logoutHandler} 
                    className="flex gap-5">
                    <div><IoIosLogOut className="w-[30px] h-[30px]"/></div>
                    <div className="text-gray-700 text-md font-semibold">Logout</div>
                </button>                
            </div>                                                                                                                                  
        </div>
    );
}

export default ProfilePage;