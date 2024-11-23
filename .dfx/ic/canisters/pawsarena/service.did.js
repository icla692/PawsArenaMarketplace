export const idlFactory = ({ IDL }) => {
  const Response = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Text),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const NFT_CATEGORY = IDL.Variant({ 'Kitties' : IDL.Null });
  const OfferData = IDL.Record({
    'user' : IDL.Principal,
    'expiry_date' : IDL.Int,
    'offer_id' : IDL.Nat32,
    'amount' : IDL.Nat,
  });
  const NFT_CATEGORY__1 = IDL.Variant({ 'Kitties' : IDL.Null });
  const ListedNFTData = IDL.Record({
    'nft_id' : IDL.Nat32,
    'date_of_listing' : IDL.Int,
    'nft_price' : IDL.Nat,
    'offers' : IDL.Vec(OfferData),
    'seller_principal' : IDL.Principal,
    'nft_canister' : IDL.Text,
    'token_identifier' : IDL.Text,
    'isConfirmed' : IDL.Bool,
    'nft_category' : NFT_CATEGORY__1,
    'seller_identifier' : IDL.Text,
  });
  const Response_6 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, ListedNFTData))),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const Response_7 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const Response_5 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Vec(ListedNFTData)),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const Response_4 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(ListedNFTData),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const SaleTransaction = IDL.Record({
    'token' : IDL.Text,
    'time' : IDL.Int,
    'seller' : IDL.Principal,
    'buyer' : IDL.Principal,
    'price' : IDL.Nat64,
  });
  const Response_3 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Vec(SaleTransaction)),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const Response_2 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Nat),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const Response_1 = IDL.Record({
    'status' : IDL.Nat16,
    'data' : IDL.Opt(IDL.Vec(IDL.Vec(SaleTransaction))),
    'status_text' : IDL.Text,
    'error_text' : IDL.Opt(IDL.Text),
  });
  const _anon_class_17_1 = IDL.Service({
    'accept_offer' : IDL.Func([IDL.Text, IDL.Nat32], [Response], []),
    'buy_nft' : IDL.Func([IDL.Text], [Response], []),
    'cancel_offer' : IDL.Func([IDL.Nat32, IDL.Text], [Response], []),
    'claim_nft' : IDL.Func([IDL.Text], [IDL.Text], []),
    'complete_listing' : IDL.Func(
        [IDL.Principal, IDL.Nat, NFT_CATEGORY],
        [Response],
        [],
      ),
    'get_all_listed_nfts' : IDL.Func([], [Response_6], ['query']),
    'get_all_nft_views' : IDL.Func([], [Response_7], ['query']),
    'get_all_test' : IDL.Func([], [Response_6], ['query']),
    'get_all_user_listed_nfts' : IDL.Func(
        [IDL.Principal],
        [Response_5],
        ['query'],
      ),
    'get_listed_nft_details' : IDL.Func([IDL.Text], [Response_4], ['query']),
    'get_nft_sale_history' : IDL.Func([IDL.Text], [Response_3], ['query']),
    'get_nft_views' : IDL.Func([IDL.Text], [Response_2], ['query']),
    'init_list_nft' : IDL.Func(
        [IDL.Principal, IDL.Nat, NFT_CATEGORY, IDL.Nat],
        [Response],
        [],
      ),
    'place_offer_on_nft' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Int],
        [Response],
        [],
      ),
    'salesTransactions' : IDL.Func([], [Response_1], ['query']),
    'save_nft_view' : IDL.Func([IDL.Text], [IDL.Text], []),
    'transferNftMarketplace' : IDL.Func(
        [IDL.Principal, IDL.Text, NFT_CATEGORY],
        [IDL.Bool],
        [],
      ),
    'un_list_nft' : IDL.Func([IDL.Text], [Response], []),
    'update_nft_price' : IDL.Func([IDL.Text, IDL.Nat], [Response], []),
  });
  return _anon_class_17_1;
};
export const init = ({ IDL }) => { return []; };
