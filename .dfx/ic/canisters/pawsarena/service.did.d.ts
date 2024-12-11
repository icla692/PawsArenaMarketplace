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
  'data' : [] | [Array<Array<SaleTransaction>>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_2 {
  'status' : number,
  'data' : [] | [bigint],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_3 {
  'status' : number,
  'data' : [] | [Array<SaleTransaction>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_4 {
  'status' : number,
  'data' : [] | [ListedNFTData],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_5 {
  'status' : number,
  'data' : [] | [Array<ListedNFTData>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_6 {
  'status' : number,
  'data' : [] | [Array<[string, ListedNFTData]>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface Response_7 {
  'status' : number,
  'data' : [] | [Array<[string, bigint]>],
  'status_text' : string,
  'error_text' : [] | [string],
}
export interface SaleTransaction {
  'token' : string,
  'time' : bigint,
  'seller' : Principal,
  'buyer' : Principal,
  'price' : bigint,
}
export interface _anon_class_17_1 {
  'accept_offer' : ActorMethod<[string, number], Response>,
  'buy_nft' : ActorMethod<[string], Response>,
  'cancel_offer' : ActorMethod<[number, string], Response>,
  'claim_nft' : ActorMethod<[string], string>,
  'complete_listing' : ActorMethod<[Principal, bigint, NFT_CATEGORY], Response>,
  'get_all_listed_nfts' : ActorMethod<[], Response_6>,
  'get_all_nft_views' : ActorMethod<[], Response_7>,
  'get_all_test' : ActorMethod<[], Response_6>,
  'get_all_user_listed_nfts' : ActorMethod<[Principal], Response_5>,
  'get_listed_nft_details' : ActorMethod<[string], Response_4>,
  'get_nft_sale_history' : ActorMethod<[string], Response_3>,
  'get_nft_views' : ActorMethod<[string], Response_2>,
  'init_list_nft' : ActorMethod<
    [Principal, bigint, NFT_CATEGORY, bigint],
    Response
  >,
  'place_offer_on_nft' : ActorMethod<[string, bigint, bigint], Response>,
  'salesTransactions' : ActorMethod<[], Response_1>,
  'save_nft_view' : ActorMethod<[string], string>,
  'transferNftMarketplace' : ActorMethod<
    [Principal, string, NFT_CATEGORY],
    boolean
  >,
  'un_list_nft' : ActorMethod<[string], Response>,
  'update_nft_price' : ActorMethod<[string, bigint], Response>,
}
export interface _SERVICE extends _anon_class_17_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
