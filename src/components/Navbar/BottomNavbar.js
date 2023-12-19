import React from 'react'
import Link from 'next/link'
import HomeIconSvg from '../Icons/HomeIconSvg'
import CreateIconSvg from '../Icons/CreateIconSvg'
import ProjectIconSvg from '../Icons/ProjectIconSvg'

function BottomNavBar() {
  return (
    <div className="fixed bottom-0 py-3 px-5 w-[100%] flex justify-between items-center rounded-tl-lg rounded-tr-lg bg-blue-700 shadow-md">
    <Link href={`/`}>
   <HomeIconSvg/>
    </Link>
    <Link href={`/create-project`}>
   <CreateIconSvg/>
    </Link>
    <Link href={`/my-projects`}>
        <ProjectIconSvg/>
    </Link>
  </div>
  )
}

export default BottomNavBar