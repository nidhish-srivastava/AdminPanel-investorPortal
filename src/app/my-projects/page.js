"use client"
import BottomNavBar from '@/components/Navbar/BottomNavbar'
import { collection,getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'

function MyProjects() {
  const [myProjects,setMyProjects] = useState([])
  const projectCollectionRef = collection(db, "projects")

  const fetchMyPostsHandler = async()=>{
    try {
      const data = await getDocs(query(projectCollectionRef,where('leader','==','Nidhish')))
      // console.log(data);
      setMyProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchMyPostsHandler()
  },[])

  return (
    <>
        <h1 className="text-indigo-700 text-center text-[25px] not-italic font-bold">My Projects</h1>
    {myProjects.map((e,i)=>(
      <ProjectCard key={i} projectObj={e}/>
    ))}
    <BottomNavBar/>
    </>
  )
}

export default MyProjects