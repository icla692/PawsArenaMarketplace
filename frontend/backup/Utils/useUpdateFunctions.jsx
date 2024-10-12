import { AccountIdentifier } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { computeExtTokenIdentifier } from './tid';
import { MARKETPLACE_CANISTER, PAWS_ARENA_CANISTER } from './constants';

const useUpdateFunctions = () => {

    const queryClient = useQueryClient();


  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: userIcpBalance } = useQuery({
    queryKey: ["userIcpBalance"],
  });

  const { data: allListings } = useQuery({
    queryKey: ["allListings"],
  });


  const { data: IcpActor } = useQuery({
    queryKey: ["IcpActor"],
  });

  const { data: userNFTS } = useQuery({
    queryKey: ["userNFTS"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });


 

  const loadUserBalance = async ()=>{
    if(!IcpActor || !userPrincipal) return { err: 'not allowed' }

    let accID = AccountIdentifier.fromPrincipal({principal : Principal.fromText(userPrincipal)}).toHex()

    let balance = IcpActor.icrc1_balance_of({
      owner : Principal.fromText(userPrincipal),
      subaccount:[]
    }
  )
console.log("dddweifnweui");

      await queryClient.setQueryData(["userIcpBalance"], Number(balance));
      return Number(balance)
  }
  

  const loadUserNFTS = async ()=>{
    if(!nftActor || !userPrincipal) return { err: 'not allowed' }

    let accID = AccountIdentifier.fromPrincipal({principal : Principal.fromText(userPrincipal)}).toHex()
      let tokens = await nftActor.tokens(accID);
      if(tokens.ok){
        await queryClient.setQueryData(["userNFTS"], Array.from(tokens.ok));
      }
      console.log("ccccccccccccc");
      
  }

 

  const loadMarketplaceListings = async ()=>{
    if(!marketplaceActor) return { err: 'not allowed' }

    let allListings = await marketplaceActor.get_all_listed_nfts();
    console.log("bbbbbbbbbbbbbb");
    
    await queryClient.setQueryData(["allListings"], allListings.data[0]);
  }


  const info = useQuery({
    queryKey: ['userIcpBalance'],
    queryFn: loadUserBalance(),
    retry:false,
    retryOnMount:false
  });


  const dat = useQuery({
    queryKey: ['userNFTS'],
    queryFn: loadUserNFTS(),
    retry:false,
    retryOnMount:false
  });

  const list = useQuery({
    queryKey: ['allListings'],
    queryFn: loadMarketplaceListings(),
    retry:false,
    retryOnMount:false
  });


  const { mutateAsync: HandleBuy } = useMutation({
    mutationFn: (token) => handleBuy(token),
    onSuccess: async () => {
      await invalidateMarketplaceListings();
      await invalidateUserBalamce();
      await invalidateUserNFTS();
    },
  });

  const handleBuy = async (token) => {
    // console.log("dd", token.nftid);

    //approve the marketplace to transfer funds on the user/s behalf
    let approveResults = await IcpActor.icrc2Approve({
      fee: undefined,
      memo: undefined,
      from_subaccount: undefined,
      created_at_time: undefined,
      amount: 2000000,
      expected_allowance: undefined,
      expires_at: undefined,
      spender: {
        owner: Principal.fromText(MARKETPLACE_CANISTER),
        subaccount: [],
      },
    });

     console.log("approve results :", approveResults);

    if (!marketplaceActor) return;
    if (!window.confirm("buy this nft?")) return;

    let res = await marketplaceActor.buy_nft(token.nftid);

    console.log("buy results :", res);
  };





  const { mutateAsync: HandleList } = useMutation({
    mutationFn: (data) => handleList(data),
    onSuccess: async () => {
      await invalidateMarketplaceListings();
      await invalidateUserBalamce();
      await invalidateUserNFTS();
    },
  });





  const handleList = async (nftid) => {

    if (!marketplaceActor || !nftActor) return;

    if(!window.confirm("are you sure you want to list the nft")) return
    try {
      //call the init function on the marketplace
      let initRes = await marketplaceActor.init_list_nft(
        Principal.fromText(userPrincipal),
        nftid,
        { Kitties: null },
        parseInt(2000000)
      );
      console.log("init res 1 :", initRes);
      //tranafer the nft to the markeptlACE

      let tokenIdentifier = computeExtTokenIdentifier(
        nftid,
        PAWS_ARENA_CANISTER
      );
      let transferRes = await nftActor.transfer({
        amount: parseInt(1),
        from: { principal: Principal.fromText(userPrincipal) },
        memo: [],
        notify: false,
        subaccount: [],
        to: { principal: Principal.fromText(MARKETPLACE_CANISTER) },
        token: tokenIdentifier, //token identifier
      });

      console.log("transfer result 2 :", transferRes);
      //COMPLETE THE NFT LISTING PART

      let fin = await marketplaceActor.complete_listing(
        Principal.fromText(userPrincipal),
        nftid,
        { Kitties: null }
      );
      console.log("final listing 3:", fin);
      if(fin.status === 200 && fin.status_text == "Ok"){
        alert("nft listed successfully")
      }else{
        alert(fin.status_error)
      }
    } catch (error) {
      console.log("error in listing nft :", error);
    }
  };


  


















  async function invalidateUserBalamce() {
    await queryClient.invalidateQueries(['userIcpBalance']);
  }

  async function invalidateUserNFTS() {
    await queryClient.invalidateQueries(['userNFTS']);
  }

  async function invalidateMarketplaceListings() {
    await queryClient.invalidateQueries(['allListings']);
  }


  return {
    invalidateMarketplaceListings,
    invalidateUserNFTS,
    invalidateUserBalamce,
    loadMarketplaceListings,
    loadUserBalance,
    loadUserNFTS,
    HandleList,
    HandleBuy
  }
}

export default useUpdateFunctions
