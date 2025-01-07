import { useContext, useState } from "react";
import StoriesContext from "../../Context/Stories/StoriesContext";
import { fetchAllStories } from "../../Helpers/Auths/axiosFunctions";
import { useEffect } from "react";
import StoriesCompo from "../../Components/Stories/StoriesCompo";

function DisplayStories() {

    const { stories } = useContext(StoriesContext);
    const { setStories } = useContext(StoriesContext);

    

    async function getStories() {
        const response = await fetchAllStories();
        const responseData = await response.data.data;
        console.log("stories responseData is", responseData);
        setStories(responseData);
        console.log("stories are", stories);
    }

    useEffect(() => {
        getStories();
    }, []);

    return(
        <div className="w-[100%] h-[100%] flex items-center justify-start">
            {stories && stories.map((story,index)=><StoriesCompo key={index} storyDetails={story}/>)
                                   
            }
        </div>
    )
}

export default DisplayStories;