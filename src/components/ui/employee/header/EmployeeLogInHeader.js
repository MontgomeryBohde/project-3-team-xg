// src/components/ui/employee/header/EmployeeLogInHeader.js

/**
 * @file EmployeeLogInHeader.js
 * @description This file contains the EmployeeLogInHeader component which displays the employee login header with current time and weather information.
 * @requires next/image
 * @requires ./EmployeeHeader.css
 */

import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './EmployeeHeader.css';

/**
 * EmployeeLogInHeader component.
 * Displays the employee login header with current time and weather information.
 *
 * @component
 * @returns {JSX.Element} The EmployeeLogInHeader component.
 */
const EmployeeLogInHeader = () => {
  const [employee, setEmployee] = useState(null);
  const [weather, setWeather] = useState({ temperature: '', description: '', icon: '' });
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  // Define weather icon mapping
  const weatherMap = {
    '01d': 'brightness-high',
    '02d': 'cloud-sun',
    '03d': 'clouds',
    '04d': 'clouds',
    '09d': 'cloud-drizzle',
    '10d': 'cloud-rain',
    '11d': 'cloud-lightning',
    '13d': 'cloud-snow',
    '50d': 'cloud-haze',
  };

  useEffect(() => {
    /**
     * Retrieves the logged-in employee data from localStorage and sets it to state.
     * Also sets the loggedIn flag in localStorage.
     */
    const storedEmployee = localStorage.getItem('loggedInEmployee');
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
    }
    // Set loggedIn to true in localStorage if employee data exists
    localStorage.setItem('loggedIn', 'true');

    /**
     * Updates the current time every minute.
     */
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    /**
     * Fetches the current weather data from the API and sets it to state.
     * Maps the weather icon to a corresponding icon name.
     *
     * @async
     * @function fetchWeather
     * @throws Will throw an error if the fetch request fails.
     */
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/getWeather');
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        setWeather({
          temperature: data.temperature,
          description: data.description,
          icon: weatherMap[data.icon] || 'cloud'  // Fallback to a default icon
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmployee'); // Optional: clear employee data
    localStorage.setItem('loggedIn', 'false'); // Set loggedIn to false on logout
    console.log("Logged out");
    router.push('/employee');
  };

  return (
    <header className="bg-primary text-white p-2 d-flex align-items-center justify-content-between">
      <button className="btn btn-light me-3" onClick={handleBackClick}>
        <i className="bi bi-arrow-left"></i> Back
      </button>

      {/* Logout Button */}
      <button className="btn btn-light me-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Panda Icon and Welcome Message */}
      <div className="d-flex align-items-center">
        <Image src="/panda-icon.png" alt="Panda Icon" width={50} height={50} />
        <h4 className="mb-0 ms-2">Welcome!</h4>
      </div>

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

      <div className="d-flex align-items-center">
        <i className={`bi bi-${weather.icon} me-2`} style={{ fontSize: '2rem' }}></i>
        <div className="ms-2" id="vertical_container">
          <span>{weather.description}</span>
          <span className="ms-2">{currentTime}</span>
        </div>
      </div>
    </header>
  );
};

export default EmployeeLogInHeader;
