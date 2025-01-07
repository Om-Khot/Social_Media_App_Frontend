import Slider from "react-slick";
import settings from "../../Helpers/Stories/storyHelper";
import { useContext } from "react";
import StoriesContext from "../../Context/Stories/StoriesContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import InstaLogo from "../../assets/instaLogo";
import MySvgComponent from "../../assets/instagramWord";
import { changeDateFormat } from "../../Helpers/Others/DateFormat";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";

function StorySlider(){

    const { stories } = useContext(StoriesContext); 
    
    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const innerSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      };

    return(
        <div className="w-[50vw] h-[80vh] mx-auto my-20">

            <div className="flex absolute top-10 left-20">
                <InstaLogo/>
                <MySvgComponent/>
                <div className="absolute top-12 left-[80px] text-2xl font-pacifico">Stories</div>
            </div>
            <div className="absolute top-10 right-20 px-4 py-2 rounded-xl bg-[#f5f5f5]">
                <Link to={'/home'}>
                    <button className="flex items-center gap-2">
                        <div><FaArrowLeft/></div> 
                        <div>Home</div>                    
                    </button>
                </Link>                
            </div>            
            <Slider {...settings}>
                {stories && stories.map((story,index)=>{
                    const dateTime = changeDateFormat(story.createdAt);
                    return(
                        <div key={index} className="w-[100%] h-[100%]">

                            <div className="flex gap-3 items-center">
                                <div className="text-sm text-gray-500">
                                    {story.author.firstName == loggedInUserDetails.firstName ? "You" : story.author.firstName } {story.author.lastName == loggedInUserDetails.lastName ? "" : story.author.lastName} 
                                </div>                                
                                <div className="text-xs text-gray-400">
                                    {dateTime}
                                </div>
                            </div>

                            <div className="px-auto py-5"> 

                            <Slider {...settings}>
                                {story.media.map((media,index)=>{
                                    return(
                                        <div key={index}>
                                            <div className="inline-block w-auto h-auto max-w-[100%] max-h-[400px] flex flex-col items-center justify-center">
                                                <img src={media.storyMedia} className="rounded-xl object-contain" />
                                            </div>

                                            <div className="mt-5 text-md w-auto h-auto flex flex-col items-center justify-center">
                                                <div>
                                                    {media.caption ? media.caption : ""}
                                                </div>                                
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>

                            </div>
                            
                            
                        </div>
                    )
                })}
            </Slider>        
        </div>
    )
}

export default StorySlider;