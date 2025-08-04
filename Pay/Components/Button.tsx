
interface ButtonProp {
    text:string,
    size: 'sm'| 'md'| 'lg',
    onClick:()=>void
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-6 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",

}



export function Button(props:ButtonProp){
    const {text,size,onClick} = props
    return <>
<div>
<div onClick={onClick}
  className={`${sizeStyles[size]} 
              font-mono 
              flex
              
              justify-center
              cursor-pointer 
              ml-1 
              text-green-300 
              bg-green-900 
              border 
              border-green-400 
              hover:bg-green-600 
              shadow-md 
              hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.8)] 
              transition 
              duration-200 
              rounded-md 
              px-2 
              py-1`}>
  {text}
</div>
</div>
    
    </>
}