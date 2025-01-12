import { useContext, useState } from "react";
import Button from "../../Components/Buttons/ButtonCompo";
import InputFeild from "../../Components/Inputs/InputCompo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auths/AuthContext";
import { loginUser } from "../../Helpers/Auths/axiosFunctions";
import UserdetailsContext from "../../Context/User/UserdetailsContext";
import LoggedinUserContext from "../../Context/User/LoggedinUserContext";
import InstaLogo from "../../assets/instaLogo";
import MySvgComponent from "../../assets/instagramWord";
import LoginBackground from "../../assets/loginBackground";

function LoginCard({title}){
    console.log("Login page");

    const [formData,setFormData] = useState({
        email : "",
        password : ""
    }); 

    const {setIsLoogedIn} = useContext(AuthContext);
    const {setUserDetails} = useContext(UserdetailsContext);
    const {setLoggedInUserDetails} = useContext(LoggedinUserContext);

    const [token,setToken] = useState('');

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

        try {
            console.log("Trying to submit form");

            const response = await loginUser(formData);

            setToken(response.data.token);
            setLoggedInUserDetails(response.data.info);
            setUserDetails(response.data.info);
            
            console.log("Login successfull",response.data);
            setIsLoogedIn(true);

            navigate(`/home`);
        } catch (error) {
            console.log("Login error",error.response.data.message);
            const msg = error.response.data.message;
            navigate(`/error/auth/login/${msg}`);
        }
    }

    return(
        <div className="w-[100%] h-[100%] flex justify-center items-center">     
            <div className="hidden md:block md:w-[60vw] h-[80%] lg:w-[50vw] h-[100%]">
                <LoginBackground/>
            </div>   
            <div className="mx-auto my-10 shadow-md shadow-gray-600 border-slate-400 border-l-2 border-b-2 rounded-2xl sm: w-[80vw] h-[80vh]  md:w-[40vw] h-[70vh] lg:w-[30vw]">
                
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
                            {title}
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
                    <div className="w-[60%]">
                        <Button 
                            text={"Login"}
                            type={"submit"}
                            Disabled={false}
                            onClickHandler={onSubmitHandler}
                        />
                    </div>
                    
                </div>

                <div className="mt-2 flex justify-center">
                    <p className="text-sm text-blue-500">Forget password?</p>
                </div>

                <Link to={'/signup'}>
                    <div className="flex justify-center">
                        <p className="text-sm text-blue-500">Don't have an account? Create one!</p>                
                    </div>
                </Link>
                        
                
            </div>
        </div>
    );
}

export default LoginCard;