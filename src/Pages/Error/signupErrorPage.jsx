import { useParams } from "react-router-dom";

function SignUpErrorPage (){ 
    const {msg} = useParams();
    return(
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">

            <div className="flex">
                <h1 className="text-red-400 text-xl">Login Error :</h1>
                <p className="text-red-600 text-2xl">....{msg}</p>
            </div>          

            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" 
                        onClick={() => window.location.replace('/signup')}>
                        Go to signup
                </button>
            </div>

        </div>
    )
}

export default SignUpErrorPage;