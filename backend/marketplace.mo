import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import PawsTypes "Types/paws.types";
import PostnftTypes "Types/postnft.types";
import Types "Types/Types";
import ExtCore "motoko/ext/Core";
import IcptokenTypes "Types/icptoken.types";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";

actor class () = this {

    type ListNFTData = Types.ListedNFTData;
    type NFT_CATEGORY = Types.NFT_CATEGORY;
    type Response<T> = Types.Response<T>;
    type OfferData = Types.OfferData;
    type SaleTransaction = Types.SaleTransaction;
    type OwnedNFT = Types.OwnedNFT;
    stable var KITTIES_CANISTER_ID : Text = "rw7qm-eiaaa-aaaak-aaiqq-cai";
    stable var MARKEPTLACE_ACCOUNT_IDENTIFIER : Text = "5a1ed575be49c5e9971dceb72e19821da9e26206572a333177f6dc46933b00cc";

    let icp_token_canister = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai") : IcptokenTypes.Self;

    stable var nftOfferCount : Nat32 = 0;

    private stable var NftListings : [(Text, ListNFTData)] = [];
    private var NftListingHashMap = HashMap.fromIter<Text, ListNFTData>(
        Iter.fromArray(NftListings),
        Iter.size(Iter.fromArray(NftListings)),
        Text.equal,
        Text.hash,
    );

    private stable var SaleTransaction : [(Text, [SaleTransaction])] = [];
    private var TransactionsHashMap = HashMap.fromIter<Text, [SaleTransaction]>(
        Iter.fromArray(SaleTransaction),
        Iter.size(Iter.fromArray(SaleTransaction)),
        Text.equal,
        Text.hash,
    );

    //get all transactions from the marketplace
    public query func salesTransactions() : async Response<[[SaleTransaction]]> {
        let allData = Iter.toArray<[SaleTransaction]>(TransactionsHashMap.vals());
        return {
            status = 200;
            status_text = "Ok";
            data = ?allData;
            error_text = null;
        };
    };

    //get transaction history for a specific nft
    public query func get_nft_sale_history(tokenId : Text) : async Response<[SaleTransaction]> {

        // let tempBuff = Buffer.Buffer<SaleTransaction>(0);
        // for ((_, nft) in TransactionsHashMap.entries()) {
        //     if (nft.token == tokenId) {
        //         tempBuff.add(nft);
        //     };
        // };

        // let dat = TransactionsHashMap.get(tokenId);

        return {
            status = 200;
            status_text = "Ok";
            data = TransactionsHashMap.get(tokenId);
            error_text = null;
        };
    };

    //initialize the listing the on the marketplace
    public shared func init_list_nft(caller : Principal, nftid : Nat, nftcategory : NFT_CATEGORY, amount : Nat) : async Response<Text> {
        //get the canister id of the nft to be listed
        let nftcanisterId = switch (nftcategory) {
            case (#Kitties) { KITTIES_CANISTER_ID };
            case (_) { KITTIES_CANISTER_ID };
        };

        //create the nft canister actor
        let nftcanisterActor = switch (nftcategory) {
            case (#Kitties) { actor (nftcanisterId) : PawsTypes.Self };
            case (_) { actor (nftcanisterId) : PawsTypes.Self }; //change this to the relevant actor definition
        };

        //get the token identifier of the nft to be listed
        let tokenIdentifier = ExtCore.TokenIdentifier.fromPrincipal(Principal.fromText(nftcanisterId), Nat32.fromNat(nftid));
        //get the account of the caller
        let userAccountId = ExtCore.User.toAID(#principal caller);

        switch (NftListingHashMap.get(tokenIdentifier)) {
            case (?data) {
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft already listed";
                };
            };
            case (null) {

                //get the current owner of the nft
                let currentOwner = switch (await nftcanisterActor.bearer(tokenIdentifier)) {
                    case (#ok(value)) { value };
                    case (#err(error)) { "" };
                };

                if (currentOwner == userAccountId) {
                    //intialize listing
                    NftListingHashMap.put(
                        tokenIdentifier,
                        {
                            seller_principal = caller;
                            nft_price = amount;
                            seller_identifier = userAccountId;
                            nft_id = Nat32.fromNat(nftid);
                            token_identifier = tokenIdentifier;
                            nft_canister = nftcanisterId;
                            isConfirmed = false;
                            offers = [];
                            nft_category = nftcategory;
                            date_of_listing = Time.now();
                        },
                    );

                    return

                    {
                        status = 200;
                        status_text = "OK";
                        data = null;
                        error_text = null;
                    };

                } else {
                    {
                        status = 200;
                        status_text = "OK";
                        data = null;
                        error_text = ?"failed";
                    };
                };

            };
        };
    };

    //complete the nft listing for the nft
    public func complete_listing(caller : Principal, nftid : Nat, nftcategory : NFT_CATEGORY) : async Response<Text> {
        let nftcanisterId = switch (nftcategory) {
            case (#Kitties) { KITTIES_CANISTER_ID };
            case (_) { KITTIES_CANISTER_ID };
        };

        //get the token identifier of the nft to be listed
        let tokenIdentifier = ExtCore.TokenIdentifier.fromPrincipal(Principal.fromText(nftcanisterId), Nat32.fromNat(nftid));
        let nftcanisterActor = switch (nftcategory) {
            case (#Kitties) { actor (nftcanisterId) : PawsTypes.Self };
            case (_) { actor (nftcanisterId) : PawsTypes.Self }; //change this to the relevant actor definition
        };

        //check if the nft was initialized
        switch (
            NftListingHashMap.get(tokenIdentifier)
        ) {
            case (null) {
                //return an error
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not found";
                };
            };
            case (?data) {
                //get the current owner of the nft, it should be the markeptlace
                let currentOwner = switch (await nftcanisterActor.bearer(tokenIdentifier)) {
                    case (#ok(value)) { value };
                    case (#err(error)) { "" };
                };

                if (currentOwner == MARKEPTLACE_ACCOUNT_IDENTIFIER and caller == data.seller_principal) {
                    //confirm the listing
                    NftListingHashMap.put(tokenIdentifier, { data with isConfirmed = true });

                    return {
                        status = 200;
                        status_text = "Ok";
                        data = null;
                        error_text = null;
                    };

                } else {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"please trasnfer the nft to the marketplace first";
                    };
                };
            };
        };
    };
    ////vuyvuivyuyuvu
    //get all the nfts listed by the user
    public query func get_all_user_listed_nfts(caller : Principal) : async Response<[Types.ListedNFTData]> {
        let tempBuff = Buffer.Buffer<Types.ListedNFTData>(0);
        for ((_, nft) in NftListingHashMap.entries()) {
            if (nft.seller_principal == caller) {
                tempBuff.add(nft);
            };
        };
        return {
            status = 200;
            status_text = "Ok";
            data = ?Buffer.toArray<Types.ListedNFTData>(tempBuff);
            error_text = null;
        };

    };

    // public func get_all_user_listed_nfts(user : Text) : async Response<OwnedNFT> {
    //     let tempBuffer = Buffer.Buffer<OwnedNFT>(0);

    //     for (nft in NftListingHashMap.vals()) {
    //         if (nft.seller_identifier == user) {
    //             tempBuffer.add({
    //                 collection = nft.nft_category;
    //                 nft_id = nft.nft_id;
    //                 canister_id = nft.nft_canister;
    //                 category = #Listed;

    //             });
    //         };
    //     };

    //     //fetch all the user tokens from the nft canister

    //     let ownedNFTS = await

    // };

    //get all the listed nfts
    //refactor to only return where the confirmation is true
    public query func get_all_listed_nfts() : async Response<[(Text, Types.ListedNFTData)]> {
        let data = Iter.toArray<(Text, Types.ListedNFTData)>(NftListingHashMap.entries());

        let tempBuff = Buffer.Buffer<(Text, Types.ListedNFTData)>(0);
        for ((id, nft) in NftListingHashMap.entries()) {

            if (nft.isConfirmed == true) {
                tempBuff.add((id, nft));
            };
        };

        return {
            status = 200;
            status_text = "Ok";
            data = ?Buffer.toArray(tempBuff);
            error_text = null;
        };

    };

    public query func get_all_test() : async Response<[(Text, Types.ListedNFTData)]> {
        let data = Iter.toArray<(Text, Types.ListedNFTData)>(NftListingHashMap.entries());

        // let tempBuff = Buffer.Buffer<(Text,Types.ListedNFTData)>(0);
        // for ((id,nft) in NftListingHashMap.entries()){

        //     if(nft.isConfirmed == true){
        //         tempBuff.add((id,nft));
        //     };
        // };

        return {
            status = 200;
            status_text = "Ok";
            data = ?data;
            error_text = null;
        };

    };

    //update the price of the nft on the marketplace
    public shared ({ caller }) func update_nft_price(nftidentifier : Text, newPrice : Nat) : async Response<Text> {
        switch (NftListingHashMap.get(nftidentifier)) {
            case (null) {
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft does not exist";
                };
            };
            case (?data) {
                if (data.seller_principal == caller) {
                    NftListingHashMap.put(nftidentifier, { data with nft_price = newPrice });
                    return {
                        status = 200;
                        status_text = "Ok";
                        data = null;
                        error_text = null;
                    };

                } else {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"caller is not the owner of the nft";
                    };
                };
            };
        };
    };

    //remove the nft from the marketplace
    public shared ({ caller }) func un_list_nft(nftidentifier : Text) : async Response<Text> {

        switch (NftListingHashMap.get(nftidentifier)) {
            case (null) {
                return

                {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not listed";
                };

            };
            case (?data) {

                //check if the caller is the owner of the nft
                if (caller == data.seller_principal) {

                    //transfer the nft back to the user

                    let results = await transferNftFromMarketplace(data.seller_principal, data.token_identifier, data.nft_category);
                    if (results == true) {
                        ignore NftListingHashMap.remove(nftidentifier);

                        return {
                            status = 200;
                            status_text = "Ok";
                            data = null;
                            error_text = null;
                        };
                    } else {

                        {
                            status = 200;
                            status_text = "error";
                            data = null;
                            error_text = ?"unable to transfer nft back to the user";
                        };

                    };

                    //delete from marketplace

                } else {
                    return

                    {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"caller is not the owner of the nft";
                    };

                };

            };
        };

    };

    //claim an nft incase you send the nft to the marketplace and it fails to list
    public shared ({ caller }) func claim_nft(nft_id : Text) : async Text {
        return "";
    };

    //buy the nft directly from the marketplace
    public shared ({ caller }) func buy_nft(nft_id : Text) : async Response<Text> {
        //check if the nft is available

        switch (NftListingHashMap.get(nft_id)) {
            case (null) {

                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not available";
                };

            };
            case (?data) {
                //check if the caller is not the one who liisted the nft
                if (caller == data.seller_principal) {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"owner cant buy their own nft";
                    };

                };
                //check the allowance of the marketplace from the callers account

                let allowanceResults = await icp_token_canister.icrc2_allowance({
                    account = {
                        owner = caller;
                        subaccount = null;
                    };
                    spender = {
                        owner = Principal.fromActor(this);
                        subaccount = null;
                    };
                });

                //check if the allowance is enough
                if (allowanceResults.allowance < data.nft_price + 10000) {
                    return

                    {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"allowance less than amount";
                    };

                };

                //transfer the amount to the canister itself
                let transferResults = await icp_token_canister.icrc2_transfer_from({
                    spender_subaccount = null;
                    from = {
                        owner = caller;
                        subaccount = null;
                    };
                    to = {
                        owner = Principal.fromActor(this);
                        subaccount = null;
                    };
                    amount = data.nft_price;
                    fee = null;
                    memo = null;
                    created_at_time = null;
                });

                switch (transferResults) {
                    case (#Ok(num)) {
                        //first transfer the nft to the user

                        let nftcanisterId = switch (data.nft_category) {
                            case (#Kitties) { KITTIES_CANISTER_ID };
                            case (_) { KITTIES_CANISTER_ID };
                        };

                        //get the token identifier of the nft to be listed
                        let nftcanisterActor = switch (data.nft_category) {
                            case (#Kitties) {
                                actor (data.nft_canister) : PawsTypes.Self;
                            };
                            case (_) {
                                actor (data.nft_canister) : PawsTypes.Self;
                            }; //change this to the relevant actor definition
                        };

                        let nftTransfer = await nftcanisterActor.transfer({
                            to = #principal(caller);
                            token = data.token_identifier;
                            notify = false;
                            from = #principal(Principal.fromActor(this));
                            memo = "";
                            subaccount = null;
                            amount = 1;

                        });

                        switch (nftTransfer) {
                            case (#ok(num)) {

                                //transfer the icp to the seller
                                let res = await transferICP(data.seller_principal, data.nft_price -10000);
                                if (res == true) {
                                    //record the sale transaction

                                    let _transaction : SaleTransaction = {
                                        token = data.token_identifier;
                                        seller = data.seller_principal;
                                        price = Nat64.fromNat(data.nft_price);
                                        buyer = caller;
                                        time = Time.now();
                                    };
                                    switch (TransactionsHashMap.get(data.token_identifier)) {
                                        case (?dat) {
                                            let tempBuff = Buffer.fromArray<SaleTransaction>(dat);
                                            tempBuff.add(_transaction);
                                            TransactionsHashMap.put(data.token_identifier, Buffer.toArray(tempBuff));
                                        };
                                        case (null) {
                                            TransactionsHashMap.put(data.token_identifier, [_transaction]);
                                        };
                                    };
                                    //remove th nft from the marketplace
                                    ignore NftListingHashMap.remove(nft_id);
                                    return {
                                        status = 200;
                                        status_text = "Ok";
                                        data = null;
                                        error_text = null;
                                    };

                                } else {
                                    return {
                                        status = 200;
                                        status_text = "error";
                                        data = null;
                                        error_text = ?"error in transferring the icp";
                                    };

                                };

                            };
                            case (_) {
                                //refund the icp to the user
                                let res = await transferICP(caller, data.nft_price -10000);
                                if (res == true) {

                                    return {
                                        status = 200;
                                        status_text = "error";
                                        data = null;
                                        error_text = ?"nft transfer failed,refund successful";
                                    };

                                } else {

                                    return {
                                        status = 200;
                                        status_text = "error";
                                        data = null;
                                        error_text = ?"nft transfer failed, refund failed";
                                    };

                                };
                            };
                        };

                    };
                    case (_) {
                        return

                        {
                            status = 200;
                            status_text = "error";
                            data = null;
                            error_text = ?"cant transfer funds to the marketplace";
                        };

                    };
                };

            };
        };

    };

    //transfer icp from the markeptlace to the user
    func transferICP(recipient : Principal, amount : Nat) : async Bool {
        try {

            let results = await icp_token_canister.icrc1_transfer({
                to = {
                    owner = recipient;
                    subaccount = null;
                };
                fee = null;
                memo = null;
                from_subaccount = null;
                created_at_time = null;
                amount;

            });

            switch (results) {
                case (#Ok(num)) { return true };
                case (_) { return false };
            };

        } catch (error) {
            return false;
        };

    };

    //transfer icp from the markeptlace to the user
    func transferFromICP(from : Principal, amount : Nat) : async Bool {
        try {

            let results = await icp_token_canister.icrc2_transfer_from({
                spender_subaccount = null;
                from = {
                    owner = from;
                    subaccount = null;
                };
                to = {
                    owner = Principal.fromActor(this);
                    subaccount = null;
                };
                amount;
                fee = null;
                memo = null;
                created_at_time = null;

            });

            switch (results) {
                case (#Ok(num)) { return true };
                case (_) { return false };
            };

        } catch (error) {
            return false;
        };

    };

    //place an offer for the nft listed on the markeplace
    public shared ({ caller }) func place_offer_on_nft(nft_id : Text, amount : Nat, expiry_date : Int) : async Response<Text> {

        switch (NftListingHashMap.get(nft_id)) {
            case (null) {
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not listed on the marketplace";
                };
            };
            case (?data) {
                //check if the caller is the owner of the nft
                if (data.seller_principal == caller) {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"you cant make an offer on your own nft";
                    };
                };

                let tempBuff = Buffer.fromArray<OfferData>(data.offers);
                tempBuff.add({
                    offer_id = nftOfferCount;
                    user = caller;
                    amount = amount;
                    expiry_date = expiry_date;
                });

                nftOfferCount := nftOfferCount +1;
                NftListingHashMap.put(nft_id, { data with offers = Buffer.toArray<OfferData>(tempBuff) });
                return {
                    status = 200;
                    status_text = "Ok";
                    data = null;
                    error_text = null;
                };

            };
        };
    };

    public shared ({ caller }) func cancel_offer(offerId : Nat32, nftId : Text) : async Response<Text> {

        switch (NftListingHashMap.get(nftId)) {
            case (?data) {

                let tempBuff = Buffer.fromArray<OfferData>(data.offers);
                tempBuff.filterEntries(func(_, x) = x.offer_id != offerId);
                NftListingHashMap.put(nftId, { data with offers = Buffer.toArray(tempBuff) });
                return {
                    status = 200;
                    status_text = "Ok";
                    data = null;
                    error_text = null;
                };

            };
            case (null) {

                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft does not exist";
                };
            };
        };

    };

    //get listed nft details

    public query func get_listed_nft_details(nft_id : Text) : async Response<Types.ListedNFTData> {

        switch (NftListingHashMap.get(nft_id)) {
            case (null) {
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not found";
                };
            };
            case (?data) {

                return {
                    status = 200;
                    status_text = "Ok";
                    data = ?data;
                    error_text = null;
                };
            };
        };

    };

    //accept offer by the seller of the nft

    public shared ({ caller }) func accept_offer(nft_id : Text, offer_id : Nat32) : async Response<Text> {

        switch (NftListingHashMap.get(nft_id)) {
            case (null) {
                return {
                    status = 200;
                    status_text = "error";
                    data = null;
                    error_text = ?"nft not found";
                };
            };
            case (?data) {

                let offerResults = _getBIdderData(data.offers, offer_id);

                if (Array.size(offerResults) != 1) {
                    return

                    {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?" offer with that id not found";
                    };
                };

                let offer = offerResults[0];

                if (offer.expiry_date < Time.now()) {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"offer already expired";
                    };
                };

                //1730947002958069433
                //1731377678446000128
                //check the allowance of the markeplace
                let allowanceResults = await icp_token_canister.icrc2_allowance({
                    account = {
                        owner = offer.user;
                        subaccount = null;
                    };
                    spender = {
                        owner = Principal.fromActor(this);
                        subaccount = null;
                    };
                });

                //get the balance of the user that made the offer
                let userBalance = await icp_token_canister.icrc1_balance_of({
                    owner = offer.user;
                    subaccount = null;
                });

                if (userBalance < offer.amount + 10000) {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?" user does not have enough funds";
                    };
                };

                if (allowanceResults.allowance < offer.amount + 10000) {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?" allowance less than the offer amoount";
                    };
                };

                //transfer the icp to the marketplace
                let transferResults = await transferFromICP(offer.user, offer.amount);
                if (transferResults == true) {
                    //transfer the nft
                    let nftTransfer = await transferNftFromMarketplace(offer.user, nft_id, data.nft_category);

                    if (nftTransfer == true) {
                        //transfer the icp to the seller
                        let res = await transferICP(data.seller_principal, offer.amount -10000);
                        if (res == true) {
                            //save data to cofirm transaction

                            let _transaction : SaleTransaction = {
                                token = data.token_identifier;
                                seller = data.seller_principal;
                                price = Nat64.fromNat(data.nft_price);
                                buyer = caller;
                                time = Time.now();
                            };

                            switch (TransactionsHashMap.get(data.token_identifier)) {
                                case (?dat) {

                                    let tempBuff = Buffer.fromArray<SaleTransaction>(dat);
                                    tempBuff.add(_transaction);
                                    TransactionsHashMap.put(data.token_identifier, Buffer.toArray(tempBuff));
                                };
                                case (null) {
                                    TransactionsHashMap.put(data.token_identifier, [_transaction]);

                                };
                            };

                            //remove the nft from the marketplace listing
                            ignore NftListingHashMap.remove(nft_id);

                            return {
                                status = 200;
                                status_text = "Ok";
                                data = null;
                                error_text = null;
                            };

                        } else {

                            //save data to enable claim
                            return {
                                status = 200;
                                status_text = "error";
                                data = null;
                                error_text = ?"error in transferring the icp";
                            };

                        };

                    } else {
                        //refund the user their icp
                        let res = await transferICP(offer.user, offer.amount -10000);
                        if (res == true) {
                            //save data to cofirm transaction
                            return {
                                status = 200;
                                status_text = "Ok";
                                data = null;
                                error_text = null;
                            };

                        } else {
                            //save data to enable claim
                            return {
                                status = 200;
                                status_text = "error";
                                data = null;
                                error_text = ?"error in transferring the icp";
                            };
                        };
                    };

                } else {
                    return {
                        status = 200;
                        status_text = "error";
                        data = null;
                        error_text = ?"error in transferring the icp to the marketplace";
                    };
                };
            };
        };
    };

    func _getBIdderData(bids : [OfferData], bidID : Nat32) : [OfferData] {
        let _bidder = Buffer.Buffer<OfferData>(0);
        for (_bid in bids.vals()) {
            if (_bid.offer_id == bidID) {
                _bidder.add(_bid);
            };
        };
        return Buffer.toArray<OfferData>(_bidder);
    };

    //transfer the nft from the marketplace.
    func transferNftFromMarketplace(recipient : Principal, token_id : Text, nftcategory : NFT_CATEGORY) : async Bool {
        let nftcanisterId = switch (nftcategory) {
            case (#Kitties) { KITTIES_CANISTER_ID };
            case (_) { KITTIES_CANISTER_ID };
        };
        //create the nft canister actor
        let nftcanisterActor = switch (nftcategory) {
            case (#Kitties) { actor (nftcanisterId) : PawsTypes.Self };
            case (_) { actor (nftcanisterId) : PawsTypes.Self }; //change this to the relevant actor definition
        };

        let nftTransfer = await nftcanisterActor.transfer({
            to = #principal(recipient);
            token = token_id;
            notify = false;
            from = #principal(Principal.fromActor(this));
            memo = "";
            subaccount = null;
            amount = 1;
        });

        switch (nftTransfer) {
            case (#ok(num)) { return true };
            case (_) { return false };
        };
    };

    public func transferNftMarketplace(recipient : Principal, token_id : Text, nftcategory : NFT_CATEGORY) : async Bool {
        let nftcanisterId = switch (nftcategory) {
            case (#Kitties) { KITTIES_CANISTER_ID };
            case (_) { KITTIES_CANISTER_ID };
        };
        //create the nft canister actor
        let nftcanisterActor = switch (nftcategory) {
            case (#Kitties) { actor (nftcanisterId) : PawsTypes.Self };
            case (_) { actor (nftcanisterId) : PawsTypes.Self }; //change this to the relevant actor definition
        };

        let nftTransfer = await nftcanisterActor.transfer({
            to = #principal(recipient);
            token = token_id;
            notify = false;
            from = #principal(Principal.fromActor(this));
            memo = "";
            subaccount = null;
            amount = 1;
        });

        switch (nftTransfer) {
            case (#ok(num)) { return true };
            case (_) { return false };
        };
    };

    //add persisted storage.
    system func preupgrade() {
        NftListings := Iter.toArray(NftListingHashMap.entries());
        SaleTransaction := Iter.toArray(TransactionsHashMap.entries());
    };

    system func postupgrade() {
        NftListings := [];
        SaleTransaction := [];
    };

};
