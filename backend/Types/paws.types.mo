// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type AccountIdentifier = Text;
  public type AccountIdentifier__1 = Text;
  public type Balance = Nat;
  public type BalanceRequest = { token : TokenIdentifier; user : User };
  public type BalanceResponse = { #ok : Balance; #err : CommonError__1 };
  public type Balance__1 = Nat;
  public type CommonError = { #InvalidToken : TokenIdentifier; #Other : Text };
  public type CommonError__1 = {
    #InvalidToken : TokenIdentifier;
    #Other : Text;
  };
  public type Extension = Text;
  public type HeaderField = (Text, Text);
  public type HttpRequest = {
    url : Text;
    method : Text;
    body : Blob;
    headers : [HeaderField];
  };
  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?HttpStreamingStrategy;
    status_code : Nat16;
  };
  public type HttpStreamingCallbackResponse = {
    token : ?HttpStreamingCallbackToken;
    body : Blob;
  };
  public type HttpStreamingCallbackToken = {
    key : Text;
    sha256 : ?Blob;
    index : Nat;
    content_encoding : Text;
  };
  public type HttpStreamingStrategy = {
    #Callback : {
      token : HttpStreamingCallbackToken;
      callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse;
    };
  };
  public type ListRequest = {
    token : TokenIdentifier__1;
    from_subaccount : ?SubAccount__1;
    price : ?Nat64;
  };
  public type Listing = { locked : ?Time; seller : Principal; price : Nat64 };
  public type Memo = Blob;
  public type Metadata = {
    #fungible : {
      decimals : Nat8;
      metadata : ?Blob;
      name : Text;
      symbol : Text;
    };
    #nonfungible : { metadata : ?Blob };
  };
  public type MintingRequest = { to : AccountIdentifier__1; asset : Nat32 };
  public type Result = { #ok : Text; #err : Text };
  public type Result_1 = {
    #ok : [(TokenIndex, ?Listing, ?Blob)];
    #err : CommonError;
  };
  public type Result_10 = {
    #ok : (AccountIdentifier__1, ?Listing);
    #err : CommonError;
  };
  public type Result_2 = { #ok : [TokenIndex]; #err : CommonError };
  public type Result_3 = { #ok : Balance__1; #err : CommonError };
  public type Result_4 = { #ok; #err : CommonError };
  public type Result_5 = { #ok; #err : Text };
  public type Result_6 = { #ok : (AccountIdentifier__1, Nat64); #err : Text };
  public type Result_7 = { #ok : Metadata; #err : CommonError };
  public type Result_8 = { #ok : AccountIdentifier__1; #err : CommonError };
  public type Result_9 = { #ok : Metadata; #err : Text };
  public type Sale = {
    expires : Time;
    subaccount : SubAccount__1;
    tokens : [TokenIndex];
    buyer : AccountIdentifier__1;
    price : Nat64;
  };
  public type SaleTransaction = {
    time : Time;
    seller : Principal;
    tokens : [TokenIndex];
    buyer : AccountIdentifier__1;
    price : Nat64;
  };
  public type Settlement = {
    subaccount : SubAccount__1;
    seller : Principal;
    buyer : AccountIdentifier__1;
    price : Nat64;
  };
  public type SubAccount = Blob;
  public type SubAccount__1 = Blob;
  public type Time = Int;
  public type TokenIdentifier = Text;
  public type TokenIdentifier__1 = Text;
  public type TokenIndex = Nat32;
  public type TokenIndex__1 = Nat32;
  public type Transaction = {
    token : TokenIdentifier__1;
    time : Time;
    seller : Principal;
    buyer : AccountIdentifier__1;
    price : Nat64;
  };
  public type TransferRequest = {
    to : User;
    token : TokenIdentifier;
    notify : Bool;
    from : User;
    memo : Memo;
    subaccount : ?SubAccount;
    amount : Balance;
  };
  public type TransferResponse = {
    #ok : Balance;
    #err : {
      #CannotNotify : AccountIdentifier;
      #InsufficientBalance;
      #InvalidToken : TokenIdentifier;
      #Rejected;
      #Unauthorized : AccountIdentifier;
      #Other : Text;
    };
  };
  public type User = { #principal : Principal; #address : AccountIdentifier };
  public type Self = actor {
    acceptCycles : shared () -> async ();
    addAsset : shared (Text, Text) -> async Text;
    addThumb : shared (Text, Text) -> async Text;
    adminKillHeartbeat : shared () -> async ();
    adminStartHeartbeat : shared () -> async ();
    allPayments : shared query () -> async [(Principal, [SubAccount__1])];
    allSettlements : shared query () -> async [(TokenIndex, Settlement)];
    availableCycles : shared query () -> async Nat;
    balance : shared query BalanceRequest -> async BalanceResponse;
    bearer : shared query TokenIdentifier__1 -> async Result_8;
    caller : shared () -> async (Text, Text, Bool, Bool);
    clearPayments : shared (Principal, [SubAccount__1]) -> async ();
    cronCapEvents : shared () -> async ();
    cronDisbursements : shared () -> async ();
    cronSettlements : shared () -> async ();
    details : shared query TokenIdentifier__1 -> async Result_10;
    equip : shared (TokenIndex, TokenIndex) -> async Result;
    extensions : shared query () -> async [Extension];
    failedSales : shared query () -> async [
        (AccountIdentifier__1, SubAccount__1)
      ];
    getAssets : shared query () -> async [(Text, Text)];
    getGenes : shared query () -> async [Blob];
    getLayerIdxFromWearableToken : shared query TokenIndex -> async Nat;
    getLayerIdxFromWearableTokenArray : shared query [TokenIndex] -> async [
        Nat
      ];
    getLayerSVGFromWearableTokenId : shared query TokenIndex -> async Text;
    getMergedSVG : shared query TokenIndex -> async Text;
    getMergedSVGForSingleLayer : shared query (Nat, TokenIndex) -> async Text;
    getMinter : shared query () -> async Principal;
    getOriginalTokens : shared (TokenIndex__1, ?Blob) -> async (
        TokenIndex__1,
        ?Blob,
      );
    getOwners : shared query () -> async [(AccountIdentifier__1, [TokenIndex])];
    getRegistry : shared query () -> async [(TokenIndex, AccountIdentifier__1)];
    getTokens : shared query () -> async [(TokenIndex, Metadata)];
    getWearableArrayMetadata : shared query [TokenIndex] -> async [Result_9];
    getWearableMetadata : shared query TokenIndex -> async Result_9;
    heartbeat_external : shared () -> async ();
    heartbeat_pending : shared query () -> async [(Text, Nat)];
    historicExport : shared () -> async Bool;
    http_request : shared query HttpRequest -> async HttpResponse;
    http_request_streaming_callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse;
    importOriginalRegistry : shared () -> async Bool;
    importSalesTransactions : shared () -> async [SaleTransaction];
    importWearablesMetadata : shared () -> async Result;
    initCap : shared () -> async ();
    isHeartbeatRunning : shared query () -> async Bool;
    list : shared ListRequest -> async Result_4;
    listings : shared query () -> async [(TokenIndex, Listing, Metadata)];
    lock : shared (
        TokenIdentifier__1,
        Nat64,
        AccountIdentifier__1,
        SubAccount__1,
      ) -> async Result_8;
    metadata : shared query TokenIdentifier__1 -> async Result_7;
    mintNFT : shared MintingRequest -> async TokenIndex;
    payments : shared query () -> async ?[SubAccount__1];
    reserve : shared (
        Nat64,
        Nat64,
        AccountIdentifier__1,
        SubAccount__1,
      ) -> async Result_6;
    retreive : shared AccountIdentifier__1 -> async Result_5;
    saleTransactions : shared query () -> async [SaleTransaction];
    salesSettlements : shared query () -> async [(AccountIdentifier__1, Sale)];
    salesStats : shared query AccountIdentifier__1 -> async (
        Nat,
        ?Time,
        (Text, Nat64, Nat64, Bool),
        Bool,
      );
    setMinter : shared Principal -> async ();
    settle : shared TokenIdentifier__1 -> async Result_4;
    settlements : shared query () -> async [
        (TokenIndex, AccountIdentifier__1, Nat64)
      ];
    stats : shared query () -> async (
        Nat64,
        Nat64,
        Nat64,
        Nat64,
        Nat,
        Nat,
        Nat,
      );
    supply : shared query TokenIdentifier__1 -> async Result_3;
    tokens : shared query AccountIdentifier__1 -> async Result_2;
    tokens_ext : shared query AccountIdentifier__1 -> async Result_1;
    transactions : shared query () -> async [Transaction];
    transfer : shared TransferRequest -> async TransferResponse;
    unequip : shared (TokenIndex, TokenIndex) -> async Result;
  }
}