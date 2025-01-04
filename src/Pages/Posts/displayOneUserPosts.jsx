import { useEffect, useState } from "react";
import { fetchPostOfOneUser } from "../../Helpers/Auths/axiosFunctions";
import PostCompo from "../../Components/Posts/PostCompo";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DisplayOneUserPosts({userid}){

    const [list, setList] = useState([]);
    
    async function fetchPosts(){
        const response = await fetchPostOfOneUser(userid);
        const responseData = response.data.data; // array of all posts objects
        console.log("responseData from DisplayOneUserPosts",responseData);
        setList(responseData);
    }
        
    useEffect(()=>{
        fetchPosts();
    },[]);

    return(
        <div className="w-[100%] h-[100%] flex gap-5 flex-wrap justify-evenly mt-2 ">
            {(!list || list.length == 0) && <div className="text-2xl font-semibold text-gray-600 flex flex-col justify-center items-center gap-2">
                                                <div className="text-5xl"><HiOutlineExclamationCircle /></div> 
                                                <div>No Posts Yet....</div>
                                            </div>
            }
            {list && list.map((post)=>{
                return(
                    <div key={post._id}>
                        <PostCompo postId={post._id} postImg={post.postImage} postCaption={post.caption} firstName={post.author.firstName} lastName={post.author.lastName} createTime={post.createdAt} userImage={post.author.profileImage} noOfComments={post.comments.length} noOfLikes={post.likes.length} noOfLikesArray={post.likes} />
                    </div>
                )
            })}
        </div>
    )
}

export default DisplayOneUserPosts;