function InputFeild({type,name,value,placeholder,isReq,onChangeHandler}){
    return(
     <div>
         <input
             type={type}
             name={name}
             value={value}
             required={isReq}
             placeholder={placeholder}
             onChange={onChangeHandler}
             className="w-[100%] h-[55px] border-slate-400 border-b-2 rounded-md px-2 md:w-[25vw]"
         />
     </div>
    )
 }
 
 export default InputFeild;