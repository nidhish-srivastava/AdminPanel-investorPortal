"use client"
import Button from "@/components/Button"
import Header from "@/components/Navbar/HeaderBackNav"
import SelectInvestor from "@/components/SelectInvestor"
import { db } from "@/utils/firebase"
import { deleteUser, getAuth } from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

function DeleteAccountOfInvestor() {
  const auth = getAuth()
  const [investors,setInvestors] = useState([])
  const [selectedInvestorDropDownState,setSelectedInvestorDropDownState] = useState({})
  const [selectedInvestorDetail,setSelectedInvestorDetail] = useState({})
  const [isInvestorSelected,setIsInvestorSelected] = useState(false)

  const selectedInvestorDetailHandler = () =>{
    const res = investors.find(e=>e.id==selectedInvestorDropDownState)
    setSelectedInvestorDetail(res)
  }
  const deleteInvestorAccountHandler = async() =>{
    if(selectedInvestorDetail==undefined) return toast.error("Select Investor")
    alert("This will delete all the Investor data")
    try {
      // const response = await deleteDoc(doc(db,`users/${selectedInvestorDetail?.id}`))
      //* deleting user from authentication(not getting code)
      // await getAuth().deleteUser(uid)
      await deleteUser(auth,selectedInvestorDetail?.uid)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    selectedInvestorDetailHandler()
    if(selectedInvestorDetail?.fullName?.length>1) setIsInvestorSelected(true)
    else setIsInvestorSelected(false)
  },[selectedInvestorDropDownState,selectedInvestorDetail])

  return (
    <>
    <Toaster/>
    <Header/>
    <h3 className="heading-style-1">Delete Investor's Account</h3>
    <div className="w-[70%] mx-auto mt-12 gap-12">
    <SelectInvestor investors={investors} setInvestors={setInvestors} selectedInvestorDropDownState={selectedInvestorDropDownState} setSelectedInvestorDropDownState={setSelectedInvestorDropDownState}/>
    </div>
    <div className="w-[80%] mx-auto mt-6">
      {
        isInvestorSelected ? <div className="flex flex-col gap-4 items-start">
          <h3 className="heading-style-1">Investor Details</h3>
          <h2>Full Name : <b>{selectedInvestorDetail?.fullName}</b></h2>
          <h2>Email : <b>{selectedInvestorDetail?.email}</b></h2>
          <h2>Firebase uid : <b>{selectedInvestorDetail?.uid}</b></h2>
        </div> : null
      }
    </div>
    <div className="text-center">
    <Button onClick={deleteInvestorAccountHandler} className={`w-[40%] mt-12`}>Delete account</Button>
    </div>
    </>
  )
}

export default DeleteAccountOfInvestor