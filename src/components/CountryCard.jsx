import React from "react";
import { motion } from 'framer-motion';

export default function CountryCard({ item, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow cursor-pointer overflow-hidden"
    >
      <img src={item.flags.png} className='h-40 w-full object-cover' />
      <div className='p-4'>
        <h2 className='font-bold text-lg'>{item.name.common}</h2>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{item.capital}</p>
      </div>
    </motion.div>
  )
}