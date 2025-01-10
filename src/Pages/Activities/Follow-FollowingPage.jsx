import { useLocation, useParams } from "react-router-dom";
import ProfilePage from "../Users/ProfilePage";
import InstaLogo from "../../assets/instaLogo";
import MySvgComponent from "../../assets/instagramWord";
import { useEffect, useState } from "react";
import { getAllFollowRequests } from "../../Helpers/Auths/axiosFunctions";
import DisplayingRequests from "./DisplayingRequests";
import { MdAdd } from "react-icons/md";
import CreatingReq from "./CreatingReq";
import { RxCrossCircled } from "react-icons/rx";
import DisplayingFollowersPage from "./DisplayingFollowersPage";
import DisplayingFollowingPage from "./DisplayingFollowings";

function FollowFollowingPage() {
    const {userid} = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    console.log(type);
    console.log("userid is:",userid);
    const [containt,setContaint] = useState(type);

    const [popupScreen,setPopupScreen] = useState(false);

    const onClickHandler = () => {
        setPopupScreen(!popupScreen);
    }

    return (
        <div className="w-[100%] h-[100%] flex">

            <div className={`w-[20%] h-[100%] ${popupScreen && 'opacity-20'}`}>
                <div className="flex gap-2">
                    <InstaLogo/>
                    <MySvgComponent/>
                </div>
                <div className="w-[100%] h-[85%] flex-cols justify-center items-center">                
                    <ProfilePage/>
                </div>
            </div>   

            <div className={`w-[80%] h-[100%] rounded-[45px] border-2 border-gray-300 ${popupScreen && 'opacity-20'}`}>
                <div className="w-[100%] h-[10%] flex justify-around items-center">
                    <div 
                        onClick={(e)=>{
                            setContaint('Followers');
                        }}
                        className={`text-lg font-semibold text-gray-700 ${containt === 'Followers' && 'text-blue-600 border-b-2 border-blue-600'}`}>
                        Followers
                    </div>
                    <div 
                        onClick={(e)=>{
                            setContaint('Following');
                        }}
                        className={`text-lg font-semibold text-gray-700 ${containt === 'Following' && 'text-blue-600 border-b-2 border-blue-600'}`}>
                        Following
                    </div>                    
                    <div className={`text-lg font-semibold text-gray-700 ${containt === 'Requests' && 'text-blue-600 border-b-2 border-blue-600'}`}
                        onClick={(e)=>{
                            setContaint('Requests');
                        }} 
                        >
                        Requests
                    </div>
                </div>

                <div className="w-[100%] h-[90%] bg-[#f5f5f5] rounded-b-[45px] overflow-y-scroll scrollbar-hide">
                    {containt === 'Requests' && <DisplayingRequests userId={userid}/>}
                    {containt === 'Followers' && <DisplayingFollowersPage userId={userid}/>}
                    {containt === 'Following' && <DisplayingFollowingPage userId={userid}/>}
                </div>
            </div>
            
            
            <div className={`absolute bottom-10 right-20 ${popupScreen && 'opacity-20'}`}>
                <button 
                    onClick={onClickHandler}
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md">
                    <MdAdd className="text-2xl"/>
                    <div>New</div>
                </button>
            </div> 
            

            {popupScreen && <div className="fixed w-[45%] h-[45%] mx-[27.5%] my-[7.5%] rounded-xl bg-gray-900 bg-opacity-50  z-500">
                                <RxCrossCircled className="absolute top-5 right-5 text-3xl bg-red-600 text-white rounded-full cursor-pointer" onClick={onClickHandler}   />
                                <CreatingReq/>
                            </div>
            }
            
        </div>
    )
}

export default FollowFollowingPage;