function Button({text,type="submit",Disabled,onClickHandler}){
    return(        
        <button
            type={type}
            className="rounded-md w-[100%] h-[40px] bg-[#405cf5] text-[#fff] text-xl"
            disabled= {Disabled}
            onClick={onClickHandler}
        >
        {text}
        </button>
    )
}

export default Button;
