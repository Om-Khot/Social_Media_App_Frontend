import { useContext, useState } from "react";
import { deleteFollowReq, deleteFollowReqAck, followUser } from "../../Helpers/Auths/axiosFunctions";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import ProfileImage from "../Profiles/ProfileImage";

function FollowReqCompo({reqDetails, isAck}){

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const myFollowers = loggedInUserDetails.followers;
    const myFollowing = loggedInUserDetails.following;

    const [followStatus, setFollowStatus] = useState(myFollowers.includes(reqDetails._id));
    const [followingStatus, setFollowingStatus] = useState(myFollowing.includes(reqDetails._id));

    const bgColor = isAck ? "bg-green-200" : "bg-white";

    const onClickHandler = async() => {
        console.log("Accepting Follow Request from",reqDetails.instaId);
        const followDetails = {
            selfUserId : reqDetails._id,
            followedUserId : loggedInUserDetails._id
        }
        try {
            const response = await followUser(followDetails);
            console.log(response);
            setFollowStatus(true);
        } catch (error) {
            console.log(error);
        }
    }

    // Follow Back request
    const onClickHandler2 = async() => {
        console.log("Follow back Request from",reqDetails.instaId);
        const followDetails = {
            selfUserId : loggedInUserDetails._id,
            followedUserId : reqDetails._id
        }
        try {
            const response = await followUser(followDetails);
            alert("You are now following "+reqDetails.instaId);
            setFollowingStatus(true);
            await onClickHandler3();  // remove request as all work of that request is done
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickHandler3 = async() => {
        console.log("Deleting Follow Request from",reqDetails.instaId);
        const followDetails = {
            targetUser : loggedInUserDetails._id,
            requestedUser : reqDetails._id
        }
        try {
            const response = await deleteFollowReq(followDetails);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const removeReqFromAck = async() => {
        console.log("Removing Follow Request from acknowledgement",reqDetails.instaId);
        const followDetails = {
            userId : loggedInUserDetails._id,
            targetUser : reqDetails._id
        }
        try {
            const response = await deleteFollowReqAck(followDetails);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const cancelSentFollowReq = async() => {
        console.log("Cancelling Follow Request to",reqDetails.instaId);
        const followDetails = {
            targetUser : reqDetails._id,
            requestedUser : loggedInUserDetails._id
        }
        try {
            const response = await deleteFollowReq(followDetails);
            const response2 = await removeReqFromAck();
            if(response2){
                console.log("Request cancelled successfully");
                alert("Request cancelled successfully");
            }            
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={`w-[99%] h-[85px] mx-auto ${bgColor} rounded-xl border-b-2 border-gray-300 mb-2 px-2 flex justify-between items-center`}>
            <div className="flex items-center">                
            <div className="w-[55px] h-[55px]"><ProfileImage imgurl={reqDetails.profileImage}/></div>
                {!isAck && <div className="text-sm text-gray-500 ml-[50px] mr-5">Follow Requests from</div>}
                {isAck && <div className="text-sm text-yellow-900 ml-[50px] mr-5">You requested to follow</div>}
                <div className="text-md font-semibold text-gray-800">{reqDetails.instaId}</div>
                <div className="text-sm font-semibold text-gray-800 ml-[50px]">
                    {reqDetails.firstName} {reqDetails.lastName}
                </div>
            </div>

            {followStatus && !isAck ? <div className="text-sm text-green-900">You have accepted this request</div> : ""}
            
            {isAck && (followingStatus && !followStatus) ? <div className="text-md text-green-900">
                                Accepted your follow request
                            </div> : ""
            }

            {isAck && (followStatus && followingStatus) ? <div className="text-md text-yellow-900">
                                                            Accepted your follow request and also following you back
                                                          </div> : ""
            }
            <div>

                {!followStatus && !isAck ? <button 
                                    onClick={onClickHandler3}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Delete Req
                                </button> : ""
                }

                {/* {followStatus && isAck ? <button 
                                    onClick={removeReqFromAck}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Remove
                                </button> : ""
                }           */}
                
                {!isAck && <button 
                                onClick={ !followStatus ? onClickHandler : onClickHandler2}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                {!followStatus ? "Accept" : "Follow Back"}
                            </button> 
                }

                

                {isAck && <button 
                                onClick={!followingStatus ? cancelSentFollowReq : removeReqFromAck}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                {!followingStatus ? "Cancel Req" : "Remove notification"}
                            </button> 
                }
                
            </div>

        </div>
    );
}

export default FollowReqCompo;