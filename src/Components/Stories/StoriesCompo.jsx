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
        <div className="w-[37%] h-[93%] md:w-[9%] md:h-[90%] flex flex-col cursor-pointer" onClick={onClickHandler}>
            <div className="w-[80%] h-[80%]">
                <img src={storyDetails.author.profileImage} alt="profile" className="w-[100%] h-[100%] rounded-full border-2 border-gray-300 object-cover" />
            </div>
            <div className="w-[80%] flex items-center justify-center h-[20%] overflow-hidden">
                <div className="text-sm text-gray-500">{storyDetails.author.firstName == loggedInUserDetails.firstName ? "You" : storyDetails.author.firstName}</div>
            </div>
        </div>
    )
}

export default StoriesCompo