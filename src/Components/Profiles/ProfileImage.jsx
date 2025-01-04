import { LuUserRound } from "react-icons/lu";

function ProfileImage({imgurl}){
    return(
        <div className="w-[100%] h-[100%] bg-gray-200 rounded-full flex justify-center items-center">
            
                {!imgurl && <LuUserRound className="w-[100%] h-[100%] border-2 rounded-full flex justify-center"/>}
                {imgurl && <img className="w-[100%] h-[100%] border-2 rounded-full flex justify-center items-center" src={imgurl}/>}            
                       
        </div>      
        
    )
}

export default ProfileImage;