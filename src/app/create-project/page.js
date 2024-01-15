"use client"
import BottomNavBar from '@/components/Navbar/BottomNavbar'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Header from '@/components/Navbar/HeaderBackNav'

function CreateProject() {
  const [cost,setCost] = useState("")
  const [project, setProject] = useState({
    name: "",
    leader: "",
    startingDate: "",
    endingDate: "",
    description: "",
    investmentReason: "",
    investmentConditions: "",
    investmentProgress: [],
    phoneNumber : ""
  })
  const router = useRouter()
  const projectCollectionRef = collection(db, "projects");
  const changeHandler = (e) => {
    const {name,value} = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }
  console.log(project);
  const changeCost = (e)=>{
    const numericCost = e.target.value
    setCost(parseInt(numericCost))
  }
  const submitProjectHandler = async () => {
    try {
      const response = await addDoc(projectCollectionRef, { ...project,cost })
      if (response.id != null) {
        toast.success("Project Created Successfully")
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/')
      }
    } catch (error) {
      toast.error("Error,Try Again!!!")
    }
  }
  return (
    <>
    <Header route={`create`}/>
      <Toaster />
      <div className='flex flex-col p-4 gap-8'>
        <h1 className="text-indigo-700 text-center text-[25px] not-italic font-bold">Create Project</h1>
        <div>
          <label htmlFor="project-name">Project Name *</label>
          <input name='name' value={project.name} onChange={changeHandler} id="project-name" placeholder="Enter the project name" />
        </div>
        <div>
          <label htmlFor="project-leader">Project Leader *</label>
          <input id="project-leader" name='leader' value={project.leader} onChange={changeHandler} placeholder="Enter the project leader's name" />
        </div>
        <div>
          <label htmlFor="project-cost">Project Cost *</label>
          <input  id="project-cost" name='cost' type='number'  value={cost} onChange={changeCost} placeholder="Enter the project cost" />
        </div>
        <div>
          <label htmlFor="project-start-date">Project Starting Date *</label>
          <input id="project-start-date" name='startingDate' value={project.startingDate} onChange={changeHandler} type="date" />
        </div>
        <div>
          <label htmlFor="project-end-date">Project Expected Ending Date *</label>
          <input id="project-end-date" type="date" name='endingDate' value={project.endingDate} onChange={changeHandler} />
        </div>
        <div>
          <label htmlFor="project-description">Project Description *</label>
          <textarea id="project-description" placeholder="Describe the project" name='description' value={project.description} onChange={changeHandler} />
        </div>
        <div>
          <label htmlFor="investment-reason">Project Investment Reason *</label>
          <textarea id="investment-reason" name='investmentReason' value={project.investmentReason} onChange={changeHandler} placeholder="Explain why should the investor invest ??" />
        </div>
        <div>
          <label htmlFor="investment-conditions">Investment Conditions (if any)</label>
          <textarea
            id="investment-conditions"
            name='investmentConditions'
            value={project.investmentConditions}
            onChange={changeHandler}
            placeholder="Enter the investment conditions"
          />
        </div>
        <div>
          <label htmlFor="leader-phoneNumber">Leader's Phone Number</label>
          <input type="text" name='phoneNumber' id='leader-phoneNumber' value={project.phoneNumber} onChange={changeHandler} placeholder="+91 ..."/>
        </div>
      </div>
      <div className='my-4 mb-[8rem] text-center'>
        <Button className={`w-[80%]`} onClick={submitProjectHandler}>
          Submit
        </Button>
      </div>
      <div className=''>
        <BottomNavBar />
      </div>
    </>
  )
}

export default CreateProject


// export default function Component() {
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card className="space-y-4">
//         <CardHeader>
//           <CardTitle className="text-lg font-bold">New Project</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-4">
// <div className="space-y-2">
//   <Label htmlFor="project-name">Project Name *</Label>
//   <Input id="project-name" placeholder="Enter the project name" />
// </div>
// <div className="space-y-2">
//   <Label htmlFor="project-leader">Project Leader</Label>
//   <Input id="project-leader" placeholder="Enter the project leader's name" />
// </div>
// <div className="space-y-2">
//   <Label htmlFor="project-cost">Project Cost</Label>
//   <Input id="project-cost" placeholder="Enter the project cost" type="number" />
// </div>
//             <div className="space-y-2">
//               <Label htmlFor="project-image">Project Image URL</Label>
//               <Input id="project-image" placeholder="Enter the project image URL" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="project-start-date">Project Starting Date</Label>
//                 <Input id="project-start-date" type="date" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="project-end-date">Project Ending Date</Label>
//                 <Input id="project-end-date" type="date" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="project-description">Project Description</Label>
//               <Textarea className="min-h-[100px]" id="project-description" placeholder="Describe the project" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="investment-reason">Project Investment Reason</Label>
//               <Textarea className="min-h-[100px]" id="investment-reason" placeholder="Reason for investment" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="investment-progress">Project Investment Progress</Label>
//               <Textarea
//                 className="min-h-[100px]"
//                 id="investment-progress"
//                 placeholder="Enter the investment progress"
//               />
//             </div>
// <div className="space-y-2">
//   <Label htmlFor="investment-conditions">Investment Conditions</Label>
//   <Textarea
//     className="min-h-[100px]"
//     id="investment-conditions"
//     placeholder="Enter the investment conditions"
//   />
// </div>
//             <Button className="w-full" type="submit">
//               Submit
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

