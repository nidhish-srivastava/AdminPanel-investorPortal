"use client"
import { db } from "@/utils/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import Dp from '../../assets/Dp.png'
import Image from "next/image"
import Header from "@/components/Navbar/HeaderBackNav"
import { useRouter } from "next/navigation"

function ViewSuggestion() {
    const suggestionCollectionRef = collection(db, "suggestion")
    const [suggestions, setSuggestions] = useState([])
    const router = useRouter()

    const openSuggestion = async (e) => {
        sessionStorage.setItem("suggestion", JSON.stringify(e))
        router.push('/view-suggestion/detail')
    }
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const data = await getDocs(suggestionCollectionRef)
                setSuggestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            } catch (error) {

            }
        }
        fetchSuggestions()
    }, [])
    return (
        <>
            <Header route={`manage`} />
            <h3 className="heading-style-1"> Suggestions</h3>
                {suggestions.map(e => (
                    <div key={e.id} className="flex gap-12 justify-around items-center mt-8 p-4 rounded-md bg-blue-100">
                        <Image
                            src={Dp}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <div className="flex flex-col gap-6">
                            <div className='text-center'>
                                <label htmlFor="" className="label">Investor Name</label>
                                <h2 className="label-content">{e?.investorName}</h2>
                            </div>
                            <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white" onClick={() => openSuggestion(e)}>View Suggestion</button>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default ViewSuggestion