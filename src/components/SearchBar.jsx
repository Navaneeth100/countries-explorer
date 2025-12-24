import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className='flex justify-center p-4'>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className='border dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2 w-72 shadow'
        placeholder='Search Country...'
      />
    </div>
  );
}