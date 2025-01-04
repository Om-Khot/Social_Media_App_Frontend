import { LuUserRound } from "react-icons/lu";
import { changeDateFormat } from "../../Helpers/Others/DateFormat";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import RedHeartIcon from "../../assets/redHeart";
import { useContext, useEffect, useState } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { disLikePost, likePost } from "../../Helpers/Auths/axiosFunctions";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";

function PostCompo({postId,postImg, postCaption,firstName,lastName,createTime,userImage,noOfLikesArray,noOfLikes,noOfComments}) {

    createTime = changeDateFormat(createTime);

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const user_Id = loggedInUserDetails._id;

    const [isLiked, setIsLiked] = useState(noOfLikesArray.includes(user_Id));
    const [likes, setLikes] = useState(noOfLikes);

    const [clickTimeout, setClickTimeout] = useState(null);

    const navigate = useNavigate();

    async function onLikePost(){
        console.log("Liked the post");
        setIsLiked(!isLiked);
        if(!isLiked){
            const response = await likePost({postId : postId, userId : user_Id});
            setLikes(response.data.data.likes.length);
        }
        else{
            const response = await disLikePost({postId : postId, userId : user_Id});
            setLikes(response.data.data.likes.length);
        }
    }

    function onSingleClickHandler() {
        console.log("Single Clicked");
        navigate(`/activities/${postId}`);
    }

    const handleClick = () => {
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          setClickTimeout(null);
          onLikePost(); // Double-click logic
        } else {
          const timeout = setTimeout(() => {
            onSingleClickHandler(); // Single-click logic
            setClickTimeout(null);
          }, 250); // Adjust delay based on what you consider a "double click"
          setClickTimeout(timeout);
        }
    };
    
    return(
        <div className="inline-block border-2 border-gray-200 bg-[#fff] rounded-3xl px-2 py-2 shadow-xs shadow-[#000] " onClick={handleClick}>

            <div className="flex gap-2">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-100 flex justify-center items-center">
                    {userImage ? <img src={userImage} className="w-[50px] h-[50px] rounded-full" /> : <LuUserRound className="w-[40px] h-[40px] rounded-full" />}
                </div>                
                <div className="text-md font-semibold flex flex-col mb-4">
                    <div>{firstName} {lastName} </div>
                    <div><p className="text-sm text-gray-500">{createTime}</p></div> 
                </div>
            </div>  

            

            <img src={postImg} className="w-auto h-auto border-gray-800 rounded-xl max-w-[300px] max-h-[350px] object-contain" />

            <div className="flex items-center mt-2 gap-4">
                <div className="text-lg font-semibold ml-2 flex items-center gap-2">
                    {isLiked ? <RedHeartIcon/> : <IoIosHeartEmpty/>} {likes}
                </div>
                <div className="text-lg font-semibold ml-2 flex items-center gap-2">
                    <AiOutlineMessage /> {noOfComments}
                </div>
            </div>

            <p className="text-md text-gray-500 mt-2 ml-2">{postCaption}</p>
        </div>
    )
}

export default PostCompo;