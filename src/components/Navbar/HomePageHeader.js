import React from 'react'
import Image from "next/image"
import Dp from '../../assets/Dp.png'
import Hamburger from './Hamburger'

function HomePageHeader() {

  return (
    <>
    <Hamburger/>
     <header className="flex items-center gap-2 p-4 relative -z-[1] rounded-b-lg bg-blue-700 shadow-md">
       <Image src={Dp} width={60} height={60} alt="dp" />
       <h2 className="font-semibold text-white">
         Hi Nidhish
       </h2>
     </header>
    </>
  )
}

export default HomePageHeader