import { useContext, useState } from "react";
import MySvgComponent from "../../assets/instagramWord";
import InstaLogo from "../../assets/instaLogo";
import { updateProfile } from "../../Helpers/Auths/axiosFunctions";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserDetailsCreatePage() {

    const {loggedInUserDetails} = useContext(LoggedinUserContext);

    const [preview, setPreview] = useState(null);
    const [image ,setImage] = useState(null);

    const [isLoadding,setIsLoadding] = useState(false);

    const navigate = useNavigate();

    const [updateProfileDetails, setUpdateProfileDetails] = useState({
        id : loggedInUserDetails._id,
        firstName : loggedInUserDetails.firstName,
        lastName : loggedInUserDetails.lastName,
        bio : loggedInUserDetails.bio ? loggedInUserDetails.bio : "",
        gender: loggedInUserDetails.gender ? loggedInUserDetails.gender : "Male",
    });

    const onChangeHandler = (e) => {
        const {name , value} = e.target;
        setUpdateProfileDetails({
            ...updateProfileDetails,
            [name] : value
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    };

    const onClickHandler = async() => {
        console.log("clicked");
        console.log(updateProfileDetails);

        const confirmation = confirm("Are you sure you want to update your profile?");
        if(!confirmation) return;

        setIsLoadding(true);

        const formData = new FormData();
        formData.append('prImage', image);
        formData.append('id', updateProfileDetails.id);
        formData.append('firstName', updateProfileDetails.firstName);
        formData.append('lastName', updateProfileDetails.lastName);
        formData.append('bio', updateProfileDetails.bio);
        formData.append('gender', updateProfileDetails.gender);        
        
        try {
            const response = await axios.post("http://localhost:3000/settings/profile", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Successfully updated the profile");
            alert("Successfully updated the profile");            
            navigate('/home');
            return response;
        } catch (error) {
            console.log(error);            
        }
        setIsLoadding(false);
    }


    return (
        <div className="w-[100%] h-[100%] px-10 py-4">

            {isLoadding && <div className="text-2xl font-bold text-gray-600 text-center">Wait for changes to be done..</div>}

            {!isLoadding && <div className="w-[100%] h-[100%] px-10 py-4">

                                <div className="text-2xl font-bold text-gray-600 flex items-center">
                                    <InstaLogo/>                
                                    <h1>Manage Your Profile</h1>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <h1 className="text-xl font-semibold text-gray-600">Change your First Name:</h1>
                                    <input
                                        type="text" 
                                        name="firstName"
                                        value={updateProfileDetails.firstName}
                                        className="w-[50%] h-[40px] mt-2 border-2 border-gray-300 rounded-[15px] px-2 py-2"
                                        onChange={onChangeHandler}
                                    />                                                    
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <h1 className="text-xl font-semibold text-gray-600">Change your Last Name:</h1>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={updateProfileDetails.lastName}
                                        className="w-[50%] h-[40px] mt-2 border-2 border-gray-300 rounded-[15px] px-2 py-2"
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="w-[45%] mt-8 flex items-center justify-between">
                                    <h1 className="text-xl font-semibold text-gray-600">Set your profile image:</h1>
                                    { image ? ( <div className="flex items-center gap-4">
                                                    <div className="w-[120px] h-[120px]">
                                                        {preview && <img 
                                                                        className="w-[100%] h-[100%] object-cover border-2 rounded-full" 
                                                                        src={preview} alt="Preview" />
                                                                    }
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
                                                            className="flex flex-col items-center justify-center w-[120px] h-[120px] border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-gray-400"
                                                        >
                                                        <input
                                                            type="file"
                                                            accept="image/*,video/*"
                                                            className="hidden"
                                                            onChange={handleImageChange}
                                                        />
                                                        <span className="text-gray-500 text-center hover:text-gray-700">Click to upload image</span>
                                                        </label>                                         
                                                    )
                                                                
                                    }                           
                                </div>

                                <div className="mt-8 flex items-center gap-[124px]">
                                    <h1 className="text-xl font-semibold text-gray-600">Set your bio:</h1>
                                    <input 
                                        type="text" 
                                        name="bio"
                                        value={updateProfileDetails.bio}
                                        className="w-[50%] h-[80px] mt-2 border-2 border-gray-300 rounded-[15px] px-2 py-2"
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="mt-8 flex items-center gap-[86px]">
                                    <h1 className="text-xl font-semibold text-gray-600">Set your gender:</h1>
                                    <div>
                                        <select 
                                            className="w-[100%] h-[40px] mt-2 border-2 border-gray-300 rounded-[15px] px-2 py-2"
                                            name="gender"
                                            value={updateProfileDetails.gender}
                                            onChange={onChangeHandler}
                                        >
                                            <option value="Male">Male</option>  
                                            <option value="Female">Female</option>  
                                            <option value="Other">Other</option>  
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <button 
                                        onClick={onClickHandler}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >Save Changes
                                    </button>

                                    <Link to={'/settings'}>
                                        <button className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4">
                                            Back
                                        </button>
                                    </Link>
                                    
                                </div>

                            </div>
            }
                        
            
        </div>
    )
}

export default UserDetailsCreatePage;