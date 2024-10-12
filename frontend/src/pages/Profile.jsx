import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import pawsarena from "../assets/pawsarena.png"; // Placeholder for profile picture
import { AiOutlineCopy } from "react-icons/ai"; // Import copy icon
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { computeExtTokenIdentifier } from "../Utils/tid";
import UnlistUpdate from "./UnlistUpdate";
import ListNFT from "../components/ListNFT";
import { useNavigate } from "react-router-dom";
import TransferNFT from "../components/TransferNFT";
import TransferICP from "../components/TransferICP";

const style = {
  wrapper: `flex bg-[#121212] min-h-screen flex-col w-full items-center p-4 text-white`,
  profileSection: `flex flex-col gap-1 justify-evenly items-center bg-[#212121] rounded-lg p-4 w-full max-w-4xl mb-6`,
  profilePicture: `h-24 w-24 md:h-32 md:w-32 rounded-full border-2 border-[#8a939b] mb-4`,
  addressContainer: `flex  mb-2`,
  address: `  mb-2 text-center`,
  balance: `text-md text-[#8a939b] mb-4`,
  qrCodeContainer: `flex flex-col items-center`,
  qrCodeLabel: `text-md font-semibold mb-2`,
  nftsSection: `w-full max-w-[90%]  rounded-lg p-4`,
  nftGrid: `flex flex-wrap justify-center gap-1`, // Grid layout for NFTs

  nftCard: `bg-[#212121] w-[200px] mb-3 rounded-md  overflow-hidden`,
  nftImg: `w-[200px] h-48 ml-[3px] mt-[3px] rounded-t-md cursor-pointer    object-cover`, // Removed redundant w-full
  info: `flex justify-between text-white drop-shadow-xl ml-2 mr-2`,
  infoLeft: `flex-0.6 flex-wrap`,
  assetName: `font-bold mt-1`, // Responsive text sizes
};

const Profile = () => {
  const [userNFTList, setuserNFTList] = useState(null);
const [userAccount,setUserAccount] = useState(null)
  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: userIcpBalance } = useQuery({
    queryKey: ["userIcpBalance"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: userNFTS } = useQuery({
    queryKey: ["userNFTS"],
  });

  const navigate = useNavigate();


  useEffect(()=>{

    if(!userPrincipal) return

    let res = AccountIdentifier.fromPrincipal({principal:Principal.fromText(userPrincipal),subAccount:[]}).toHex(
    )

    setUserAccount(res)

  },[userPrincipal])


  useEffect(() => {
    const fetchUserListedNFTS = async () => {
      try {
        let NFTArray = [];
        if (!userPrincipal || !marketplaceActor) return;
        let res = await marketplaceActor?.get_all_user_listed_nfts(
          Principal.fromText(userPrincipal)
        );

        console.log("heeee :",res.data[0]);
        

        if (
          res.status == 200 &&
          res.status_text == "Ok" &&
          res.data[0].length > 0
        ) {
          for (const data of res.data[0]) {
            NFTArray.push({
              nftid: data.nft_id,
              type: "Listed",
              canister_id: data.nft_canister,
              collectionName: Object.keys(data.nft_category)[0],
            });
          }
        }

        let accIdentifier = AccountIdentifier.fromPrincipal({
          principal: Principal.fromText(userPrincipal),
          subAccount: undefined,
        }).toHex();

        let ownedTokens = await nftActor?.tokens(accIdentifier);

        let tokens = Array.from(ownedTokens?.ok);
        console.log("ahaha :",tokens);
        

        if (tokens && tokens.length > 0) {
          for (const data of tokens) {
            NFTArray.push({
              nftid: data,
              type: "Owned",
              canister_id: "rw7qm-eiaaa-aaaak-aaiqq-cai",
              collectionName: "Kitties",
            });
          }
        }
        console.log("aaaaa :", NFTArray);

        setuserNFTList(NFTArray);
      } catch (error) {
        console.log("error in fetching user listed NFTs", error);
      }
    };

    fetchUserListedNFTS();
  }, [userPrincipal, marketplaceActor, nftActor,userNFTS]);

  const userAddress = userPrincipal || "0x1234567890abcdef"; 
  const userBalance = userIcpBalance || 100; 

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    alert("Address copied to clipboard!");
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 11)}...${address.slice(-7)}`;
  };

  return (
    <>
      {userPrincipal ? (
        <div className={style.wrapper}>
          <div className={style.profileSection}>
            <div className={style.addressContainer}>
              <div className={style.address}>{userAddress && shortenAddress(userAddress)}</div>
              <AiOutlineCopy
                onClick={handleCopyAddress}
                className="cursor-pointer text-lg hover:text-blue-500"
              />
            </div>
            <div className={style.addressContainer}>
              <div className={style.address}>{userAccount &&shortenAddress(userAccount)}</div>
              <AiOutlineCopy
                onClick={handleCopyAddress}
                className="cursor-pointer text-lg hover:text-blue-500"
              />
            </div>
            <TransferICP/>
            
            {/* <div>{userIcpBalance && userIcpBalance} ICP</div> */}

           
          </div>

          {/* NFTs Section */}
          <div className={style.nftsSection}>
            <h2 className="text-xl font-semibold mb-4 text-center">My NFTs</h2>

            <div className={style.nftGrid}>
              {userNFTList && userNFTList.length > 0 ? (
                userNFTList.map((nft, index) => (
                  <div className={style.nftCard}>
                    <img
                      src={`https://${
                        nft.canister_id
                      }.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
                        nft.nftid,
                        nft.canister_id
                      )}&type=thumbnail`}
                      alt=""
                      onClick={() =>
                        navigate(
                          nft.type === "Listed" &&
                            "../marketplace/" +
                              nft.canister_id +
                              "/" +
                              nft.nftid
                          // : "../nft/" + nft.canister_id + "/" + nft.nftid
                        )
                      }
                      className={style.nftImg}
                    />
                    <div className={style.info}>
                      <div className={style.infoLeft}>
                        <div className={style.collectionName}>
                          {nft.collectionName}
                        </div>
                      </div>
                      <div className={style.infoRight}>
                        <div className={style.assetName}>#{nft.nftid} </div>
                      </div>
                    </div>
                    {nft.type == "Owned" ? (
                      <div className="flex flex-row mt-4 gap-2 justify-center items-center">
                      <ListNFT nft={nft} />
                      <TransferNFT nft={nft}/>
                      </div>
                    ) : (
                      <UnlistUpdate
                        nft={computeExtTokenIdentifier(
                          nft.nftid,
                          nft.canister_id
                        )}
                      />
                    )}
                  </div>

                
                ))
              ) : (
                <div className={style.profileSection}>
                  <p>No NFTs found.</p>
                <p>Your NFTS will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Profile;
