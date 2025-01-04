import { FaSearch } from "react-icons/fa";

function SearchCompo({onSubmitHandler,onChangeHandler}) {
    return(
        <div className="w-[100%] h-[100%] flex justify-center gap-2 items-center">
            <FaSearch className="text-gray-400 text-xl" />
            <input
                type="search"
                placeholder="Search"
                onChange={onChangeHandler}
                onClick={onSubmitHandler}
                className="w-[100%] h-[100%] py-2 px-4 border-[#f5f5f5] border-b-2  rounded-full px-2"
            />
        </div>
    )
}

export default SearchCompo;