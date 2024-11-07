import React from 'react'

const SaleHistory = ({history}) => {
  
  const convertTime = (timestamp) => {
    const date = new Date(Number(timestamp)/1e6);
    return date.toLocaleString(); // Adjust options as needed
};

// Helper function to shorten addresses
const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

  return (
    <div className="overflow-x-auto bg-[#1B1B1B] p-2 rounded-lg border border-gray-400">
      <h3 className='text-lg'>Activity</h3>
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
            {history?.length > 0 ? history?.map((item, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{shortenAddress(item?.buyer?.toString())}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{shortenAddress(item?.seller?.toString())}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{Number(item?.price)/1e8}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{convertTime(item?.time)}</td>
                </tr>
            ))
            :
            <div className='text-xs flex justify-center items-center '>No activity available</div>
          
          }
        </tbody> 
    </table>
</div>
  )
}

export default SaleHistory



// buyer: "9ab3fc5674ae93846daa935812e6d9b36925b2c9810e03a9ebc5adddad634d93"
// price: 68000000n
// seller: "9ab3fc5674ae93846daa935812e6d9b36925b2c9810e03a9ebc5adddad634d93"
// time: 1730255389263606802n
// token: "cg7z3-4akor-uwiaa-aaaaa-cqace-eaqca-aaad4-a"