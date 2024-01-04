"use client"
import BottomNavBar from "@/components/Navbar/BottomNavbar"
import Image from "next/image"
import Link from "next/link"
import report from '../../assets/report.png'
import suggestion from '../../assets/suggestion.png'
import Header from "@/components/Navbar/Header"
/*
Create a report to the investor
DropDown mein investor ko select kro(uske email ya fir uska naam)
Upload a pdf which will be sent to investor

I will make a grid of options here iin the manage route
one will be of creating a report
one will be view suggestions from the investor
*/

function Manage() {
  return (
    <>
    <Header/>
    <section className="pt-4 grid grid-cols-2 w-[90%] text-center">
        <Link href={`/create-report`}>
        <div className="flex flex-col items-center gap-2">
          <Image src={report} width={50} height={50} alt="report"/>
          Create Report
          </div>
        </Link>
        <Link href={`/view-suggestion`}>
        <div className="flex flex-col items-center gap-2">
          <Image src={suggestion} width={50} height={50} alt="suggestion" />
          View Suggestions
          </div>
        </Link>
    </section>
    <BottomNavBar/>
    </>
  )
}

export default Manage