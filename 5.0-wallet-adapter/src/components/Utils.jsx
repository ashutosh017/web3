
import {  forwardRef } from "react"

// export function Input({placeholder,ref,type}){
//     return <input
//     ref={ref}
//     type={type||"text"}
//     placeholder={placeholder}
//     className="px-2 py-1 border border-gray-400 rounded-md mr-2 text-black" 
//     />
// }
export const Input = forwardRef((props, ref)=>{
    return  <input
        ref={ref}
        type={props.type||"text"}
        placeholder={props.placeholder}
        className="px-2 py-1 border border-gray-400 rounded-md  m-1 text-black" 
        />
})
export function Button({onclick,children}){
    return <button
    onClick={onclick}
          className="border px-2 py-1 border-gray-400 rounded-md m-1 "
    >{children}</button>
}
