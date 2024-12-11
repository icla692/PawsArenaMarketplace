import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col text-white h-screen justify-center items-center'>
      <div className=''>
        Page not found

      </div>
      <button className='border rounded-md p-2 bg-blue-300 mt-8 cursor-pointer' onClick={()=>navigate("/")}>Home</button>

    </div>
  )
}

export default Error
