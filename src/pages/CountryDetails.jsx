import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CountryDetails() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/alpha/' + code)
      .then(res => {
        const country = res.data[0];
        setData(country);
        const city = country.capital?.[0];
        if (city) {
          axios.get(
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            city +
            '&appid=f805443c862dee31530549fdd8dfcf85&units=metric'
          ).then(w => setWeather(w.data));
        }
      });
  }, [code]);

  if (!data) return <p className='p-5'>Loading...</p>;

  return (
    <motion.div
      className='min-h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white max-w-3xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img src={data.flags.png} className='w-80 rounded-xl shadow mb-6' />
      <h1 className='text-3xl font-bold'>{data.name.common}</h1>

      <p className='mt-2 text-gray-600 dark:text-gray-300'>Capital: {data.capital}</p>
      <p className='text-gray-600 dark:text-gray-300'>Region: {data.region}</p>
      <p className='text-gray-600 dark:text-gray-300'>Population: {data.population}</p>

      {weather && (
        <div className='mt-6 p-4 bg-white dark:bg-gray-800 dark:text-white shadow rounded-xl'>
          <h2 className='text-xl font-semibold mb-2'>Weather</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </motion.div>
  );
}