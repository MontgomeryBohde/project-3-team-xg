import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './EmployeeHeader.css';
import getWeather from '@/backend/weather';

const EmployeeLogInHeader = () => {
  const [employee, setEmployee] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState('');
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Retrieve employee data from local storage
    const storedEmployee = localStorage.getItem('loggedInEmployee');
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
    }

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    const fetchWeather = async () => {
      const response = await getWeather();
      setCurrentTemperature(response.temperature);
      setCurrentWeatherCondition(response.description);
      setCurrentWeatherIcon(response.icon);
    };

    fetchWeather();
    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update time every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleBackClick = () => {
    router.back();
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
        <i className={`bi bi-${currentWeatherIcon} me-2`} style={{ fontSize: '2rem' }}></i>
        <div className="ms-2" id="vertical_container">
          <span>{currentWeatherCondition}</span>
          <span className="ms-2">{currentTime}</span>
        </div>
      </div>
    </header>
  );
};

export default EmployeeLogInHeader;
