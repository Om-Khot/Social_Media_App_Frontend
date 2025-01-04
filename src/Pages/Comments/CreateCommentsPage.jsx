import { CiLocationArrow1 } from "react-icons/ci";
import { createComment } from "../../Helpers/Auths/axiosFunctions";
import { useContext, useState } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import DisplayCommennts from "../../Components/Comments/DisplayComments";
import SimpleLoader from "../../Components/Loader/Loader1";
import PostDetailsContext from "../../Context/Posts/PostDetailsContext";

function CreateCommentsPage({postDetailsID}){

    const {loggedInUserDetails} = useContext(LoggedinUserContext);  

    const [comments, setComments] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = (e) => {
        setComments(e.target.value);
    }

    const onSubmitHandler = async() => {
        if(comments === '') {
            alert("Please enter a comment");
            return;
        };

        const confirmation = window.confirm("Are you sure you want to post this comment?");
        if(!confirmation) return;

        setIsLoading(true);
        const commentDetails = {
            text : comments,
            author : loggedInUserDetails._id,
            postId : postDetailsID,
        }
        const response = await createComment(commentDetails);
        console.log("comment response",response.data.data);
        setComments('');
        setIsLoading(false);
        return response;
    }
    return(
        <div className="w-[100%] h-[100%] py-2 ">
            {isLoading && <div className="w-[100%] h-[75%] mt-4 border-2 p-2 rounded-3xl flex justify-center items-center"><SimpleLoader/></div>}
            
            {!isLoading && <div className="w-[100%] h-[86%] border-2 p-2 rounded-3xl overflow-y-scroll scrollbar-hide bg-gray-100 ">
                                <DisplayCommennts postid={postDetailsID}/>
                            </div>
            }
            
            {!isLoading && <div className="w-[100%] h-[10%] flex justify-between items-center mt-4">
                                <input  type="text" 
                                        placeholder="Write a comment"
                                        onChange={onChangeHandler} 
                                        className="w-[90%] h-[100%] border-2 border-gray-400 rounded-3xl p-2"
                                />
                                
                                <button 
                                    onClick={onSubmitHandler}
                                    className="w-[10%] h-[100%] flex justify-center items-center text-3xl border-2 rounded-3xl p-2 bg-blue-700 text-white"
                                >

                                    <CiLocationArrow1/>
                                </button>
                            </div>
            }
        </div>
    )
}

export default CreateCommentsPage;