
import {Button} from "../Components/Button"
import {Input} from "../Components/InputArea"
import { useNavigate } from "react-router-dom"
import { useRef } from "react";
import axios from "axios";

export function Login(){
    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

   
   




    const navi = useNavigate();
    async function logdata(){
        const username = userRef.current?.value
        const password = passRef.current?.value
        const url = 'http://localhost:3000/user/login'
        const data = {username,password}
        try{
            const respo = await axios.post(url,data)
            const token = respo.data
            //@ts-ignore
            localStorage.setItem('token',token)
            navi('/dashboard')
        }catch(err){
            console.log(err)

        }


        
        
    }


    return <>
    
    <div className='flex h-screen w-screen justify-center items-center bg-black text-white'>
       
        <div className="bg-[#ebe8e3] h-60 w-90 rounded-md ">
            <div className="text-black flex justify-center items-center font-bold text-3xl">Login</div>
            <Input ref={userRef} palceholder="Enter Your Name"/>
  
            <Input ref={passRef}  palceholder="Enter Your Password"/>
            <br />
            <Button text="Login" size="sm" onClick={logdata}/>
        </div>

    </div>
    
    
    
    </>
}