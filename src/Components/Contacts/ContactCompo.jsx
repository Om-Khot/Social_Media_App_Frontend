import { useContext } from "react";
import { Link } from "react-router-dom";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function ContactCompo({contactDetails}) {

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    return(
        <div className="w-[95%] h-[55px] bg-[#ffffff] rounded-xl border-b-2 border-gray-600 mt-2 mb-2 p-2 flex gap-2 rounded-xl items-center ">
            {/* <img src={contactDetails.profileImage} alt="profile" className="w-[35px] h-[35px] rounded-[45px] "/> */}
            <Link to={`/messages/${contactDetails._id}`}>
                <div className="flex flex-col ">
                    {/* <div className="text-xs text-slate-800 rounded-[45px]">{contactDetails._id}</div> */}
                    <div className="text-md font-semibold text-gray-800">
                        {contactDetails.members.map((mem) => {
                            if(loggedInUserDetails._id != mem._id) return(
                                <div className="flex items-center gap-2">
                                    <div><img src={mem.profileImage} alt="profile" className="w-[35px] h-[35px] rounded-full "/></div>
                                    <div className="flex flex-col">
                                        <div>{mem.instaId}</div>
                                        <div className="text-xs font-normal">{mem.firstName} {mem.lastName}</div>
                                    </div>
                                </div>                                
                            );
                        })}
                    </div>
                </div>
            </Link>
           
            
        </div>
    );
}

export default ContactCompo;