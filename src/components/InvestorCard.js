import React from 'react'
import Image from 'next/image'
import Dp from '../assets/Dp.png'
import RupeeIcon from './Icons/RupeeIcon'
import Link from 'next/link'

function InvestorCard({ investorObj }) {
  return (
    <div className="flex gap-2 mt-8 p-4 rounded-md bg-blue-100">
      <Image
        src={Dp}
        width={90}
        height={90}
        alt=""
      />
      <div>
        <section className="grid grid-cols-2 justify-center items-center gap-6 mt-4 mb-4 w-[100%] mx-auto">
          <div className='text-center'>
            <label htmlFor="" className="text-[13px] text-opacity-50">Investor Name</label>
            <h2 className="text-[15px] font-semibold">{investorObj?.fullName}</h2>
          </div>
          <div className='text-center'>
          <label htmlFor="" className="text-[13px] text-opacity-50"> Investment Amount</label>
            <h2 className="text-[15px] font-semibold">
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
        <Link href={`/project/${investorObj?.projectId}`}>
          <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white">View Details</button>
        </Link>
    </div>
      </div>
    </div>
  )
}

export default InvestorCard