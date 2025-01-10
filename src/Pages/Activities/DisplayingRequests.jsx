import { useContext, useEffect, useState } from "react";
import { getAllFollowRequests, getFollowReqAcknowledgement } from "../../Helpers/Auths/axiosFunctions";
import FollowReqCompo from "../../Components/FollowReq/FollowReq";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import FollowReqContext from "../../Context/FollowReq/FollowReqContext";
import FollowAckContext from "../../Context/FollowReq/FollowAckContext";

function DisplayingRequests({userId}) {

    console.log("userId from DisplayingRequests",userId);

    const {followReq} = useContext(FollowReqContext);
    const {setFollowReq} = useContext(FollowReqContext);

    const {followAcknowledgement} = useContext(FollowAckContext);
    const {setFollowAcknowledgement} = useContext(FollowAckContext);

    async function fetchRequests(){
        const response = await getAllFollowRequests(userId);
        const responseData = response.data.data; // array of all posts objects
        console.log("responseData from DisplayOneUserPosts",responseData.followRequests);
        setFollowReq(responseData.followRequests);

        const ack = await getFollowReqAcknowledgement(userId);
        const ackData = ack.data.data; // array of all ack objects
        console.log("ackData from DisplayOneUser Requests",ackData.ownRequests);
        setFollowAcknowledgement(ackData.ownRequests);
    }

    useEffect(()=>{
        fetchRequests();
    },[]);


    return(
        <div className="w-[100%] h-[100%] overflow-y-scroll scrollbar-hide mt-2">
            {followReq && followReq.length == 0 && followAcknowledgement && followAcknowledgement.length == 0 && <div className="w-[100%] h-[100%] text-2xl font-semibold text-gray-600 flex flex-col justify-center items-center gap-2">
                                            <div className="text-5xl"><HiOutlineExclamationCircle/></div> 
                                            <div>No Requests yet....</div>
                                        </div>
            }
            {followReq && followReq.length > 0 && followReq.map((req,index)=><FollowReqCompo key={index} reqDetails={req} isAck={false}/>)}

            {followAcknowledgement && followAcknowledgement.length > 0 && followAcknowledgement.map((ack,index)=><FollowReqCompo key={index} reqDetails={ack} isAck={true}/>)}
        </div>
    )
}

export default DisplayingRequests;