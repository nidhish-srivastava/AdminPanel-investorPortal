import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SampleProject from '../assets/SampleProject.png'

function ProjectCard({ongoing,projectObj}) {
  
  return (
    <div className="p-4 flex gap-2 mt-8 rounded-md bg-blue-100">
    <Image
    src={SampleProject}
    width={100}
    height={100}
    alt=""
    />
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-violet-700 font-medium">{projectObj?.name}</h2>
      <h4 className="text-[10px] font-medium">{projectObj?.leader}</h4>
      {(ongoing==true ? <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white">Learn more</button> : (
        <>
      <h4 className="text-[10px] font-medium">&#8377; {projectObj?.cost} for {projectObj.endingDate.seconds}</h4>
      <Link href={`/project/${projectObj?.id}`}>
      <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white">View Details</button>
      </Link>
        </>
      )) }
    </div>
  </div>
  )
}

export default ProjectCard