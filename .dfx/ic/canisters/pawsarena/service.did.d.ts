import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ListedNFTData {
  'nft_id' : number,
  'date_of_listing' : bigint,
  'nft_price' : bigint,
  'offers' : Array<OfferData>,
  'seller_principal' : Principal,
  'nft_canister' : string,
  'token_identifier' : string,
  'isConfirmed' : boolean,
  'nft_category' : NFT_CATEGORY__1,
  'seller_identifier' : string,
}
export type NFT_CATEGORY = { 'Kitties' : null };
export type NFT_CATEGORY__1 = { 'Kitties' : null };
export interface OfferData {
  'user' : Principal,
  'expiry_date' : bigint,
  'offer_id' : number,
  'amount' : bigint,
}
export interface Response {
  'status' : number,
  'data' : [] | [string],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_1 {
  'status' : number,
  'data' : [] | [ListedNFTData],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_2 {
  'status' : number,
  'data' : [] | [Array<ListedNFTData>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_3 {
  'status' : number,
  'data' : [] | [Array<[string, ListedNFTData]>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface _anon_class_15_1 {
  'accept_offer' : ActorMethod<[string, number], Response>,
  'buy_nft' : ActorMethod<[string], Response>,
  'claim_nft' : ActorMethod<[string], string>,
  'complete_listing' : ActorMethod<[Principal, bigint, NFT_CATEGORY], Response>,
  'get_all_listed_nfts' : ActorMethod<[], Response_3>,
  'get_all_user_listed_nfts' : ActorMethod<[Principal], Response_2>,
  'get_listed_nft_details' : ActorMethod<[string], Response_1>,
  'init_list_nft' : ActorMethod<
    [Principal, bigint, NFT_CATEGORY, bigint],
    Response
  >,
  'place_offer_on_nft' : ActorMethod<[string, bigint, bigint], Response>,
  'transferNftMarketplace' : ActorMethod<
    [Principal, string, NFT_CATEGORY],
    boolean
  >,
  'un_list_nft' : ActorMethod<[string], Response>,
  'update_nft_price' : ActorMethod<[string, bigint], Response>,
}
export interface _SERVICE extends _anon_class_15_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
