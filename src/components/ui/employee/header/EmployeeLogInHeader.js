import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './EmployeeHeader.css';

const EmployeeLogInHeader = () => {
  const [employee, setEmployee] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve employee data from local storage
    const storedEmployee = localStorage.getItem('loggedInEmployee');
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
    }
  }, []);

  const handleBackClick = () => {
    router.push("/employee");
  };

  return (
    <header className="bg-primary text-white p-2 d-flex align-items-center justify-content-between">
      {/* Back Button */}
      <button className="btn btn-light me-3" onClick={handleBackClick}>
        <i className="bi bi-arrow-left"></i> Back
      </button>

      {/* Panda Icon and Welcome Message */}
      <div className="d-flex align-items-center">
        <Image src="/panda-icon.png" alt="Panda Icon" width={50} height={50} />
        <h4 className="mb-0 ms-2">Welcome!</h4>
      </div>

      {/* Check if employee is loaded before displaying ID and Name */}
      {employee ? (
        <>
          <div className="d-flex align-items-center ms-3">
            <span>ID: {employee.id}</span>
          </div>
          <div className="d-flex align-items-center ms-3">
            <span>Name: {employee.first_name}</span>
          </div>
        </>
      ) : (
        <div>Loading employee data...</div>
      )}

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
