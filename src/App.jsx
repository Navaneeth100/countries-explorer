import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CountryList from "./pages/CountryList";
import CountryDetails from "./pages/CountryDetails";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
        Countries Explorer
      </Link>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                   text-black dark:text-white hover:scale-110 
                   transition-transform shadow-sm"
      >
        {theme === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M6.343 
              6.343l-1.06-1.06m13.435 13.435l-1.06-1.06M6.343 
              17.657l-1.06 1.06m13.435-13.435l-1.06 1.06M12 
              7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0112 21.75 
              9.75 9.75 0 1112 2.25c.393 0 .778.023 
              1.158.067a.75.75 0 01.342 1.327 
              7.486 7.486 0 009.662 11.358.75.75 
              0 01.59 1.0z" />
          </svg>
        )}
      </button>
    </nav>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}