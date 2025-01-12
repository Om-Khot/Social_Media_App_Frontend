import { useNavigate, useParams } from "react-router-dom";
import PostImage from "../../Components/Posts/PostImage";
import CreateCommentsPage from "../Comments/CreateCommentsPage";
import { deletePost, fetchOnePostById } from "../../Helpers/Auths/axiosFunctions";
import { useContext, useEffect, useState } from "react";
import { changeDateFormat } from "../../Helpers/Others/DateFormat";
import DisplayOneUserPosts from "../Posts/displayOneUserPosts";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import DisplayAllLikes from "../../Components/Likes/DisplayAllLikes";
import UserdetailsContext from "../../Context/User/UserdetailsContext";

function PostActivitiesPage() {
    const {postid} = useParams();

    const [postDetails, setPostDetails] = useState({});

    const {loggedInUserDetails} = useContext(LoggedinUserContext);    

    const [isLoading, setIsLoading] = useState(true);

    const [commentsRender, setCommentsRender] = useState(true);
    const [color, setColor] = useState("white");

    const navigate = useNavigate();

    async function fetchPostDetails(){
        const response = await fetchOnePostById(postid);
        const responseData = response.data.data;
        console.log("responseData is",responseData);
        setPostDetails(responseData);
        setIsLoading(false);
    }

    

    const reqDate = changeDateFormat(postDetails.createdAt);
    
    
    useEffect(()=>{
        fetchPostDetails();        
    },[postid]);

    const goHome = () => {
        navigate('/home');
    }

    // function to delete a post
    const onClickHandler = async() => {
        console.log("delete post clicked");
        const confirm = window.confirm("Are you sure you want to delete this post?");
        if(!confirm) return;
        try {
            const response = await deletePost(postid);
            console.log("Successfully deleted the post");

            if(response){
                alert("Successfully deleted the post");
            }

            navigate('/home');
        } catch (error) {
            console.log(error);
            alert("Something went wrong please try again");
        }        

    }
    return(
        <div className="w-[100%] h-[100%] py-2">
            {isLoading && <div className="text-2xl">Loading...</div>}
            {!isLoading && <div className="w-[100%] h-[100%] flex gap-2">

                                <div className="w-[100%] h-[100%] px-2 md:w-[45%] flex flex-col md:max-h-screen ">
                                    <div className="inline-block flex flex-col md:w-[100%] md:flex-row md:w-[100%] md:h-[100%] md:gap-4 border-b-2 border-gray-200 xl:flex xl:flex-col">
                                        <img src={postDetails.postImage} alt="Post Image" className="w-[95%] h-[100%] object-contain md:w-auto md:h-[300px] border-gray-200 border-2 rounded-3xl max-w-[320px] max-h-[350px] object-cover lg:max-w-[420px]" />
                                        <div className="min-w-[100%]">
                                            <div className="mt-4 mb-4">
                                                <div>{postDetails.caption} </div>
                                            </div>
                                            <div>
                                                <div>{reqDate}</div>
                                                <div>Likes: {postDetails.likes.length} </div>
                                            </div>
                                            { loggedInUserDetails._id === postDetails.author._id && <div className="text-xs absolute top-[265px] left-[220px] md:absolute md:text-md md:top-[345px] md:left-[35%]">
                                                <button
                                                    onClick={onClickHandler} 
                                                    className="bg-red-600 text-white px-2 py-1 rounded-md">Delete Post</button>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-[100%] h-[55%] mt-4">
                                        <div className="w-[100%] h-[1%] flex gap-10 items-center">
                                            <h1 
                                                onClick={()=>{
                                                        setCommentsRender(true)
                                                    }}
                                                className="text-md font-semibold text-gray-600 cursor-pointer"
                                            >
                                                Comments
                                            </h1>  
                                            <h1 
                                                onClick={()=>{
                                                    setCommentsRender(false)
                                                }}
                                                className="text-md font-semibold text-gray-600 cursor-pointer"
                                            >
                                                Likes
                                            </h1>              
                                        </div>
                                        <div className="w-[100%] h-[90%] mt-4 border-2 p-2 rounded-3xl overflow-y-scroll scrollbar-hide bg-gray-100 ">
                                            {commentsRender && <CreateCommentsPage postDetailsID={postid}/>}
                                            {!commentsRender && <DisplayAllLikes postId={postid}/>}
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="hidden md:block w-[55%] h-[75%] ml-auto mt-auto px-1 py-2 bg-gray-100 rounded-xl border-2 border-gray-200  xl:h-[100%]">
                                    <div className="h-[5%] text-xl font-semibold text-black-600 px-10 mb-4 sticky top-0 z-10 flex justify-between items-center">
                                        <div> 
                                            More Posts By <span className="font-semibold">{postDetails.author.firstName}</span> 
                                        </div>
                                        <div>
                                            <button 
                                                onClick={goHome}
                                                className="bg-blue-600 text-sm text-white py-1 px-2 rounded-xl">
                                                Home
                                            </button>
                                        </div>
                                    </div> 
                                    <div className="h-[90%] overflow-y-scroll scrollbar-hide  relative">      
                                        <DisplayOneUserPosts userid={postDetails.author._id}/>
                                    </div>                             
                                </div>
                                
                           </div>           
            
            }            

        </div>
    );
}

export default PostActivitiesPage;