import { useParams } from "react-router-dom";

function ErrorPage(){
    const {msg} = useParams();
    return(
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
            {msg && <p className="text-red-600 text-2xl">....{msg}</p>}
            {!msg && <p className="text-red-600 text-2xl">....Something went wrong</p>}
        </div>
    );
}

export default ErrorPage;