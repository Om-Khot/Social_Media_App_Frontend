import SearchCompo from "../Components/Inputs/SearchCompo";
import { FaPlus } from "react-icons/fa";
import { getUserDetails } from "../Helpers/Auths/axiosFunctions";
import { useContext, useState } from "react";
import UserdetailsContext from "../Context/User/UserdetailsContext";
import { Link, useNavigate } from "react-router-dom";
import FetchigPostsPage from "./Posts/fetchingPostsPage";
import LoggedinUserContext from "../Context/User/LoggedinUserContext";
import { BsLightning } from "react-icons/bs";
import DisplayStories from "./Stories/DisplayStories";
import ProfileImage from "../Components/Profiles/ProfileImage";

function UserFeedPage(){

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const {setUserDetails} = useContext(UserdetailsContext);
    const [serachItem,setSerachItem] = useState({
        instaId : ""
    });

    const onChangeHandler = (e)=>{
        setSerachItem({instaId : e.target.value});
        console.log("serachItem",serachItem);
    }

    const onSearchHandler = async(e)=>{
        e.preventDefault();
        try {
            console.log("Trying to search the user");
            if(serachItem.instaId == "") {
                setUserDetails(loggedInUserDetails);
                return;
            };
            const response = await getUserDetails(serachItem); 
            if(!response){
                console.log("User not found");
            }
            console.log(response.data);
            setUserDetails(response.data.data);
            return response;
        } catch (error) {
            console.log("Error while searching the user",error);
            setUserDetails({firstName : "User not found"});
        }
    }

        
    return(
        <div className="w-[100%] h-[100%] bg-[#f5f5f5] border-2 rounded-xl md:rounded-[45px] relative ">
            {/* Search Bar section */}
            <div className="w-[100%] h-[45px] md:px-4 mt-4 rounded-[45px] flex justify-between items-center sticky top-5 z-50">
                
                <div className="w-[20%] h-[45px] rounded-full border-2 border-slate-500 flex justify-center items-center object-contain bg-[#f0f2f5] md:hidden">
                    <Link to={'/home/profile'} className="w-[100%] h-[100%]">
                        <ProfileImage imgurl={loggedInUserDetails.profileImage}/>
                    </Link>
                </div>
                
                <div className="w-[75%] md:w-[60%] h-[100%] mx-10 my-4 lg:w-[40%] xl:w-[40%]">
                    <SearchCompo
                        onSubmitHandler={onSearchHandler}
                        onChangeHandler={onChangeHandler}
                    />
                </div>                
                <div className="w-[15%] md:w-[70%] h-[100%] flex gap-5 lg:w-[35%] xl:w-[20%] ">
                    <div>
                        <Link to={'/messages'}>
                            <div className="w-[40px] h-[40px] md:w-[40px] h-[40px] rounded-full border-2 border-slate-500 flex justify-center items-center bg-[#f0f2f5]">
                            <BsLightning />
                            </div>
                        </Link>                        
                    </div>
                    <Link to={'/post'}>
                        <button
                            className="bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 absolute top-[550px] right-0 transform-translate-x-1/2 md:relative md:top-0 md:w-[100%] h-[80%] px-4 text-[#fff] rounded-full flex justify-center gap-2 items-center">
                            <FaPlus/>
                            <div className="hidden md:block">Create a Post</div>
                        </button>
                    </Link>                    
                </div>
                                
            </div>

            {/* Stories section */}
            <div className="w-[100%] h-[20%] px-2 md:px-8 mt-5">
                <div>
                    <h1 className="text-lg md:text-2xl font-semibold">Stories</h1>
                </div>

                <div className="w-[100%] h-[90%] md:w-[100%] h-[85%] overflow-x-scroll scrollbar-hide">
                    <DisplayStories/>                    
                </div>
                
            </div>

            {/* Feed section */}
            <div className="w-[100%] h-[62%] px-2 mt-2 md:px-8 mt-5">
                <div className="text-lg md:text-2xl font-semibold mb-2 sticky top-[25px] z-40">Posts</div>

                <div className="w-[100%] h-[92%] overflow-y-scroll scrollbar-hide md:rounded-b-[45px]">
                    <FetchigPostsPage/>
                </div>
            </div>
        </div>
    );
}

export default UserFeedPage;




