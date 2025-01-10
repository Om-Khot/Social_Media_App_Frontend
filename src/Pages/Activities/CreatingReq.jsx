import { useContext, useState } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { createFollowReq } from "../../Helpers/Auths/axiosFunctions";

function CreatingReq() {

    const [searchTerm, setSearchTerm] = useState('');

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const onClickHandler = async() => {
        console.log(searchTerm);
        if(searchTerm == loggedInUserDetails.instaId){
            alert("You can't follow yourself");
            setSearchTerm('');
            return;
        }
        else if(searchTerm == ""){
            alert("Please enter a valid instaId");
            return;
        }
        const details = {
            targetUser : searchTerm,
            requestedUser : loggedInUserDetails._id
        }

        try {
            const response = await createFollowReq(details);
            console.log("response",response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-around items-center bg-[#fff] border-2 border-gray-600 rounded-xl">
            <div className="w-[100%] h-[55px] flex justify-center items-center font-pacifico text-xl underline">
                <h1>Send Request to your friend</h1>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search your friend's instaId to follow" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[100%] h-[55px] border-slate-400 border-b-2 rounded-md px-2 md:w-[25vw]"
                />
            </div>

            <div className="w-[100%] h-[55px] flex justify-end mr-10">
                <button 
                    onClick={onClickHandler}
                    className="w-[30%] h-[55px] bg-blue-600 text-white rounded-md">Follow</button>
            </div>
        </div>
    )
}

export default CreatingReq;