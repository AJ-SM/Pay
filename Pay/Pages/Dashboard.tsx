
import {Button} from "../Components/Button"
import {Input} from "../Components/InputArea"

import axios from "axios"
import { useRef } from "react"

export function Dashboard(){
    const userRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);


    async function send(){
        const username = userRef.current?.value
        const amount = amountRef.current?.value
        const data = {username,amount}
        console.log(data)

        

        const url = " http://localhost:3000/user/send"
        try{
            const respo = await axios.post(url,data)
            console.log(respo.data)

        }catch(err){
            console.log(err)

        }



        
    
    }

    return <>
    <div className=" flex justify-center items-center w-screen h-screen bg-black text-white">
        <div className=" flex w-200 h-140 text-black p-7 border-2  bg-white rounded-md">
            <div className=" font-medium text-xl"> Balance: </div>
            <div className="p-17">
            <Input ref={userRef} palceholder="Enter Your username"/>
            <Input ref={amountRef} palceholder="Enter Your Amount "/>
            <br />
            <Button text="Send" size="md" onClick={send}/>
            </div>
        </div>

    </div>

    
    </>
}