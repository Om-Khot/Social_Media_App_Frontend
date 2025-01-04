import { useContext, useState } from "react";
import MySvgComponent from "../../assets/instagramWord";
import InstaLogo from "../../assets/instaLogo";
import InputFeild from "../../Components/Inputs/InputCompo";
import Button from "../../Components/Buttons/ButtonCompo";
import { useNavigate } from "react-router-dom";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import { deleteAccount, loginUser } from "../../Helpers/Auths/axiosFunctions";

function DeleteUserAuthPage () {
    console.log("Delete account page");

    const {loggedInUserDetails} = useContext(LoggedinUserContext);
    
    const [formData,setFormData] = useState({
        email : "",
        password : ""
    }); 
    
    const onChangeHandler = (e)=>{
        const {name , value} = e.target
        setFormData({
            ...formData,
            [name] : value
        });
        console.log(formData);
    }

    const navigate = useNavigate();

    const onSubmitHandler = async (e) =>{
        e.preventDefault();

        if(formData.email == "" || formData.password == "") {
            alert("Please fill all the fields");
            return;
        }

        try {
            console.log("Trying to submit form");
            const res = await loginUser(formData);

            if(!res){
                console.log("Login failed");
                alert("Your email or password is incorrect");
                return;
            }

            const response = await deleteAccount(loggedInUserDetails._id);
            console.log("Response is :",response.data);
            console.log("Delete account successfull");

            navigate(`/`);
        } catch (error) {
            console.log("Login error",error.response.data.message);
            const msg = error.response.data.message;
            navigate(`/error/auth/login/${msg}`);
        }
    }
    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
            <div className="mx-auto my-10 shadow-md shadow-gray-600 border-slate-400 border-l-2 border-b-2 rounded-2xl sm: w-[80vw] h-[80vh]  md:w-[30vw] h-[70vh]">
                
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div>
                            <InstaLogo/>
                        </div>
                        <div>
                            <MySvgComponent/>
                        </div>
                    </div>
                    
                    <div>
                        <h1 className="text-2xl w-full h-[5vh] flex justify-center items-center underline underline-offset-[18px]">
                            Delete Your Account
                        </h1>
                    </div>
                    
                </div>
                
                <div className="w-[100%] mt-[55px] flex justify-center">
                    <InputFeild 
                        type={"email"} 
                        name={"email"}
                        value={formData.email}
                        placeholder={"Enter your email here"} 
                        onChangeHandler={onChangeHandler}
                        isReq={true}/>
                </div>
            
                <div className="mt-10 flex justify-center">
                    <InputFeild 
                        type={"password"} 
                        name={"password"}
                        value={formData.password}
                        placeholder={"Enter your password here"} 
                        onChangeHandler={onChangeHandler}
                        isReq={true}/>                
                </div>

                <div className="w-[100%] flex justify-center mt-[75px]">
                    <div className="w-[60%] h-[40px]">
                        <button 
                            className="w-[100%] h-[100%] bg-red-500 text-[#fff] px-4 py-2 rounded-md"
                            text={"Delete Account"}
                            type={"submit"}
                            Disabled={false}
                            onClick={onSubmitHandler}
                        >
                            Delete Account
                        </button>
                    </div>
                    
                </div>

                <div className="mt-2 flex justify-center">
                    <p className="text-sm text-blue-500">Forget password?</p>
                </div>                        
                
            </div>
        </div>
    )
}

export default DeleteUserAuthPage;