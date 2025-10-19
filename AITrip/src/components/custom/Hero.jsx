import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-4 md:mx-16 lg:mx-56 gap-6 md:gap-9 my-12 md:my-16'>
      <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-center mt-12 md:mt-16'>
        <span className='text-[#3628A0]'>
          Discover Your Next Adventure with AI:
        </span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-lg sm:text-xl md:text-xl text-gray-600 text-center'>
        Turn your travel dreams into reality with smart, AI-driven itineraries that make exploring the world effortless and exciting.
      </p>
      <Link to='/create-trip'>
        <Button className="px-6 py-5 md:px-8 md:py-6 cursor-pointer">
          Get Started 
        </Button>
      </Link>
    </div>
  )
}

export default Hero
