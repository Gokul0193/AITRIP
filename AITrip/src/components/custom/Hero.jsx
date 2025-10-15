import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[60px] text-center mt-16'> 
          <span className='text-[#3628A0]'>
           Discover Your Next Adventure with AI :
           </span> Personalized ltineraries at You Fingertips
        </h1>
        <p className='text-xl text-gray-600 text-center'>
          Turn your travel dreams into reality with smart, AI-driven itineraries that make exploring the world effortless and exciting.
        </p>
        <Link to='/create-trip'>
          <Button className="p-6 cursor-pointer">Get Started It's Free</Button>
        </Link>

        
        
    </div>
  )
}

export default Hero
