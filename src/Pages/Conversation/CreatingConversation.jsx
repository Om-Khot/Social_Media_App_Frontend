import { useContext, useState } from "react";
import ContactsPage from "../Messages/ContactsPage"
import { createConversation, getUserDetails } from "../../Helpers/Auths/axiosFunctions";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { useNavigate } from "react-router-dom";

function CreatingConversation() {

    const [search, setSearch] = useState("");
    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const navigate = useNavigate();

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            var searchedUser = await getUserDetails({instaId : search});
            console.log("searchedUser : ",searchedUser.data.data);
        } catch (error) {
            console.log(error);
            navigate(`/error/general/${error.response.data.message}`);
        }

        const user1 = loggedInUserDetails._id;
        const user2 = searchedUser.data.data._id;

        try {
            const response = await createConversation({user1, user2});
            console.log(response);
            alert("Successfully created a conversation");
            navigate('/messages');
        } catch (error) {
            console.log(error);
            navigate(`/error/general/${error.response.data.message}`);
        }
    }

    return(
        <div className="w-[100%] h-[100%]">

            <div className="w-[40%] h-[10%] rounded-[45px] mb-5">
                <input 
                    type="search" 
                    placeholder="Search" 
                    className="w-[90%] h-[100%] py-2 px-4 border-[#f5f5f5] border-b-2  rounded-full px-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onDoubleClick={onSubmitHandler}
                />                
            </div>  
            
            <div className="w-[40%] h-[80%] rounded-[45px]">
                                <ContactsPage/>
            </div>         
            
        </div>
    )
}

export default CreatingConversation