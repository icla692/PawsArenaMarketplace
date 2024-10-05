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

};
