import { useContext, useEffect, useState } from "react";
import { fetchAllPosts } from "../../Helpers/Auths/axiosFunctions";
import PostCompo from "../../Components/Posts/PostCompo";
import PostDetailsContext from "../../Context/Posts/PostDetailsContext";

function FetchigPostsPage() {

    // const [list, setList] = useState([]);
    const {postDetails} = useContext(PostDetailsContext);
    const {setPostDetails} = useContext(PostDetailsContext);

    async function fetchPosts(){
        const response = await fetchAllPosts();
        const responseData = response.data.data; // array of all posts objects
        console.log("responseData",responseData);
        setPostDetails(responseData);
    }
    
    useEffect(()=>{
        fetchPosts();
    },[]);

    return (
        <div className="w-[100%] h-[100%] flex gap-5 flex-wrap justify-evenly mt-2 ">
            {postDetails && postDetails.map((post)=>{
                return(
                    <div key={post._id}>
                        <PostCompo postId={post._id} postImg={post.postImage} postCaption={post.caption} firstName={post.author.firstName} lastName={post.author.lastName} createTime={post.createdAt} userImage={post.author.profileImage} noOfLikesArray={post.likes} noOfLikes={post.likes.length} noOfComments={post.comments.length} />
                    </div>
                )
            })}
        </div>
    )
}

export default FetchigPostsPage;