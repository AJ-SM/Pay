

interface inputProps{

    palceholder:string,
   
    ref?:any
    
    
}

export function Input(props:inputProps){
    const{palceholder,ref} = props
    return <>
    <div>
        <input ref={ref} type="text"  className="ml-5 m-3 bg-slate-400 text-black w-80 mt-5 rounded-sm flex justify-center px-1 py-2   " placeholder={palceholder} />
    </div>
    
    </>
}