import React from "react";
import {
  convertExpiryDate,
  getTokenIndex,
  shortenAddress,
} from "../../Utils/tid";


const ActivityTable = ({ transactions, selectedCollection }) => {
  return (
    <div className=" mb-10 overflow-x-auto w-full mt-10  p-2 h-[600px] rounded-lg  border-gray-400">

    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            NFT
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            From
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            To
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
        </tr>
      </thead>
      <tbody className=" divide-y divide-gray-200">
        {transactions?.length > 0 ? (
          transactions?.slice(0,15)?.map((trans, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <img
                  src={`https://${selectedCollection}.raw.icp0.io/?tokenid=${trans?.token}&type=thumbnail`}
                  alt=""
                  height={40}
                  width={40}
                  />
                #{getTokenIndex(trans?.token, selectedCollection)}
              </td>

              {/* `https://${
                        nft.canister_id
                      }.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
                        nft.nftid,
                        nft.canister_id
                      )}&type=thumbnail`} */}

              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {shortenAddress(trans?.seller?.toString())}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {shortenAddress(trans?.buyer)}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {Number(trans?.price) / 1e8}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {convertExpiryDate(trans?.time)}
              </td>

              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {Number(offer?.amount) / 1e8} ICP
                //   </td> */}
              {/* //   <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
            //     {convertExpiryDate(Number(offer?.expiry_date))}
            //   </td> */}
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <div className="flex flex-col items-center justify-center gap-1">
                {user &&
                user?.principal?.toString() == offer?.user?.toString() && (
                  <button
                  // onClick={() => handleCancel(offer, nft)}
                  onClick={() => {
                    setSelectedOffer({ offer, nft });
                    setCancelModal(true);
                    }}
                    className="flex  bg-red-500 p-1 rounded-lg"
                    >
                    Cancel
                    </button>
                    )}
                    
                    {user && user?.principal?.toString() == nftOwner && (
                      <button
                      onClick={() => {
                        setSelectedOffer({ offer, nft });
                        setAcceptModal(true);
                        }}
                        className="flex bg-green-500 p-1 rounded-lg"
                        >
                      Accept
                    </button>
                  )}
                </div>
              </td> */}
            </tr>
          ))
        ) : (
          <div className="flex w-full justify-center items-center text-xs mt-3">
            
            No offers available
          </div>
        )}
      </tbody>
    </table>
        </div>
  );
};

export default ActivityTable;
