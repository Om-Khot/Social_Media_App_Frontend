import SearchCompo from "../Components/Inputs/SearchCompo";
import { FaPlus } from "react-icons/fa";
import { getUserDetails } from "../Helpers/Auths/axiosFunctions";
import { useContext, useState } from "react";
import UserdetailsContext from "../Context/User/UserdetailsContext";
import { Link } from "react-router-dom";
import FetchigPostsPage from "./Posts/fetchingPostsPage";
import LoggedinUserContext from "../Context/User/LoggedinUserContext";
import { BsLightning } from "react-icons/bs";

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
        <div className="w-[100%] h-[100%] bg-[#f5f5f5] border-2 rounded-[45px] relative ">

            {/* Search Bar section */}
            <div className="w-[100%] h-[45px] px-4 mt-4 rounded-[45px] flex justify-between items-center sticky top-5 z-50">
                <div className="w-[35%] h-[100%] mx-5 my-4">
                    <SearchCompo
                        onSubmitHandler={onSearchHandler}
                        onChangeHandler={onChangeHandler}
                    />
                </div>                
                <div className="w-[20%] h-[100%] flex gap-5 ">
                    <div>
                        <Link to={'/messages'}>
                            <div className="w-[40px] h-[40px] rounded-full border-2 border-slate-500 flex justify-center items-center bg-[#f0f2f5]">
                            <BsLightning />
                            </div>
                        </Link>                        
                    </div>
                    <Link to={'/post'}>
                        <button
                            className="w-[100%] h-[80%] bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 px-4 text-[#fff] rounded-full flex justify-center gap-2 items-center">
                            <FaPlus/>
                            Create a Post
                        </button>
                    </Link>                    
                </div>
                                
            </div>

            {/* Stories section */}
            <div className="w-[100%] h-[25%] mt-5 px-8 sticky top-[25px] z-40">
                <div>
                    <h1 className="text-2xl font-semibold">Stories</h1>
                </div>

                <div className="w-[100%] h-[100%] mt-3 flex gap-2 overflow-x-scroll scrollbar-hide">
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    <div className="w-[85px] h-[85px] rounded-full border-2 flex-shrink-0"></div>
                    
                </div>
                
            </div>

            {/* Feed section */}
            <div className="w-[100%] h-[60%] px-8">
                <div className="text-2xl font-semibold mb-2 sticky top-[25px] z-40">Posts</div>

                <div className="w-[100%] h-[92%] rounded-b-[45px] overflow-y-scroll scrollbar-hide">
                    <FetchigPostsPage/>
                </div>
            </div>
        </div>
    );
}

export default UserFeedPage;




