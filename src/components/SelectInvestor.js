import { db } from "@/utils/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect } from "react"

function SelectInvestor({investors,setInvestors,selectedInvestorDropDownState,setSelectedInvestorDropDownState}) {
    const usersColletionRef = collection(db,"users") 
  
    useEffect(()=>{
        const fetchInvestors = async()=>{
            try {
                const filterBanInvestorQuery = query(usersColletionRef,where("isBanned","!=",true))
                    const data = await getDocs(filterBanInvestorQuery)
                    // const data = await getDocs(usersColletionRef)
                    setInvestors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvestors()
      },[])

  return (
    <>
     <select name="" id="" value={selectedInvestorDropDownState && selectedInvestorDropDownState} onChange={e=>setSelectedInvestorDropDownState && setSelectedInvestorDropDownState(e.target.value)}>
            <option value="">Select Investor</option>
            {investors?.map((e)=>(
                <option key={e?.id} value={e?.id}>{e?.fullName}</option>
            ))}
        </select>
    </>
  )
}

export default SelectInvestor