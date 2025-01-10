import { useContext, useEffect, useState } from "react";
import Followr_ingCompo from "../../Components/Follower_ing/Folloer_ingCompo";
import { getAllFollowers, getAllFollowing } from "../../Helpers/Auths/axiosFunctions";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function DisplayingFollowingPage({userId}){

    const [list, setList] = useState([]);

    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    
    async function fetchFollowings(userId){
        const response = await getAllFollowing(userId);
        const responseData = response.data.data; // array of all posts objects
        console.log("responseData from DisplayOneUserPosts",responseData.following);
        setList(responseData.following);
    }

    useEffect(()=>{
        fetchFollowings(userId);
    },[userId,loggedInUserDetails.following]);

    return(
        <div className="w-[100%] h-[100%] mt-2">
            {list && list.map((follower,index)=><Followr_ingCompo key={index} details={follower} type={"following"}/>)}
        </div>
    )


}

export default DisplayingFollowingPage;