import { useContext, useEffect, useState } from "react";
import Followr_ingCompo from "../../Components/Follower_ing/Folloer_ingCompo";
import { getAllFollowers } from "../../Helpers/Auths/axiosFunctions";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function DisplayingFollowersPage({userId}){

    const [list, setList] = useState([]);

    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    
    async function fetchFollowers(userId){
        const response = await getAllFollowers(userId);
        const responseData = response.data.data; // array of all posts objects
        console.log("responseData from DisplayOneUserPosts",responseData.followers);
        setList(responseData.followers);
    }

    useEffect(()=>{
        fetchFollowers(userId);
    },[userId,loggedInUserDetails.followers]);

    return(
        <div className="w-[100%] h-[100%] mt-2">
            {list && list.map((follower,index)=><Followr_ingCompo key={index} details={follower} type={"followers"}/>)}
        </div>
    )


}

export default DisplayingFollowersPage;