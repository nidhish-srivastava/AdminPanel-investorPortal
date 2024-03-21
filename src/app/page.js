"use client"
import Button from "@/components/Button"
import Home from "@/components/Home"
import { useEffect, useState } from "react"

function page() {
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const authenticateAdmin = () => {
        if(password=="RigGroup@Password123"){
          setLoggedIn(true)
          localStorage.setItem("adminLogIn",true)
        }
  }

  useEffect(() => {
    const check = () =>{
      const check = localStorage.getItem("adminLogIn")
      if(check=="true") setLoggedIn(true)
    }
    check()
  },[])
  return (
    <>
      {!loggedIn ? <div className="mt-12 flex flex-col items-center gap-12">
        <h1 className="text-indigo-700 text-center text-[25px] not-italic font-bold">Admin Panel Login</h1>
        <input className="w-[90%] mx-auto" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
        <Button onClick={authenticateAdmin}>Login</Button>
      </div> :
        <Home />
      }
    </>
  )
}

export default page