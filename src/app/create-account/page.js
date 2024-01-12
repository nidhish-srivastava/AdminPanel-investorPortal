"use client"
import Button from "@/components/Button"
import { db } from "@/utils/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import toast, { LoaderIcon, Toaster } from "react-hot-toast"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Header from "@/components/Navbar/HeaderBackNav"

function CreateAccount() {
    const usersCollectionRef = collection(db,"users")
    const [loading,setLoading] = useState(false)
    const [investorDetails, setInvestorDetails] = useState({
        email: "",
        password: "",
        fullName: "",
        number : ""
    })
    const changeHandler = (e) => {
        const { name, value } = e.target
        setInvestorDetails((prev) => ({ ...prev, [name]: value }))
    }


    const createAccHandler = async()=>{
        if(investorDetails.email?.length==0){
           return toast.error("Enter email")
        }
        if(investorDetails.password.length==0){
           return toast.error("Enter Password")
        }
        if(investorDetails.password.length<6){
           toast.error("Password should be of 6 digits or more")
           return
        }
        if(investorDetails.number.length==0){
            toast.error("Enter phone number")
            return
        }
        setLoading(true)
        try {
            const {email,fullName,password,number} = investorDetails
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const userId = response?.user?.uid
            if (userId?.length > 1) {
                try {
                    const res = await addDoc(usersCollectionRef,{email,fullName,phoneNumber : number,uid : userId,isBanned:false,verified:true})
                    if(res.id!=null){
                        toast.success("Account created successfully")
                        setLoading(false)
                        setInvestorDetails({fullName:"",password:"",email:"",number : ""})
                    }
                } catch (error) {
             toast.error("Error while creating acc,Check credentials properly")    
                    setLoading(false)
                }
            }
            
        } catch (error) {
             toast.error("Error while creating acc,Check credentials properly")    
             setLoading(false)
        }
    }

    return (
        <>
        <Header route={`create`}/>
            <Toaster/>
            <h3 className="heading-style-1">Create Account for Investor</h3>
            <div className="w-[90%] mx-auto flex flex-col gap-12 mt-12 mb-4">
                <div>
                    <label htmlFor="email" className="create-acc-label">Enter email</label>
                    <input autoFocus={true} name="email" required type="email" placeholder="Enter Email" value={investorDetails.email} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="password" className="create-acc-label">Enter Password</label>
                    <input name="password" required type="text" placeholder="Create Password" value={investorDetails.password} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="name" className="create-acc-label">Enter Investor's Name</label>
                    <input type="text" placeholder="Name..." name="fullName" value={investorDetails.fullName} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="number" className="create-acc-label">Enter Investor's Phone Number</label>
                    <input type="tel" placeholder="Phone Number" name="number" value={investorDetails.number} onChange={changeHandler} />
                </div>
                {/* <div>
                    <label htmlFor="" className="create-acc-label">Enter Investment Amount</label>
                    <input type="text" placeholder="amount" />
                </div>
                <div>
                    <label htmlFor="" className="create-acc-label">Enter Project Name</label>
                    <input type="text" name="" id="" placeholder="projectName" />
                </div> */}
            <Button className={`btn border-none ${loading ? "opacity-80" : ""}`} onClick={createAccHandler}>
            {loading ? <div className="loader">
            <LoaderIcon/> Creating
          </div> : "Create Account"}
            </Button>
            </div>

        </>
    )
}

export default CreateAccount