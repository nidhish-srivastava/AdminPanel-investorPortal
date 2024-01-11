"use client"
import InvestorCard from "@/components/InvestorCard"
import BottomNavBar from "@/components/Navbar/BottomNavbar"
import Header from "@/components/Navbar/Header"
import { db } from "@/utils/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

function Investors() {
  const investorCollectionRef = collection(db,"users")
  const [investors,setInvestors] = useState([{}])
  useEffect(()=>{
    const fetchInvestors = async()=>{
      try {
              const data = await getDocs(investorCollectionRef)
              setInvestors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (error) {
          console.log(error);
      }
  }
  fetchInvestors()
  },[])

  return (
    <>
    <Header/>
    <BottomNavBar/>
    <h2 className=" heading-style-1">List of Investors</h2>
    <h3 className="px-4 mt-4"><b>{investors?.length}</b> Investors</h3>
    <div className="mb-24">
      {investors?.map(e=>(
        <InvestorCard fetchInvestor={true} key={e?.id} investorObj={e}/>
      ))}
    </div>
    </>
  )
}

export default Investors