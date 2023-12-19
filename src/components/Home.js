"use client"
import BottomNavBar from "./Navbar/BottomNavbar"
import HomePageHeader from "./Navbar/HomePageHeader"
import { collection, getDocs} from "firebase/firestore"
import { db } from "@/utils/firebase"
import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import { sumHandler } from "@/utils"

function Home() {
  const projectCollectionRef = collection(db, "projects")
  const [popularProjects,setPopularProjects] = useState([])
  useEffect(()=>{
  const fetchPopularProjects = async() =>{
    try {
      const doc = await getDocs(projectCollectionRef)
      const documentSumArray = [];
       doc.forEach((doc)=>{
        const data = doc.data()
        const sum = sumHandler(data?.investmentProgress)
        documentSumArray.push({ docId: doc.id, sum , ...data });
      })
      const sortedArray = documentSumArray.sort((a, b) => b.sum - a.sum);
      setPopularProjects(sortedArray)
      // Log the sorted array

    } catch (error) {
      console.log(error);
    }
  }
  fetchPopularProjects()
  },[])

  return (
    <>
    <HomePageHeader/>
    <br />
    <span className="ml-4 rounded-md  bg-blue-200 bg-opacity-19 text-blue-800 text-sm font-bold px-4 py-2">Popular Projects</span>
    <main className="mb-[5rem]">
    {popularProjects.map((e,i)=>(
      <ProjectCard key={i} projectObj={e}/>
      ))}
      </main>
    <BottomNavBar/>
    </>
  )
}

export default Home