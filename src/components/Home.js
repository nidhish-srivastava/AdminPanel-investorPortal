"use client"
import BottomNavBar from "./Navbar/BottomNavbar";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import InvestorCard from "./InvestorCard";
import Header from "./Navbar/Header";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Link from "next/link";


// agr number dikhaana hai toh usse fetch krna hi pdega,fir hm session storage use kr skte hai(to view it further coz view button hoga udhar)

function Home() {
  const adminCollectionRef = collection(db, "admin")
  const suggestionCollectionRef = collection(db, "suggestion")
  const [investmentInterest, setInvestmentInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await getDocs(suggestionCollectionRef)
        setSuggestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (error) {

      }
    }

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
    fetchSuggestions()
    fetchInvestmentInterest()
  }, [])
  return (
    <>
      <Header />
      <BottomNavBar />
      {loading ? <div style={{ width: "80%", margin: "4rem auto" }}>
        <Skeleton count={5} />
      </div> :
        <div className="mt-4 mb-24">
          <div className="mb-6">
            <h2 className="p-2"><b>{investmentInterest.length}</b> Invesment interests received</h2>
            <h2 className="p-2"><b>{suggestions.length}</b> Suggestion received
             &nbsp;&nbsp;
             <Link href={`/view-suggestion`}>
            <Button className="rounded-xl bg-blue-200 bg-opacity-90 text-blue-800 text-[14px] px-4 py-1 font-bold" overrideClassNames>View</Button>
             </Link>
            </h2>
          </div>
          <h2 className="rounded-md w-fit mx-auto bg-blue-200 bg-opacity-90 text-blue-800 text-sm font-bold px-4 py-1">Investment Interests</h2>
          {investmentInterest?.map(e => (
            <InvestorCard key={e?.id} investorObj={e} />
          ))}
        </div>
      }
    </>
  )
}

export default Home