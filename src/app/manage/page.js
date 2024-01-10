"use client"
import BottomNavBar from "@/components/Navbar/BottomNavbar"
import Image from "next/image"
import Link from "next/link"
import report from '../../assets/report.png'
import suggestion from '../../assets/suggestion.png'
import deleteAccount from '../../assets/delete-user.png'
import Header from "@/components/Navbar/Header"

function Manage() {
  return (
    <>
    <Header/>
    <section className="pt-4 grid grid-cols-2 w-[90%] text-center">
        <Link href={`/create-report`}>
        <div className="manage-section-divs">
          <Image src={report} width={50} height={50} alt="report"/>
          Create Report
          </div>
        </Link>
        <Link href={`/view-suggestion`}>
        <div className="manage-section-divs">
          <Image src={suggestion} width={50} height={50} alt="suggestion" />
          View Suggestions
          </div>
        </Link>
        <Link href={`/delete-account`}>
          <div className="manage-section-divs">
            <Image src={deleteAccount} width={50} height={50} alt="delete-investor"/>
            Delete Investor Account
          </div>
        </Link>
    </section>
    <BottomNavBar/>
    </>
  )
}

export default Manage