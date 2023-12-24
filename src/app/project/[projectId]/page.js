"use client"
import SampleProject from '../../../assets/SampleProject.png'
import Image from "next/image"
import Header from "@/components/Navbar/HeaderBackNav"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/utils/firebase";
import { sumHandler } from "@/utils"

function page() {
    const [obj, setObj] = useState({})
    const param = useParams()
    const projectDocRef = doc(db, `projects/${param.projectId}`)

    const fetchDetails = async () => {
        try {
            const docSnapshot = await getDoc(projectDocRef)
            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                console.log(docData);
                setObj(docData)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <>
            <Header>Project Details</Header>
            <div className="p-4 flex gap-2 mt-8 rounded-md">
                <Image
                    src={SampleProject}
                    width={90}
                    height={90}
                    alt=""
                />
                <div className="flex flex-col items-start gap-2">
                    <h2 className="text-[18px] text-violet-700 font-medium">{obj?.name}</h2>
                    <h4 className="text-[13px] font-medium">{obj?.leader}</h4>
                    <h4 className="text-[13px] font-medium">&#8377; {obj?.cost} for 1 year</h4>
                </div>
            </div>
            <main className="w-[95%] mx-auto flex flex-col gap-4">
                <div>
                    <h3 className="text-[18px] font-medium text-violet-700 mb-2">Investment Progress</h3>
                    <p>
                        A total of &#8377; {sumHandler(obj.investmentProgress)} is invested
                        <br />
                        Amount required : &#8377; {obj?.cost - sumHandler(obj.investmentProgress)}
                    </p>
                </div>
                <div className="">
                    <h3 className="text-[18px] font-medium text-violet-700 mb-2">Investor Details</h3>
                    {obj?.investmentProgress?.map(e => (
                        <div>
                            <h3>{e.investorName} - &#8377;{e.amountInvested}</h3>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default page