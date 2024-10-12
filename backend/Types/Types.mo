import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
module {

    public type Response<T> = {
        status : Nat16;
        status_text : Text;
        data : ?T;
        error_text : ?Text;
    };

    public type ListedNFTData = {
        seller_principal : Principal;
        seller_identifier : Text;
        nft_id : Nat32;
        nft_price : Nat;
        nft_category : NFT_CATEGORY;
        token_identifier : Text;
        nft_canister : Text;
        isConfirmed : Bool;
        offers : [OfferData];
        date_of_listing : Int;
    };

    public type NFT_CATEGORY = {
        //  #Shards;
        #Kitties;
        //  #Milk
    };
    //bidder to place a
    public type OfferData = {
        offer_id:Nat32;
        user : Principal;
        amount : Nat;
        expiry_date : Int;
    };

//claim funds incase of funds not transfered
public type ClaimData={
    id:Nat;
    claimer:Principal;
    amount:Nat;
    settled:Bool;
};

public type OwnedNFT={
    collection:NFT_CATEGORY;
    nft_id:Nat32;
    canister_id:Text;
    category:{#Listed;#Owned}
}

// type SaleTransaction = {
//     tokens : [TokenIndex];
//     seller : Principal;
//     price : Nat64;
//     buyer : AccountIdentifier;
//     time : Time;
//   };


};
