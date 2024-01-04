// CreateReport.js
"use client"
import Button from '@/components/Button';
import Header from '@/components/Navbar/HeaderBackNav';
import { db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

function CreateReport() {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [investors,setInvestors] = useState([])
  const usersColletionRef = collection(db,"users") 
  const [cache,setCache] = useState(false)

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile.name : null);
  };

  useEffect(()=>{
    const fetchInvestors = async()=>{
        try {
            if(!cache){
                const data = await getDocs(usersColletionRef)
                setInvestors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                setCache(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchInvestors()
  },[])

  return (
    <>
    <Header route={`manage`}/>
      <h3 className="heading-style-1">Create Report</h3>
      <div className="flex flex-col items-start gap-6 w-[90%] mx-auto mt-12">
        <select name="" id="">
            <option value="" hidden>Select Investor</option>
            {investors.map(e=>(
                <option key={e.id} value={e.fullName}>{e.fullName}</option>
            ))}
        </select>
        <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleButtonClick}
        >
          Upload PDF
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <h2 className="mt-2 text-sm text-gray-700">
          {selectedFileName && `Selected File: ${selectedFileName}`}
        </h2>
        </div>

        <Button className={`mx-auto mt-6`}>Send Report</Button>
      </div>
    </>
  );
}

export default CreateReport;
