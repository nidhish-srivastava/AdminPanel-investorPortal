"use client"
import Header from '@/components/Navbar/HeaderBackNav'

function CreateReport({params}) {
  return (
    <>
    <Header route={`project/${params.projectId}`}/>
    <div>CreateReport</div>
    </>
  )
}

export default CreateReport