import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image'

import './EmployeeHeader.css';

const EmployeeHeader = () => {
  return (
    <header className="bg-danger text-white p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Image src="/panda-icon.png" alt="Panda Icon" width={50} height={50}/>
        <h4 className="mb-0">Welcome!</h4>
      </div>
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

export default EmployeeHeader;