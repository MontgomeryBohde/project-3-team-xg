// pages/api/weather.js

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

let cache = {
    data: null,
    timestamp: null
};

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export default async function handler(req, res) {
    const now = new Date().getTime();

    if (!(cache.data && cache.timestamp && (now - cache.timestamp < CACHE_DURATION))) {
        const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=30.615737&lon=-96.349167&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch weather data');
            }

            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;

            const capitalizedDescription = description.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const icon = data.weather[0].icon;

            cache.data = {
                temperature,
                description: `${temperature}° ${capitalizedDescription}`,
                icon: weatherMap[icon],
            };
            cache.timestamp = now;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
            return;
        }
    }

    res.status(200).json(cache.data);
}
