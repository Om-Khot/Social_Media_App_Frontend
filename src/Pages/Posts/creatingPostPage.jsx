import { useContext, useState } from "react";
import MySvgComponent from "../../assets/instagramWord";
import InstaLogo from "../../assets/instaLogo";
import ProfilePage from "../Users/ProfilePage";
import UserdetailsContext from "../../Context/User/UserdetailsContext";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../Components/Buttons/LoaderButton";


function CreatePostPage(){
    const {setUserDetails} = useContext(UserdetailsContext);
    const {userDetails} = useContext(UserdetailsContext);
    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    setUserDetails(loggedInUserDetails);

    const navigate = useNavigate();
    
    const [image ,setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption ,setCaption] = useState('');

    const [isLoadding,setIsLoadding] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const onSubmitPost = async(e) => {
        const confirm = window.confirm("Are you sure you want to post this image");
        if(confirm == false) return;
        const formData = new FormData();
        formData.append('img', image);
        formData.append('caption', caption);
        formData.append('author', userDetails._id);
        
        setIsLoadding(true);
        try{
            setCaption('');
            const response = await axios.post('http://localhost:3000/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsLoadding(false);
            console.log("Successfully uploaded the new post");
            console.log("respose",response.data.data);
            navigate('/home');
            return response;
        }catch(error){
            console.log(error);
        }      
        
    }

    return(
        <div className="w-[100%] h-[100%] flex">

            <div className="w-[20%] flex-cols">
                <div className="w-[100%] h-[10%] flex">
                    <InstaLogo/>
                    <MySvgComponent/>
                </div>
                <div className="w-[100%] h-[85%] flex-cols justify-center items-center">
                    <ProfilePage followers={23} following={500}/>
                </div>                
            </div>    

            <div className="w-[80%] h-[100%] bg-[#f5f5f5] rounded-[45px] border-2 px-8 py-5">
                
                <div className="mb-8">
                    <h1 className="w-[100%] h-[10%] text-2xl font-bold text-gray-500">Create Your New Post</h1>
                </div>

                {
                    !isLoadding &&  <div className="mb-5">
                                        { image ? (
                                                    <div>
                                                        <div className="w-[100%] h-64">
                                                            {preview && <img className="w-[100%] h-[100%] object-contain border-2 rounded-md" src={preview} alt="Preview" />}
                                                        </div>                                    
                                                        <button
                                                            onClick={() => setImage('')}
                                                            className="mt-5 text-gray-500 hover:text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2"
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                    
                                                ) : (   
                                                        <label
                                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                                                        >
                                                            <input
                                                                type="file"
                                                                name="img"
                                                                accept="image/*,video/*"
                                                                className="hidden"
                                                                onChange={handleImageChange}
                                                            />
                                                            <span className="text-gray-500">Click to upload image/video</span>
                                                        </label>
                                                        
                                                        
                                                    )
                                            
                                        }  

                                    </div>
                }
                
                {!isLoadding && <div className="w-[70%] h-[35%] flex gap-5 ">
                                    <input
                                        type="text"
                                        placeholder="Caption for your post"
                                        onChange={handleCaptionChange}
                                        className="w-[80%] h-[55px] border-slate-400 border-2 rounded-md px-4"
                                    />
                                    <button
                                        onClick={onSubmitPost}
                                        className="w-[20%] h-[55px] border-slate-400 border-2 rounded-md px-2"
                                    >
                                        Post
                                    </button>
                                </div>
                }

                {isLoadding &&  <div className="w-[70%] h-[35%] flex gap-5 justify-center items-center">
                                    <div>Uploading your post...</div>
                                    <div><LoaderButton/></div>
                                </div>
                }       
                

            </div>
        
        </div>
                        
                   
    )
}

export default CreatePostPage;