import Button from "@/components/Button"
import Header from "@/components/Navbar/Header"
import { db } from "@/utils/firebase"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"

async function Notification() {
  const suggestionCollectionRef = collection(db, "suggestion")
  const adminCollectionRef = collection(db, "admin")
    const suggestionRes = await getDocs(suggestionCollectionRef)
    const suggestions = suggestionRes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const investmentsRes = await getDocs(adminCollectionRef)
    const investmentInterests = investmentsRes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return (
    <>
    <Header/>
    <h2 className="rounded-md w-fit mx-auto my-4 bg-blue-200 bg-opacity-90 text-blue-800 text-sm font-bold px-4 py-1">Notifications</h2>
         <div className="mb-6 mt-12 flex items-center justify-center flex-col gap-2">
            <h2 className="p-2"><b>{investmentInterests.length}</b> Invesment interests received
            &nbsp;&nbsp;
            <Link href={`/`}>
            <Button className="rounded-xl bg-blue-200 bg-opacity-90 text-blue-800 text-[14px] px-4 py-1 font-bold" overrideClassNames>View</Button>
            </Link>
            </h2>
            <h2 className="p-2"><b>{suggestions.length}</b> Suggestion received
             &nbsp;&nbsp;
             <Link href={`/view-suggestion`}>
            <Button className="rounded-xl bg-blue-200 bg-opacity-90 text-blue-800 text-[14px] px-4 py-1 font-bold" overrideClassNames>View</Button>
             </Link>
            </h2>
          </div>
    </>
  )
}

export default Notification