export const idlFactory = ({ IDL }) => {
    const SubAccount__1 = IDL.Vec(IDL.Nat8);
    const TokenIndex = IDL.Nat32;
    const AccountIdentifier__1 = IDL.Text;
    const Settlement = IDL.Record({
      'subaccount' : SubAccount__1,
      'seller' : IDL.Principal,
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const TokenIdentifier = IDL.Text;
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const BalanceRequest = IDL.Record({
      'token' : TokenIdentifier,
      'user' : User,
    });
    const Balance = IDL.Nat;
    const CommonError__1 = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const BalanceResponse = IDL.Variant({
      'ok' : Balance,
      'err' : CommonError__1,
    });
    const TokenIdentifier__1 = IDL.Text;
    const CommonError = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const Result_8 = IDL.Variant({
      'ok' : AccountIdentifier__1,
      'err' : CommonError,
    });
    const Time = IDL.Int;
    const Listing = IDL.Record({
      'locked' : IDL.Opt(Time),
      'seller' : IDL.Principal,
      'price' : IDL.Nat64,
    });
    const Result_10 = IDL.Variant({
      'ok' : IDL.Tuple(AccountIdentifier__1, IDL.Opt(Listing)),
      'err' : CommonError,
    });
    const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
    const Extension = IDL.Text;
    const TokenIndex__1 = IDL.Nat32;
    const Metadata = IDL.Variant({
      'fungible' : IDL.Record({
        'decimals' : IDL.Nat8,
        'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'name' : IDL.Text,
        'symbol' : IDL.Text,
      }),
      'nonfungible' : IDL.Record({ 'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)) }),
    });
    const Result_9 = IDL.Variant({ 'ok' : Metadata, 'err' : IDL.Text });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
      'url' : IDL.Text,
      'method' : IDL.Text,
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
    });
    const HttpStreamingCallbackToken = IDL.Record({
      'key' : IDL.Text,
      'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'index' : IDL.Nat,
      'content_encoding' : IDL.Text,
    });
    const HttpStreamingCallbackResponse = IDL.Record({
      'token' : IDL.Opt(HttpStreamingCallbackToken),
      'body' : IDL.Vec(IDL.Nat8),
    });
    const HttpStreamingStrategy = IDL.Variant({
      'Callback' : IDL.Record({
        'token' : HttpStreamingCallbackToken,
        'callback' : IDL.Func(
            [HttpStreamingCallbackToken],
            [HttpStreamingCallbackResponse],
            ['query'],
          ),
      }),
    });
    const HttpResponse = IDL.Record({
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
      'streaming_strategy' : IDL.Opt(HttpStreamingStrategy),
      'status_code' : IDL.Nat16,
    });
    const SaleTransaction = IDL.Record({
      'time' : Time,
      'seller' : IDL.Principal,
      'tokens' : IDL.Vec(TokenIndex),
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const ListRequest = IDL.Record({
      'token' : TokenIdentifier__1,
      'from_subaccount' : IDL.Opt(SubAccount__1),
      'price' : IDL.Opt(IDL.Nat64),
    });
    const Result_4 = IDL.Variant({ 'ok' : IDL.Null, 'err' : CommonError });
    const Result_7 = IDL.Variant({ 'ok' : Metadata, 'err' : CommonError });
    const MintingRequest = IDL.Record({
      'to' : AccountIdentifier__1,
      'asset' : IDL.Nat32,
    });
    const Result_6 = IDL.Variant({
      'ok' : IDL.Tuple(AccountIdentifier__1, IDL.Nat64),
      'err' : IDL.Text,
    });
    const Result_5 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
    const Sale = IDL.Record({
      'expires' : Time,
      'subaccount' : SubAccount__1,
      'tokens' : IDL.Vec(TokenIndex),
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const Balance__1 = IDL.Nat;
    const Result_3 = IDL.Variant({ 'ok' : Balance__1, 'err' : CommonError });
    const Result_2 = IDL.Variant({
      'ok' : IDL.Vec(TokenIndex),
      'err' : CommonError,
    });
    const Result_1 = IDL.Variant({
      'ok' : IDL.Vec(
        IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
      ),
      'err' : CommonError,
    });
    const Transaction = IDL.Record({
      'token' : TokenIdentifier__1,
      'time' : Time,
      'seller' : IDL.Principal,
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const Memo = IDL.Vec(IDL.Nat8);
    const SubAccount = IDL.Vec(IDL.Nat8);
    const TransferRequest = IDL.Record({
      'to' : User,
      'token' : TokenIdentifier,
      'notify' : IDL.Bool,
      'from' : User,
      'memo' : Memo,
      'subaccount' : IDL.Opt(SubAccount),
      'amount' : Balance,
    });
    const TransferResponse = IDL.Variant({
      'ok' : Balance,
      'err' : IDL.Variant({
        'CannotNotify' : AccountIdentifier,
        'InsufficientBalance' : IDL.Null,
        'InvalidToken' : TokenIdentifier,
        'Rejected' : IDL.Null,
        'Unauthorized' : AccountIdentifier,
        'Other' : IDL.Text,
      }),
    });
    return IDL.Service({
      'acceptCycles' : IDL.Func([], [], []),
      'addAsset' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
      'addThumb' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
      'adminKillHeartbeat' : IDL.Func([], [], []),
      'adminStartHeartbeat' : IDL.Func([], [], []),
      'allPayments' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(SubAccount__1)))],
          ['query'],
        ),
      'allSettlements' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, Settlement))],
          ['query'],
        ),
      'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
      'balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
      'bearer' : IDL.Func([TokenIdentifier__1], [Result_8], ['query']),
      'caller' : IDL.Func([], [IDL.Text, IDL.Text, IDL.Bool, IDL.Bool], []),
      'clearPayments' : IDL.Func([IDL.Principal, IDL.Vec(SubAccount__1)], [], []),
      'cronCapEvents' : IDL.Func([], [], []),
      'cronDisbursements' : IDL.Func([], [], []),
      'cronSettlements' : IDL.Func([], [], []),
      'details' : IDL.Func([TokenIdentifier__1], [Result_10], ['query']),
      'equip' : IDL.Func([TokenIndex, TokenIndex], [Result], []),
      'extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
      'failedSales' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, SubAccount__1))],
          ['query'],
        ),
      'getAssets' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
          ['query'],
        ),
      'getGenes' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ['query']),
      'getLayerIdxFromWearableToken' : IDL.Func(
          [TokenIndex],
          [IDL.Nat],
          ['query'],
        ),
      'getLayerIdxFromWearableTokenArray' : IDL.Func(
          [IDL.Vec(TokenIndex)],
          [IDL.Vec(IDL.Nat)],
          ['query'],
        ),
      'getLayerSVGFromWearableTokenId' : IDL.Func(
          [TokenIndex],
          [IDL.Text],
          ['query'],
        ),
      'getMergedSVG' : IDL.Func([TokenIndex], [IDL.Text], ['query']),
      'getMergedSVGForSingleLayer' : IDL.Func(
          [IDL.Nat, TokenIndex],
          [IDL.Text],
          ['query'],
        ),
      'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
      'getOriginalTokens' : IDL.Func(
          [TokenIndex__1, IDL.Opt(IDL.Vec(IDL.Nat8))],
          [TokenIndex__1, IDL.Opt(IDL.Vec(IDL.Nat8))],
          [],
        ),
      'getOwners' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, IDL.Vec(TokenIndex)))],
          ['query'],
        ),
      'getRegistry' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
          ['query'],
        ),
      'getTokens' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
          ['query'],
        ),
      'getWearableArrayMetadata' : IDL.Func(
          [IDL.Vec(TokenIndex)],
          [IDL.Vec(Result_9)],
          ['query'],
        ),
      'getWearableMetadata' : IDL.Func([TokenIndex], [Result_9], ['query']),
      'heartbeat_external' : IDL.Func([], [], []),
      'heartbeat_pending' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
          ['query'],
        ),
      'historicExport' : IDL.Func([], [IDL.Bool], []),
      'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
      'http_request_streaming_callback' : IDL.Func(
          [HttpStreamingCallbackToken],
          [HttpStreamingCallbackResponse],
          ['query'],
        ),
      'importOriginalRegistry' : IDL.Func([], [IDL.Bool], []),
      'importSalesTransactions' : IDL.Func([], [IDL.Vec(SaleTransaction)], []),
      'importWearablesMetadata' : IDL.Func([], [Result], []),
      'initCap' : IDL.Func([], [], []),
      'isHeartbeatRunning' : IDL.Func([], [IDL.Bool], ['query']),
      'list' : IDL.Func([ListRequest], [Result_4], []),
      'listings' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))],
          ['query'],
        ),
      'lock' : IDL.Func(
          [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
          [Result_8],
          [],
        ),
      'metadata' : IDL.Func([TokenIdentifier__1], [Result_7], ['query']),
      'mintNFT' : IDL.Func([MintingRequest], [TokenIndex], []),
      'payments' : IDL.Func([], [IDL.Opt(IDL.Vec(SubAccount__1))], ['query']),
      'reserve' : IDL.Func(
          [IDL.Nat64, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
          [Result_6],
          [],
        ),
      'retreive' : IDL.Func([AccountIdentifier__1], [Result_5], []),
      'saleTransactions' : IDL.Func([], [IDL.Vec(SaleTransaction)], ['query']),
      'salesSettlements' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, Sale))],
          ['query'],
        ),
      'salesStats' : IDL.Func(
          [AccountIdentifier__1],
          [
            IDL.Nat,
            IDL.Opt(Time),
            IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Nat64, IDL.Bool),
            IDL.Bool,
          ],
          ['query'],
        ),
      'setMinter' : IDL.Func([IDL.Principal], [], []),
      'settle' : IDL.Func([TokenIdentifier__1], [Result_4], []),
      'settlements' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1, IDL.Nat64))],
          ['query'],
        ),
      'stats' : IDL.Func(
          [],
          [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
          ['query'],
        ),
      'supply' : IDL.Func([TokenIdentifier__1], [Result_3], ['query']),
      'tokens' : IDL.Func([AccountIdentifier__1], [Result_2], ['query']),
      'tokens_ext' : IDL.Func([AccountIdentifier__1], [Result_1], ['query']),
      'transactions' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
      'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
      'unequip' : IDL.Func([TokenIndex, TokenIndex], [Result], []),
    });
  };
  export const init = ({ IDL }) => { return []; };