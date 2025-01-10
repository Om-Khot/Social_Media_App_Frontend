import { useContext } from "react";
import { removeFromFollowers, unfollowUser } from "../../Helpers/Auths/axiosFunctions";
import ProfileImage from "../Profiles/ProfileImage";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { useNavigate } from "react-router-dom";

function Followr_ingCompo({details,type}){

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const navigate = useNavigate();

    const unfollowUserHandler = async() => {
        const confirm = window.confirm("Are you sure you want to unfollow?");
        if(!confirm) return;
        try {
            const result = await unfollowUser({
                selfUserId : loggedInUserDetails._id,
                followedUserId : details._id
            });
            alert("Successfully unfollowed",details.instaId);
            navigate(`/followfollowing/${loggedInUserDetails._id}?type=Following`);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromFollowersHandler = async() => {
        const confirm = window.confirm("Are you sure you want to remove from followers?");
        if(!confirm) return;
        try {
            const result = await removeFromFollowers({
                selfUserId : loggedInUserDetails._id,
                followedUserId : details._id
            });
            alert(`Successfully removed ${details.instaId} from your followers`);
            navigate(`/followfollowing/${loggedInUserDetails._id}?type=Followers`);
            console.log(result);
            navigate()
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="w-[100%] h-[75px] bg-[#ffffff] rounded-xl border-b-2 border-gray-300 mb-2 p-2">
            <div className="flex items-center gap-5"> 
                <div className="w-[55px] h-[55px]"><ProfileImage imgurl={details.profileImage}/></div>               
                
                <div className="text-md font-semibold text-gray-800">{details.instaId}</div>
                <div className="text-sm font-semibold text-gray-800 ml-[50px]">
                    {details.firstName} {details.lastName}
                </div>

                { type === "following" && <div className="text-xs font-semibold text-gray-800 ml-auto mr-5">
                                            <button 
                                                onClick={unfollowUserHandler}
                                                className="bg-[#405cf5] text-[#fff] px-4 py-2 rounded-md">
                                                unfollow
                                            </button>
                                        </div>
                }

                { type === "followers" && <div className="text-xs font-semibold text-gray-800 ml-auto mr-5">
                                            <button 
                                                onClick={removeFromFollowersHandler}
                                                className="bg-[#405cf5] text-[#fff] px-4 py-2 rounded-md">
                                                Remove from followers
                                            </button>
                                        </div>
                }
            </div>
        </div>
    )
}

export default Followr_ingCompo;