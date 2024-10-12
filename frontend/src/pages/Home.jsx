import React from 'react'
import Login from './Login'

const Home = () => {
  return (
    <div className="flex text-white flex-col justify-center items-center h-[100vh]">
    <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Welcome to our Marketplace!
    </h1>
    <p className="text-lg justify-center flex items-center md:text-2xl  mb-4">
        Discover,collect and sale extraordinary NFTS
    </p>
    <Login/>
</div>
  )
}

export default Home