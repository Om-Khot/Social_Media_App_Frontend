// this page will render when user clicks on posts on profile page

import { useParams } from "react-router-dom";
import MySvgComponent from "../../assets/instagramWord";
import InstaLogo from "../../assets/instaLogo";
import ProfilePage from "../Users/ProfilePage";
import DisplayOneUserPosts from "./displayOneUserPosts";
import { useContext, useEffect, useState } from "react";
import UserdetailsContext from "../../Context/User/UserdetailsContext";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function SpecificPostsPostPage() {

    const {userid} = useParams(); 
    console.log("userid is ",userid);

    const {userDetails} = useContext(UserdetailsContext);
    const {firstName , lastName} = userDetails;

    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    const {firstName : loggedInFirstName , lastName : loggedInLastName} = loggedInUserDetails;

    const [name,setName] = useState('');

    useEffect(()=>{
        if(firstName === loggedInFirstName && lastName === loggedInLastName){
            setName("My Posts");
        }
        else{
            setName(`${firstName} ${lastName} Posts`);
        }
    },[name]);
    
    return(
        <div className="w-[100%] h-[100%] flex">

            <div className="w-[20%] flex-cols">
                <div className="w-[100%] h-[10%] flex">
                    <InstaLogo/>
                    <MySvgComponent/>
                </div>
                <div className="w-[100%] h-[85%] flex-cols justify-center items-center">
                    <ProfilePage followers={23} following={500}/>
                </div>                
            </div>

            <div className="w-[80%] h-[100%] bg-[#f5f5f5] border-2 rounded-[45px] px-8">
                <div className="mb-2 mt-2">
                    <h1 className="text-2xl text-gray-800 font-semibold">{name}</h1>
                </div>
                <div className="w-[100%] h-[90%] overflow-y-scroll scrollbar-hide">
                    <DisplayOneUserPosts userid={userid}/>
                </div>
            </div>
        </div>
    )
}

export default SpecificPostsPostPage;