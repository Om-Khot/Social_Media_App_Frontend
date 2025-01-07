import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function StoriesCompo({storyDetails}) {

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/stories`);
    }

    return (
        <div className="w-[120px] h-[120px]  flex flex-col items-center justify-center" onClick={onClickHandler}>
            <div className="w-[100px] h-[100px] rounded-full">
                <img src={storyDetails.author.profileImage} alt="profile" className="w-[100%] h-[100%] rounded-full border-2 border-gray-300 object-cover" />
            </div>
            <div className="flex flex-col items-center w-[100%] h-[20px] p-1">
                <div className="text-sm text-gray-500">{storyDetails.author.firstName == loggedInUserDetails.firstName ? "You" : storyDetails.author.firstName} {storyDetails.author.lastName == loggedInUserDetails.lastName ? "" : storyDetails.author.lastName}</div>
            </div>
        </div>
    )
}

export default StoriesCompo