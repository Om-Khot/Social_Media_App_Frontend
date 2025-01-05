import { useNavigate, useParams } from "react-router-dom";
import { allMessages, sendMessage } from "../../Helpers/Auths/axiosFunctions";
import { useContext, useEffect, useState } from "react";
import ContactsPage from "./ContactsPage";
import MsgCompo from "../../Components/Message/MsgCompo";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import MsgContext from "../../Context/Messages/MsgContext";
import { MdKeyboardArrowLeft } from "react-icons/md";

function ChatPage(){

    const {conversationId} = useParams();

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const {messages} = useContext(MsgContext);
    const {setMessages} = useContext(MsgContext);

    const navigate = useNavigate();

    const [newMsg, setNewMsg] = useState("");

    async function fetchMessages(){
        try {
            const response = await allMessages(conversationId);
            console.log("messages are:",response.data.data);
            setMessages(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [conversationId]); 

    const onclickHandler = async () => {        
        try {
            const sms = {
                text: newMsg,
                conversationId: conversationId,
                senderId: loggedInUserDetails._id
            } 

            setNewMsg("");           
            const response = await sendMessage(sms);
            console.log("Successfully sent the message",response.data);
           
        } catch (error) {
            console.log(error);
            alert("Something went wrong please try again");
        }
    }

    return(
        <div className="w-full h-full p-1 border-2 border-gray-300 flex flex-col items-center bg-[#fff] rounded-[45px]">
            <div className="w-[100%] h-[100%] flex items-center justify-between bg-[#fff] rounded-[45px]">
                <div className="w-[20%] h-[100%] rounded-[45px]">
                    <ContactsPage/>
                </div>
                <div className="w-[79%] h-[100%] flex flex-col bg-[#fff] rounded-[45px]">                   
                    <div className="w-[100%] h-full border-2 border-gray-300 flex flex-col rounded-[45px] overflow-y-scroll  scrollbar-hide relative">
                        <div className="w-[109%] h-[10%] rounded-t-[45px] bg-slate-700 text-white px-10 text-md font-semibold text-gray-700 sticky top-[0px] z-10 mb-2">
                            <div>{messages[0]?.senderId.firstName == loggedInUserDetails.firstName ? messages[1]?.senderId.firstName : messages[0]?.senderId.firstName}</div>                         
                            <div>{messages[0]?.senderId.instaId == loggedInUserDetails.instaId ? messages[1]?.senderId.instaId : messages[0]?.senderId.instaId}</div>
                            <div className="absolute top-2 right-[150px]">
                                <button 
                                    onClick={()=>{
                                        navigate('/messages');
                                    }}
                                    className="text-white px-4 py-2 text-2xl rounded-md">
                                    <MdKeyboardArrowLeft />
                                </button>
                            </div>
                        </div>
                        {messages?.map((msg,index) => (
                                                <div
                                                    className={`flex ${msg.senderId._id == loggedInUserDetails._id ? 'justify-end' : 'justify-start'} w-full max-w-[100%]`}
                                                    key={index}
                                                >
                                                    <MsgCompo msgDetails={msg} />
                                                </div>
                                            ))}

                    </div>
                    <div className="w-[100%] h-[10%] flex items-center justify-between bg-[#fff] rounded-[45px] p-2">
                        <input 
                            type="text"
                            value={newMsg} 
                            placeholder="Type a message" 
                            className="w-[90%] h-[100%] border-2 border-gray-300 rounded-[45px] p-2"
                            onChange={(e) => setNewMsg(e.target.value)}
                            />
                        <button
                            onClick={onclickHandler} 
                            className="w-[10%] h-[100%] bg-[#4b5563] rounded-[45px] text-white"
                        >   
                            Send
                        </button>
                    </div>
                </div>
                                
            </div>
        </div>
    );
}

export default ChatPage;