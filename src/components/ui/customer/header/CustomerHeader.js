// src/components/ui/customer/header/CustomerHeader.js
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './CustomerHeader.css';

const CustomerHeader = () => {
  const [customer, setCustomer] = useState('');
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
    // Retrieve customer data from local storage
    const storedCustomerJSON = window.sessionStorage.getItem('loggedInCustomer');
    if (storedCustomerJSON) {
      const customerObject = JSON.parse(storedCustomerJSON);
      setCustomer(customerObject);

    }

    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    // Fetch weather data from API
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/getWeather');
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        setWeather({
          temperature: data.temperature,
          description: data.description,
          icon: weatherMap[data.icon] || 'cloud' // Fallback to 'cloud' if icon is not found
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update time every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleHomePush = () => {
    router.push("/customer");
  };

  return (
    <header className="bg-danger text-white p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Image src="/panda-icon.png" alt="Panda Icon" width={50} height={50} onClick={handleHomePush} style={{ cursor: 'pointer' }}/>
        <h4 className="mb-0">{customer ? `Welcome, ${customer.first_name}` : 'Welcome'}</h4>
      </div>
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

export default CustomerHeader;
