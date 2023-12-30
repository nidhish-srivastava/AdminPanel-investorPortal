import React from 'react'
import Image from 'next/image'
import Dp from '../assets/Dp.png'
import RupeeIcon from './Icons/RupeeIcon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function InvestorCard({ investorObj }) {
  const router = useRouter()
  const viewDetailsHandler = () =>{
      sessionStorage.setItem("investmentInterestDetails",JSON.stringify(investorObj))
      router.push(`/project/${investorObj?.projectId}`)
  }
  return (
    <div className="flex justify-center items-center gap-2 mt-8 p-4 rounded-md bg-blue-100">
      <Image
        src={Dp}
        width={90}
        height={90}
        alt=""
      />
      <div>
        <section className="grid w-[100%] ">
          <div className='text-center'>
            <label htmlFor="" className="label">Investor Name</label>
            <h2 className="label-content">{investorObj?.fullName}</h2>
          </div>
          <div className='text-center'>
          <label htmlFor="" className="label"> Investment Amount</label>
            <h2 className="label-content">
              <RupeeIcon />
              <span className='text-sm'>
                <b>
                  {investorObj?.investmentAmount}
                </b>
              </span>
            </h2>
          </div>
        </section>
    <div className='text-center'>
          <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white" onClick={viewDetailsHandler}>View Details</button>
    </div>
      </div>
    </div>
  )
}

export default InvestorCard