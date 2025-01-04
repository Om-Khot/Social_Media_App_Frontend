import { useContext, useEffect, useState } from "react";
import MySvgComponent from "../assets/instagramWord";
import InstaLogo from "../assets/instaLogo";
import UserFeedPage from "./UserFeedPage";
import ProfilePage from "./Users/ProfilePage";
import LoggedinUserContext from "../Context/User/LoggedinUserContext";
import UserdetailsContext from "../Context/User/UserdetailsContext";


function HomePage(){
    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    console.log("Logged in user details",loggedInUserDetails);

    const {setUserDetails} = useContext(UserdetailsContext);    

    const onClickHandler = async() => {
        console.log("clicked");
        setUserDetails(loggedInUserDetails);
    }
    return(
        <div className="w-[100%] h-[100%] flex">
            {/* Login User Deatils */}
            <div className="w-[20%] flex-cols">
                <div className="w-[100%] h-[10%] flex" onClick={onClickHandler}>
                    <InstaLogo/>
                    <MySvgComponent/>
                </div>
                <div className="w-[100%] h-[85%] flex-cols justify-center items-center">
                    <ProfilePage followers={23} following={500}/>
                </div>                
            </div>
            {/* Content Page */}
            <div className="w-[80%] h-[100%]">
                <UserFeedPage/>
            </div>
                
        </div> 
    );
}

export default HomePage;