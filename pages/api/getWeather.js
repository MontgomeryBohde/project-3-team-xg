// pages/api/getWeather.js
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
  
  let cache = { data: null, timestamp: null };
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  
  export default async function handler(req, res) {
    const now = Date.now();
  
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return res.status(200).json(cache.data);
    }
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=30.615737&lon=-96.349167&appid=${process.env.WEATHER_API_KEY}&units=imperial`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
  
      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
      const weatherData = {
        temperature,
        description: `${temperature}° ${description}`,
        icon: weatherMap[data.weather[0].icon],
      };
  
      cache = { data: weatherData, timestamp: now };
      res.status(200).json(weatherData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
  