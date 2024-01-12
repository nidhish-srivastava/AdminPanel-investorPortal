"use client"
import InvestorCard from "@/components/InvestorCard"
import Header from "@/components/Navbar/HeaderBackNav"
import { db } from "@/utils/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

function BannedAccounts() {
    const usersCollectionRef = collection(db, "users")
    const [bannedInvestors,setBannedInvestors] = useState([])
    useEffect(()=>{
        const fetchBannedInvestors = async () => {
            const bannedInvestors = query(usersCollectionRef, where("isBanned", "==", true))
            const querySnapshot = await getDocs(bannedInvestors);
            setBannedInvestors(querySnapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        fetchBannedInvestors()
    },[])

    return (
        <>
        <Header/>
            <h3 className="heading-style-1">Banned Investors</h3>
    <h3 className="px-4 mt-4"><b>{bannedInvestors?.length}</b> Investors banned</h3>
    <div className="mb-24">
      {bannedInvestors?.map(e=>(
        <InvestorCard fetchInvestor={true} key={e?.id} investorObj={e}/>
      ))}
    </div>
        </>
    )
}

export default BannedAccounts