
import {Button} from "../Components/Button"
import {Input} from "../Components/InputArea"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRef } from "react"

export  function Signup(){
    const navigate = useNavigate()
    const userRef = useRef<HTMLInputElement>(null)
    const passRef= useRef<HTMLInputElement>(null)


    async function sendData(){

        const username = userRef.current?.value
        const password = passRef.current?.value

        const url = 'http://localhost:3000/user/signup'
        const data = {username,password}
        
        try{
            const respo = await axios.post(url,data)
            if(respo){
                navigate('/Login')
            }

        }catch(err){
            console.log(err)
        }

        
        

    
       
        
    }


    return <>
    
    <div className='flex h-screen w-screen justify-center items-center bg-black text-white'>
       
        <div className="bg-[#ebe8e3] h-60 w-90 rounded-md ">
            <div className="text-black flex justify-center items-center font-bold text-3xl"> Signup</div>
            <Input palceholder="Enter Your Name" ref={userRef}/>
  
            <Input palceholder="Enter Your Password"  ref={passRef}/>
            <br />
            <Button text="Signup" size="sm" onClick={sendData}/>
        </div>

    </div>
    
    
    
    </>
}