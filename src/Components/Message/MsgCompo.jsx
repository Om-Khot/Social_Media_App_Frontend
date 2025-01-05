import { useContext } from "react";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { changeDateFormat } from "../../Helpers/Others/DateFormat";

function MsgCompo({msgDetails}) {
    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    const dateTime = changeDateFormat(msgDetails.createdAt);
    const bgColor = msgDetails.senderId._id === loggedInUserDetails._id ? 'bg-amber-50' : 'bg-neutral-200';

    return(
        <div className={`inline-block h-auto w-auto rounded-xl border-b-2 border-gray-300 mb-5 mx-2 p-2 flex flex-col gap-2 ${bgColor} `}>
            <div className="flex gap-2 items-center mb-2">
                <div>
                    <img src={msgDetails.senderId.profileImage} alt="profile" className="w-[35px] h-[35px] rounded-full "/>
                </div>
                <div className="text-xs text-slate-800">
                    {msgDetails.senderId.firstName == loggedInUserDetails.firstName ? "You" : msgDetails.senderId.firstName} {msgDetails.senderId.lastName == loggedInUserDetails.lastName ? "" : msgDetails.senderId.lastName}
                </div>
                <div className="text-xs text-gray-400">
                    {dateTime}
                </div>
            </div>
            <div className="text-sm text-slate-800 px-5">
                {msgDetails.text}   
            </div>
        </div>
    );
}

export default MsgCompo;