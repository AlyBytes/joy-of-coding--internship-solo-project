'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { TbWritingSign } from "react-icons/tb";
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname(); //we call this hook to get current path; because this hook is dependent on browser API - 
  // we need to convert this component into client component: we can only access browser APIs in client components
  // console.log(currentPath)
  const links = [
      {label:'Dashboard', href:'/'},
      {label:'TASKS TO DO', href:'/tasks'}
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><TbWritingSign /></Link>
        <ul className='flex space-x-6'>
            {links.map(link=>
            <Link 
                key={link.href} 
                // className={`${link.href===currentPath ? 'text-zinc-900' : "text-zinc-400"} hover:text-zinc-800 transition-colors`}
                className={classnames({ //we call classnames and give it an object
                  'text-zinc-900':link.href === currentPath,
                  'text-zinc-500': link.href !== currentPath,
                  'hover:text-zinc-700 transition-colors' : true

                })}
                href={link.href}>{link.label}</Link>)}
           
        </ul>
    </nav>
  )
}

export default NavBar