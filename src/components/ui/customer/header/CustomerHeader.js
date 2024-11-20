import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './CustomerHeader.css';
import getWeather from '@/backend/weather';

const CustomerHeader = () => {
  const [customer, setCustomer] = useState('');
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState('');
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Retrieve customer data from local storage
    const storedCustomerJSON = window.sessionStorage.getItem('loggedInCustomer');
    if (storedCustomerJSON) {
      const customerObject = JSON.parse(storedCustomerJSON);
      setCustomer(customerObject);
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
      const response = getWeather();
      const data = await response;

      setCurrentTemperature(data.temperature);
      setCurrentWeatherCondition(data.description);
      setCurrentWeatherIcon(data.icon);
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
        <i className={`bi bi-${currentWeatherIcon} me-2`} style={{ fontSize: '2rem' }}></i>
        <div className="ms-2" id="vertical_container">
          <span>{currentWeatherCondition}</span>
          <span className="ms-2">{currentTime}</span>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;