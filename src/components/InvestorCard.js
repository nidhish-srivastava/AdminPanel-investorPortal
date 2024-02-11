import React from 'react'
import Image from 'next/image'
import Dp from '../assets/Dp.png'
import RupeeIcon from './Icons/RupeeIcon'
import { useRouter } from 'next/navigation'

function InvestorCard({ investorObj,fetchInvestor }) {
  const router = useRouter()
  const viewDetailsHandler = () =>{
    if(fetchInvestor==true){
      router.push(`/investors/${investorObj?.fullName}`)
      return
    }
      sessionStorage.setItem("investmentInterestDetails",JSON.stringify(investorObj))
      router.push(`/investmentInterest/${investorObj?.projectId}`)
  }
  return (
    <main className='bg-blue-100 mt-8 p-4 rounded-md '>
    <div className="flex justify-center items-center gap-2 ">
      <Image
        src={Dp}
        width={90}
        height={90}
        alt=""
      />
        <section className="grid w-[100%] ">
          <div className='text-center'>
            <label htmlFor="" className="label">Investor Name</label>
            <h2 className="label-content">{investorObj?.fullName}</h2>
          </div>
          <div className='text-center'>
          <label htmlFor="" className="label">{fetchInvestor==true ? "email" : "Investment Amount"}</label>
            <h2 className="label-content break-words">
              <span className='text-sm'>
                {
                  fetchInvestor==true ? `${investorObj?.email}` : <>
              <RupeeIcon />
              {investorObj?.investmentAmount}
                  </>
                }
              </span>
            </h2>
          </div>
        </section>
      </div>
    <div className='text-center'>
          <button className="rounded-[4px] font-medium px-2 py-1 bg-indigo-600 text-[11px] text-white" onClick={viewDetailsHandler}>View Details</button>
    </div>
          </main>
  )
}

export default InvestorCard