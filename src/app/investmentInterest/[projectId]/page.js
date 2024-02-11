"use client"
import SampleProject from '../../../assets/SampleProject.png'
import Image from "next/image"
import NavHeader from "@/components/Navbar/HeaderBackNav"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/utils/firebase";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import RupeeIcon from "@/components/Icons/RupeeIcon"
import Button from '@/components/Button'
import { LoaderIcon } from 'react-hot-toast'

function Page() {
    const [obj, setObj] = useState({})
    const param = useParams()
    const [skeletonLoading, setSkeletonLoading] = useState(false)
    const [investmentInterestDetails, setInvestmentInterestDetails] = useState({})
    const [btnLoading, setBtnLoading] = useState(false)
    const [deleteBtnLoading,setDeleteBtnLoading] = useState(false)
    const router = useRouter()
    const { docId, fullName, projectId, investmentAmount } = investmentInterestDetails
    const projectDocRef = doc(db, `projects/${param.projectId}`)
    const userDocRef = doc(db, `users/${docId}`)
    const adminDocRef = doc(db, `admin/${investmentInterestDetails.id}`)

    useEffect(() => {
        const fetchDetails = async () => {
            setSkeletonLoading(true)
            try {
                const docSnapshot = await getDoc(projectDocRef)
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    const id = docSnapshot.id
                    setObj({ ...docData, id })
                    setSkeletonLoading(false)
                }
            } catch (error) {
                setSkeletonLoading(false)
            }
        }
        setInvestmentInterestDetails(JSON.parse(sessionStorage.getItem("investmentInterestDetails")))
        fetchDetails()
    }, [])
    const approveInvestment = async () => {
        try {
            setBtnLoading(true)
            await updateDoc(projectDocRef, { "investmentProgress": arrayUnion({ amountInvested: parseInt(investmentAmount), investorName: fullName }) })
            await updateDoc(userDocRef, { "myInvestments": arrayUnion({ projectId: projectId, investmentAmount: investmentAmount, projectName: obj.name }) })
            await updateDoc(adminDocRef, { "approved": true })
            router.push('/')
            setBtnLoading(false)
        } catch (error) {
            console.log(error);
            setBtnLoading(false)
        }
    }
    const disapproveInvestment = async () => {
        // User ka model(need to remove from myInvestments,Project ka model,investmentProgress se htaana padega)
        // Admin ka model mein approved field ko change krna padega
        setBtnLoading(true)
        const userData = await getDoc(userDocRef)
        const myInvestments = userData.data().myInvestments
        const projectData = await getDoc(projectDocRef)
        const projectDataArr = projectData.data().investmentProgress
        const userDataToRemove = myInvestments.findIndex(item =>
            item.projectId == projectId
        )
        if (userDataToRemove != -1) {
            myInvestments.splice(userDataToRemove, 1)
        }
        const projectDataToRemove = projectDataArr.findIndex(item=>
            item.investorName == fullName
            )
            if (projectDataToRemove != -1) {
                projectDataArr.splice(projectDataToRemove, 1)
            }    
        try {
            await updateDoc(userDocRef, { "myInvestments": myInvestments })
            await updateDoc(adminDocRef, { "approved": false })
            await updateDoc(projectDocRef,{"investmentProgress" : projectDataArr})
            router.push('/')
            setBtnLoading(false)
        } catch (error) {
            setBtnLoading(false)
            console.log(error);
        }
    }

    const deleteInvestmentInterest = async () => {
        try {
            setDeleteBtnLoading(true)
           await deleteDoc(adminDocRef)
           router.push('/')
           setDeleteBtnLoading(false)
        } catch (error) {

        }
    }

    return (
        <>
            <NavHeader>Investment Details</NavHeader>
            {
                skeletonLoading ? <div style={{ width: "80%", margin: "4rem auto" }}>
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
                                    <label htmlFor="" className="label">Leader name</label>
                                    <h3 className="label-content">{obj?.leader}</h3>
                                </div>
                                <div className="text-center">
                                    <label htmlFor="" className="label">Cost</label>
                                    <h3 className="label-content"><RupeeIcon /> {obj?.cost}</h3>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className="grid">
                        <div className="text-center">
                            <label htmlFor="" className="label">Investor Name</label>
                            <h3 className="label-content">{investmentInterestDetails?.fullName}</h3>
                        </div>
                        <div className="text-center">
                            <label htmlFor="" className="label">Investor's Phone Number</label>
                            <h3 className="label-content">{investmentInterestDetails?.number}</h3>
                        </div>
                        <div className="text-center">
                            <label htmlFor="" className="label">Amount to Invest</label>
                            <h3 className="label-content"><RupeeIcon /> {investmentInterestDetails?.investmentAmount}</h3>
                        </div>
                    </section>
                    {/* <div className='flex gap-2 justify-center mt-12 items-center'>
                        <Link href={`${param.projectId}/create-report`}>
                        <Button className={`p-4 text-sm`}>Create a Report</Button>
                        </Link>
                        <Link href={`/`}>
                        <Button className={`p-4 text-sm`}>View Suggestions</Button>
                        </Link>
                    </div> */}
                    {/* <div className="text-center mt-12 flex gap-4 justify-center"> */}
                    <div className="mt-12 w-[70%] mx-auto flex flex-col gap-4 justify-center sm:flex-row">
                        {investmentInterestDetails.approved ?
                            <Button className={`btn border-none ${btnLoading ? "opacity-80" : ""}`} onClick={disapproveInvestment}>
                                {btnLoading ? <div className="loader"><LoaderIcon /> Disapproving</div> : "Disapprove Investment"}
                            </Button>
                            :
                            <Button className={`btn border-none ${btnLoading ? "opacity-80" : ""}`} onClick={approveInvestment}>
                                {btnLoading ? <div className="loader"><LoaderIcon /> Approving</div> : "Approve Investment"}
                            </Button>
                        }
                        <Button onClick={deleteInvestmentInterest} className={`btn border-none ${deleteBtnLoading ? "opacity-80" : ""}`}>
                        {deleteBtnLoading ? <div className="loader"><LoaderIcon /> Deleting</div> : "Delete Investment Interest"}
                        </Button>
                    </div>

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