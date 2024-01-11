"use client"
import Button from '@/components/Button';
import Header from '@/components/Navbar/HeaderBackNav';
import SelectInvestor from '@/components/SelectInvestor';
import { useRef, useState } from 'react';

function CreateReport() {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [investors,setInvestors] = useState([])
  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile?.name : null);
  };



  return (
    <>
    <Header route={`manage`}/>
      <h3 className="heading-style-1">Create Report</h3>
      <div className="flex flex-col items-start gap-6 w-[90%] mx-auto mt-12">
       <SelectInvestor investors={investors} setInvestors={setInvestors}/>
        <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleButtonClick}
        >
          Upload Report
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

        <Button className={`mx-auto mt-24 w-[60%]`}>Send Report</Button>
      </div>
    </>
  );
}

export default CreateReport;
