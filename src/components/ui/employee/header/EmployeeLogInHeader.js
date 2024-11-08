import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from "next/navigation";
import Image from 'next/image';

import './EmployeeHeader.css';

const EmployeeLogInHeader = () => {
  const router = useRouter(); // Initialize the router here
  const handleBackClick = () => {
    // You can implement navigation logic here if needed
    router.push("/employee");
  };

  return (
    <header className="bg-danger text-white p-2 d-flex align-items-center justify-content-between">
      {/* Back Button */}
      <button className="btn btn-light me-3" onClick={handleBackClick}>
        <i className="bi bi-arrow-left"></i> Back
      </button>

      {/* Panda Icon and Welcome Message */}
      <div className="d-flex align-items-center">
        <Image src="/panda-icon.png" alt="Panda Icon" width={50} height={50} />
        <h4 className="mb-0 ms-2">Welcome!</h4>
      </div>

      {/* Employee ID */}
      <div className="d-flex align-items-center ms-3">
        <span>ID: 1</span>
      </div>

      {/* Employee Name */}
      <div className="d-flex align-items-center ms-3">
        <span>Name: Alisa</span>
      </div>

      {/* Weather Info */}
      <div className="d-flex align-items-center">
        <i className="bi bi-cloud-sun me-2" style={{ fontSize: '2rem' }}></i>
        <div className="ms-2" id="vertical_container">
          <span>83° Partly Cloudy</span>
          <span className="ms-2">6:10 PM</span>
        </div>
      </div>
    </header>
  );
};

export default EmployeeLogInHeader;

