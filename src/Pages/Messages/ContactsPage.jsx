import { useContext, useEffect, useState } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { allConversationsOfAUser } from "../../Helpers/Auths/axiosFunctions";
import ContactCompo from "../../Components/Contacts/ContactCompo";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ContactsPage() {

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const [contacts, setContacts] = useState([]);

    const navigate = useNavigate();

    async function fetchContacts(){
        try {
            const response = await allConversationsOfAUser(loggedInUserDetails._id);
            console.log("contacts are:",response.data.data);
            setContacts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [loggedInUserDetails._id]);

    return (
        <div className="w-[100%] h-[100%] border-2 border-gray-300 flex flex-col items-center bg-[#f5f5f5] rounded-[45px]">
            <div className="w-[100%] h-[10%] flex gap-5 items-center justify-center text-xl font-semibold text-gray-800">
                <div>Contacts</div>
                <div
                    onClick={()=>{
                        navigate('/conversation')
                    }}
                    className="w-[30px] h-[30px] border-2 border-gray-600 rounded-full flex justify-center items-center"
                >
                        <FiUserPlus/>
                    </div>
            </div>
            {contacts && contacts.map((contact)=>{
                return(<ContactCompo contactDetails={contact}/>)
            })}
        </div>
    );
}

export default ContactsPage;