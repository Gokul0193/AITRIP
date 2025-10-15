import React from 'react'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <div className='p-3 shadow-md flex justify-between item-center px-5 '>
      <img src="/logo.svg" alt="Logo" className='w-56' />

      <div>
        <Button className="p-5 cursor-pointer">SignUp</Button>
      </div>
    </div>
  )
}
