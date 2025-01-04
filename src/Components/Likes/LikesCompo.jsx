
function LikesCompo({likeDetails}) {
    return(
        <div className="w-[100%] h-[55px] bg-[#ffffff] rounded-xl border-b-2 border-gray-300 mb-2 p-2">
            <div className="flex gap-2 items-center">
                <img src={likeDetails.profileImage} alt="profile" className="w-[35px] h-[35px] rounded-full"/>
                <div className="flex flex-col ">
                    <div className="text-xs text-gray-500">{likeDetails.firstName} {likeDetails.lastName}</div>
                    <div className="text-md font-semibold text-gray-800">{likeDetails.instaId}</div>
                </div>
                
            </div>
        </div>
    );
}

export default LikesCompo;