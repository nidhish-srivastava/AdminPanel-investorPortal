"use client"
import BottomNavBar from "./Navbar/BottomNavbar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Hamburger from "./Navbar/Hamburger";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import InvestorCard from "./InvestorCard";
import Header from "./Navbar/Header";


function Home() {
  const adminCollectionRef = collection(db, "admin")
  const [investmentInterest, setInvestmentInterests] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchInvestmentInterest = async () => {
      setLoading(true)
      try {
        const data = await getDocs(adminCollectionRef)
        setInvestmentInterests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
    fetchInvestmentInterest()
  }, [])
  return (
    <>
     <Header/>
      <BottomNavBar />
      {loading ?  <div style={{width : "80%",margin :"4rem auto"}}>
            <Skeleton count={5}/>
            </div> : 
      <div className="py-4">
      <span className="ml-4 rounded-md bg-blue-200 bg-opacity-19 text-blue-800 text-sm font-bold px-4 py-1">Investment Interests</span>
      {investmentInterest?.map(e=>(
        <InvestorCard key={e?.id} investorObj={e}/>
      ))}
    </div>
      }
    </>
  )
}

export default Home