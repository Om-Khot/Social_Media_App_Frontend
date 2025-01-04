import socialMedia from "./socialMedia.webp";
function LoginBackground(){ 
    return(
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
            <img src={socialMedia} className="w-[100%] h-[100%] rounded-[45px]"/>
        </div>
    );
}

export default LoginBackground;