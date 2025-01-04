import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchAllLikes } from "../../Helpers/Auths/axiosFunctions";
import SimpleLoader from "../Loader/Loader1";
import LikesCompo from "./LikesCompo";
import { useEffect, useState } from "react";

function DisplayAllLikes({postId}) {

    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getAllLikes(){
        setIsLoading(true);
        const response = await fetchAllLikes(postId);
        console.log("response of likes is",response.data.data);
        setList(response.data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllLikes();
    },[postId]);

    return(
        <div>
            {isLoading && <div className="w-[100%] h-[75%] mt-4 border-2 p-2 rounded-3xl flex justify-center items-center"><SimpleLoader/></div>}
            {!isLoading && (!list || list.length == 0) && <div className="w-[100%] h-[100%] text-2xl font-semibold text-gray-600 flex flex-col justify-center items-center gap-2">
                                                            <div><HiOutlineExclamationCircle/></div> 
                                                            <div>No Comments yet....</div>
                                                        </div> 
            }            
            {!isLoading && list.map((likeDetails, index) =><LikesCompo key={index} likeDetails={likeDetails}/>)}
        </div>
    )
}

export default DisplayAllLikes;