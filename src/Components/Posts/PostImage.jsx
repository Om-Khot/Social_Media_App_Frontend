function PostImage({imgLink}){
    return(
        <div className="w-[100%] h-[100%]">
            <img src={imgLink} alt="Post Image" className="w-auto h-auto border-gray-800 rounded-xl max-w-[300px] max-h-[350px] object-contain"/>
        </div>
    );
}

export default PostImage;