import React from 'react'
import { useState , useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '@/services'

const categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // is called when the variable in the last [] changes. Here after reloading as nothing mentioned in [].

    getCategories().then((newCategories) => {
      setCategories(newCategories);
    })
  }, [])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-6 mb-8">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Caterogies</h3>

    {categories.map((category) => (
      <Link key={category.slug} href={`/category/${category.slug}`}>
        <span className='cursor-pointer block mb-3 pb-3'>
          {category.name}
        </span>
      </Link>
    ))}
    </div>

  )
}

export default categories
