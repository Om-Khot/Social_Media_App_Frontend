import { useEffect, useState } from "react";
import { fetchAllComments } from "../../Helpers/Auths/axiosFunctions";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import CommentCompo from "./CommentCompo";

function DisplayCommennts({postid}){

    const [list, setList] = useState([]);
    
    async function loadAllComments(){
        const response = await fetchAllComments(postid);
        const responseData = response.data.data;
        console.log("responseData is",responseData.comments);
        setList(responseData.comments);
    }

    useEffect(()=>{
        loadAllComments();
    },[postid]);

    return(
        <div className="w-[100%] h-[100%]">
            {(!list || list.length == 0) && <div className="w-[100%] h-[100%] text-2xl font-semibold text-gray-600 flex flex-col justify-center items-center gap-2">
                                                <div><HiOutlineExclamationCircle/></div> 
                                                <div>No Comments yet....</div>
                                            </div> 
            }

            {list && list.map((comment,index) => <CommentCompo key={index} commentDetails={comment}/>)}
        </div>
    )

}

export default DisplayCommennts;