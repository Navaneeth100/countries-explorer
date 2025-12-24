import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';

export default function CountryList() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cached = localStorage.getItem("countries");
    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed);
      setFiltered(parsed);
      return;
    }

    axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3")
      .then(res => {
        setData(res.data);
        setFiltered(res.data);
        localStorage.setItem("countries", JSON.stringify(res.data));
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltered(
        data.filter(c =>
          c.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, data]);

  if (!data.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-300 dark:bg-gray-700 h-56 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <SearchBar value={search} onChange={setSearch} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
        {filtered.map(i => (
          <CountryCard key={i.cca3} item={i} onClick={() => navigate('/country/' + i.cca3)} />
        ))}
      </div>
    </div>
  );
}