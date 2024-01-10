"use client"
import Header from "@/components/Navbar/HeaderBackNav"
import { useEffect, useState } from "react"

function Detail() {
    const [detail,setDetail] = useState("")
    useEffect(()=>{
        setDetail(JSON.parse(sessionStorage.getItem("suggestion")))
    },[])
  return (
    <div>
        <div onClick={()=>sessionStorage.removeItem("suggestion")}>
        <Header route={`view-suggestion`}/>
        </div>
        {detail?.suggestion}
    </div>
  )
}

export default Detail