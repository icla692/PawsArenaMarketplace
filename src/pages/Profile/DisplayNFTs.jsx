import React from 'react'

const ProfileNftDisplay = ({results}) => {
  return (
    <div className="flex  w-full  text-white gap-3  border-gray-400 p-2">
          <div className="hidden md:flex justify-center w-1/4">
            <div className="flex t flex-col border-r-2 px-4 ">
              <h2 className='text-2xl'>Collections</h2>
              <div>
                IC Kitties
              </div>
            </div>
          </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="flex-grow w-full flex  justify-center items-center flex-wrap">
            {results}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileNftDisplay
