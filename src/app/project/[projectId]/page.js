"use client"
import SampleProject from '../../../assets/SampleProject.png'
import Image from "next/image"
import NavHeader from "@/components/Navbar/HeaderBackNav"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/utils/firebase";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import RupeeIcon from "@/components/Icons/RupeeIcon"

function Page() {
    const [obj, setObj] = useState({})
    const param = useParams()
    const projectDocRef = doc(db, `projects/${param.projectId}`)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
    const fetchDetails = async () => {
        setLoading(true)
        try {
            const docSnapshot = await getDoc(projectDocRef)
            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                const id = docSnapshot.id
                setObj({ ...docData, id })
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }
        fetchDetails()
    }, [])

    return (
        <>
            <NavHeader>Project Details</NavHeader>
            {
                loading ? <div style={{ width: "80%", margin: "4rem auto" }}>
                    <Skeleton count={5} />
                </div> : <main>
                    <section className="p-4 flex gap-2 mt-8 rounded-md items-center justify-center">
                        <Image
                            src={SampleProject}
                            width={100}
                            height={100}
                            alt=""
                        />
                        <div className="flex flex-col items-start gap-2 p-2">
                            <h2 className="text-[18px] text-violet-700 font-medium">{obj?.name}</h2>
                            <section className="flex justify-center items-center gap-6 mb-4">
                                <div className="text-center">
                                    <label htmlFor="" className="text-[13px] text-opacity-50">Leader name</label>
                                    <h3 className="text-[15px] font-semibold">{obj?.leader}</h3>
                                </div>
                                <div className="text-center">
                                    <label htmlFor="" className="text-[13px] text-opacity-50">Cost</label>
                                    <h3 className="text-[15px] font-semibold"><RupeeIcon/> {obj?.cost}</h3>
                                </div>
                            </section>
                        </div>
                    </section>
                    {/* <section className="flex justify-center items-center gap-4 mb-4">
                        <div className="text-center">
                            <label htmlFor="" className="text-[13px] text-opacity-50">Project Starting Date</label>
                            <h3 className="text-[15px] font-semibold">{obj?.startingDate}</h3>
                        </div>
                        <div className="text-center">
                            <label htmlFor="" className="text-[13px] text-opacity-50">Expected Project Ending Date</label>
                            <h3 className="text-[15px] font-semibold">{obj?.endingDate}</h3>
                        </div>
                    </section>
                    <section className="w-[95%] mx-auto">
                        <div>
                            <h3 className="text-[18px] font-medium text-violet-700 mb-2">Project Details</h3>
                            <p className="w-full">{obj?.description}</p>
                        </div>
                        <br />
                        <div>
                            <h3 className="text-[18px] font-medium text-violet-700 mb-2">Why Invest here</h3>
                            <p>{obj?.investmentReason}</p>
                        </div>
                        <div className=" flex gap-4 justify-center mt-4 mb-4">
                                <Button onClick={downloadTechnicalPdf}  className={`text-[.94rem]`}>Technical Document</Button>
                            <Link href={`${obj?.id}/financial-info`}>
                                <Button className={`text-[.94rem]`}>Financial Document</Button>
                            </Link>
                        </div>
                    </section> */}
                </main>
            }
        </>
    )
}

export default Page