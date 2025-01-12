import { BiSolidMessageRoundedDots } from "react-icons/bi";
import ContactsPage from "./ContactsPage";
import { useNavigate } from "react-router-dom";

function MsgMainPage() {

    const navigate = useNavigate();
    return(
        <div className="w-[100%] h-[100%] flex items-center justify-between bg-[#fff] md:rounded-[45px]">
            <div className="w-[100%] rounded-none md:w-[32%] lg:w-[20%] h-[100%] md:rounded-[45px]">
                <ContactsPage/>
            </div>
            <div className="hidden md:flex md:w-[67%] lg:w-[79%] h-[100%] rounded-[45px] border-2 border-gray-300 flex flex-col items-center justify-center font-pacifico text-xl text-gray-400">
                
                <div className="absolute top-20 right-20 border-2 border-gray-300 rounded-xl p-2 bg-[#f5f5f5]">
                    <button 
                        onClick={()=>{
                            navigate('/home');
                        }}
                    >
                        Go Home
                    </button>
                </div>

                <div className="hidden md:block md:w-[100px] h-[100px] rounded-full mx-auto flex items-center justify-center text-4xl text-gray-600" >
                    <BiSolidMessageRoundedDots />
                </div>
                <div className="hidden md:block text-center">
                    <p>Message your friends, closers and family members here.......</p>
                    <p>Make your friends happy, family be more connected and stronger</p>
                </div>
                
            </div>
        </div>
    );
}

export default MsgMainPage;