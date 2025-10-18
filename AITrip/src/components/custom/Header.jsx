import React from 'react'
import { Button } from '../ui/button'
import { MdTravelExplore } from "react-icons/md";
export const Header = () => {
  return (
    <div className='p-3 shadow-md flex justify-between item-center px-5 '>
      <img src="/logo.svg" alt="Logo" className='w-56' />

      <div>
        <Button className="p-5 px-7 cursor-pointer"><MdTravelExplore /></Button>
      </div>
    </div>
  )
}
