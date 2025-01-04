import { useEffect, useState } from "react";
import Button from "../../Components/Buttons/ButtonCompo";
import InputFeild from "../../Components/Inputs/InputCompo";
import { Link } from "react-router-dom";
import { signupUser } from "../../Helpers/Auths/axiosFunctions";
import { useNavigate } from "react-router-dom";
import InstaLogo from "../../assets/instaLogo";
import MySvgComponent from "../../assets/instagramWord";
import LoginBackground from "../../assets/loginBackground";

function SignUpCard({title}){

    const [pageNo,setPageNo] = useState(0);

    const [formData,setFormData] = useState({
        firstName : "",
        lastName : "",
        instaId: "",
        email: "",
        password: "",
        confirmPass: ""
    });

    useEffect(()=>{

    },[pageNo]);

    function changePage(){
        if(pageNo == 0) setPageNo(1);
        else setPageNo(0);
    }

    const handleChange = (e)=>{
        const {name , value} = e.target;
        setFormData({...formData, [name] : value});
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        // alert("Do you want to submit the form");
        e.preventDefault();
        try {
            if(formData.instaId == "" || formData.password == "" || formData.confirmPass == "" || formData.email == "" || formData.firstName == "" || formData.lastName == "") {
                alert("Please fill all the fields");
                return;
            };
            if(formData.password != formData.confirmPass){
                alert("Passwords do not match");
                return;
            }
            
            const response = await signupUser(formData);
            console.log("Response is :",response.data);
            const msg = "Successfully created an account";
            navigate(`/`);
        } catch (error) {
            console.error('Registration Error:', error.response.data.message);
            const msg = error.response.data.message;
            navigate(`/error/auth/signup/${msg}`);
        }
    }

    return(
        <div className="w-[100%] h-[100%] flex">  
        <div className="w-[65vw] h-[100%]">
                <LoginBackground/>
        </div>      
        <div className="shadow-md shadow-gray-600 border-slate-400 border-l-2 border-b-2 rounded-2xl mx-auto my-10 sm: w-[80vw] h-[80vh]  md:w-[30vw] h-[70vh]">
            <div className="flex flex-col justify-center">
                <div className="flex justify-center items-center">
                    <div>
                        <InstaLogo/>
                    </div>
                    <div>
                        <MySvgComponent/>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl w-full h-[10vh] flex justify-center items-center underline underline-offset-[18px]">
                        {title}
                    </h1>
                </div>
            </div>
            
            {pageNo == 0 && <div className="mt-10 flex justify-center">
                                <InputFeild 
                                    type={"text"}
                                    name={"firstName"} 
                                    value={formData.firstName}  
                                    placeholder={"First Name"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />
                            </div>
            }
            
            {pageNo == 0 && <div className="mt-5 flex justify-center">
                                <InputFeild type={"text"} 
                                    name={"lastName"} 
                                    value={formData.lastName}  
                                    placeholder={"Last Name"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />
                            </div> 
            }
            {pageNo == 0 && <div className="mt-5 flex justify-center">
                                <InputFeild type={"text"} 
                                    name={"instaId"} 
                                    value={formData.instaId}  
                                    placeholder={"Unique Insta Id"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />
                            </div> 
            }
            
            {pageNo == 1 && <div className="mt-10 flex justify-center">
                                <InputFeild 
                                    type={"email"} 
                                    name={"email"} 
                                    value={formData.email} 
                                    placeholder={"Email"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />
                            </div>
            }         
            
            {pageNo == 1 && <div className="mt-5 flex justify-center">
                                <InputFeild 
                                    type={"password"} 
                                    name={"password"} 
                                    value={formData.password} 
                                    placeholder={"Password"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />                
                            </div>
            }
            
            {pageNo == 1 && <div className="mt-5 flex justify-center">
                                <InputFeild 
                                    type={"password"} 
                                    name={"confirmPass"} 
                                    value={formData.confirmPass} 
                                    placeholder={"Confirm password"} 
                                    isReq={true}
                                    onChangeHandler={handleChange}
                                    />                
                            </div>
            }            

            <div className="w-[100%] flex justify-center gap-5 mt-10 px-2">
                <div className="w-[40%] mt-2">
                    <Button 
                        text={pageNo == 0 ? "Next" : "Prev"}
                        onClickHandler={changePage}
                    />                
                </div>
                {pageNo == 1 &&  <div className="w-[60%] mt-2">
                    <Button 
                        type={"submit"}
                        Disabled={pageNo == 0}
                        text={"Sign Up"}
                        onClickHandler={handleSubmit}
                    />
                </div> }
                
            </div>

            {pageNo == 0 && <Link to={'/'}>
                                <p className="text-sm text-blue-500 mt-2 flex justify-center">
                                    Already have account ? sign in here
                                </p>
                            </Link>
                            
            }               
            
        </div>
        </div>
    )
}

export default SignUpCard;