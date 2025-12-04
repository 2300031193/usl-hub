import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, CloudLightning, CloudSnow, MapPin, Loader } from 'lucide-react';

function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('Locating...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
                fetchLocationName(latitude, longitude);
            },
            (err) => {
                setError('Location access denied');
                setLoading(false);
            }
        );
    }, []);

    const fetchLocationName = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const data = await response.json();
            setLocation(data.city || data.locality || 'Your Location');
        } catch (e) {
            setLocation('Local Weather');
        }
    };

    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
            );
            const data = await response.json();
            setWeather(data);
            setLoading(false);
        } catch (e) {
            setError('Failed to load weather');
            setLoading(false);
        }
    };

    const getWeatherIcon = (code, size = 16) => {
        if (code === 0) return <Sun size={size} color="#fbbf24" />;
        if (code >= 1 && code <= 3) return <CloudSun size={size} color="#94a3b8" />;
        if (code >= 45 && code <= 48) return <Cloud size={size} color="#94a3b8" />;
        if (code >= 51 && code <= 67) return <CloudRain size={size} color="#60a5fa" />;
        if (code >= 71 && code <= 77) return <CloudSnow size={size} color="#e2e8f0" />;
        if (code >= 80 && code <= 82) return <CloudRain size={size} color="#60a5fa" />;
        if (code >= 95) return <CloudLightning size={size} color="#f59e0b" />;
        return <Sun size={size} color="#fbbf24" />;
    };

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    if (loading) return (
        <div className="weather-widget-loading" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.75rem',
            height: '140px',
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.8rem',
            marginLeft: '1rem'
        }}>
            <Loader size={20} className="animate-spin" />
        </div>
    );

    if (error) return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.75rem',
            height: '140px',
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f43f5e',
            fontSize: '0.8rem',
            textAlign: 'center',
            marginLeft: '1rem'
        }}>
            {error}
        </div>
    );

    const current = weather.current;
    const daily = weather.daily;

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            marginLeft: '1rem',
            minWidth: '160px'
        }}>
            {/* Header: Location & Current Temp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '2px' }}>
                        <MapPin size={10} /> {location}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: '1', color: '#fff' }}>
                        {Math.round(current.temperature_2m)}°
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {getWeatherIcon(current.weather_code, 24)}
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
                        H:{Math.round(daily.temperature_2m_max[0])}°
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        L:{Math.round(daily.temperature_2m_min[0])}°
                    </div>
                </div>
            </div>

            {/* Forecast List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                {daily.time.slice(1, 4).map((day, index) => (
                    <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: '#cbd5e1', width: '30px' }}>{getDayName(day)}</span>
                        <span style={{ display: 'flex', justifyContent: 'center', width: '20px' }}>
                            {getWeatherIcon(daily.weather_code[index + 1], 14)}
                        </span>
                        <div style={{ display: 'flex', gap: '6px', color: '#94a3b8' }}>
                            <span style={{ color: '#cbd5e1' }}>{Math.round(daily.temperature_2m_max[index + 1])}°</span>
                            <span>{Math.round(daily.temperature_2m_min[index + 1])}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherWidget;
