import React from 'react';
import { FileText, Upload } from 'lucide-react';

function MedicalRecords() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">Medical Records</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Records</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
            <div className="flex items-center">
              <FileText className="mr-2 text-blue-500" />
              <span>Blood Test Results - May 2024</span>
            </div>
            <button className="text-blue-500 hover:text-blue-700">View</button>
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
            <div className="flex items-center">
              <FileText className="mr-2 text-blue-500" />
              <span>X-Ray Report - April 2024</span>
            </div>
            <button className="text-blue-500 hover:text-blue-700">View</button>
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
            <div className="flex items-center">
              <FileText className="mr-2 text-blue-500" />
              <span>Prescription - March 2024</span>
            </div>
            <button className="text-blue-500 hover:text-blue-700">View</button>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upload New Record</h3>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;