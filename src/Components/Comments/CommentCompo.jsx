import { changeDateFormat } from "../../Helpers/Others/DateFormat";

function CommentCompo({commentDetails}) {

    const dateTime = changeDateFormat(commentDetails.createdAt);
    return(
        <div className="w-[100%] min-h-[55px] bg-[#ffffff] rounded-xl border-b-2 border-gray-300 mb-1 p-2">            
            <div className="flex gap-2 items-center">
                <div className="text-xs font-semibold text-gray-500">{commentDetails.author?.firstName} {commentDetails.author?.lastName}</div>
                <div className="text-xs text-gray-400">{dateTime}</div>
            </div>
            <div className="text-sm text-slate-800">
                {commentDetails.text}
            </div>
        </div>
    )
}

export default CommentCompo;