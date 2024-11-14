"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[303],{4186:(e,t,r)=>{r.d(t,{c:()=>a});const a=e=>{let{IDL:t}=e;const r=t.Record({owner:t.Principal,subaccount:t.Opt(t.Vec(t.Nat8))}),a=t.Record({icrc2:t.Bool}),c=t.Record({icrc1_minting_account:t.Opt(r),feature_flags:t.Opt(a)}),n=t.Record({e8s:t.Nat64}),s=t.Record({secs:t.Nat64,nanos:t.Nat32}),i=t.Record({num_blocks_to_archive:t.Nat64,max_transactions_per_response:t.Opt(t.Nat64),trigger_threshold:t.Nat64,more_controller_ids:t.Opt(t.Vec(t.Principal)),max_message_size_bytes:t.Opt(t.Nat64),cycles_for_archive_creation:t.Opt(t.Nat64),node_max_memory_size_bytes:t.Opt(t.Nat64),controller_id:t.Principal}),o=t.Record({send_whitelist:t.Vec(t.Principal),token_symbol:t.Opt(t.Text),transfer_fee:t.Opt(n),minting_account:t.Text,maximum_number_of_accounts:t.Opt(t.Nat64),accounts_overflow_trim_quantity:t.Opt(t.Nat64),transaction_window:t.Opt(s),max_message_size_bytes:t.Opt(t.Nat64),icrc1_minting_account:t.Opt(r),archive_options:t.Opt(i),initial_values:t.Vec(t.Tuple(t.Text,n)),token_name:t.Opt(t.Text),feature_flags:t.Opt(a)}),u=(t.Variant({Upgrade:t.Opt(c),Init:o}),t.Record({account:t.Vec(t.Nat8)})),l=t.Record({account:t.Text}),d=t.Record({canister_id:t.Principal}),p=t.Record({archives:t.Vec(d)}),m=t.Record({decimals:t.Nat32}),_=t.Record({url:t.Text,name:t.Text}),f=t.Variant({Int:t.Int,Nat:t.Nat,Blob:t.Vec(t.Nat8),Text:t.Text}),N=t.Record({to:r,fee:t.Opt(t.Nat),memo:t.Opt(t.Vec(t.Nat8)),from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat}),h=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,BadBurn:t.Record({min_burn_amount:t.Nat}),Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,InsufficientFunds:t.Record({balance:t.Nat})}),x=t.Variant({Ok:t.Nat,Err:h}),b=t.Record({utc_offset_minutes:t.Opt(t.Int16),language:t.Text}),y=t.Variant({GenericDisplay:t.Null,LineDisplay:t.Record({characters_per_line:t.Nat16,lines_per_page:t.Nat16})}),R=t.Record({metadata:b,device_spec:t.Opt(y)}),g=t.Record({arg:t.Vec(t.Nat8),method:t.Text,user_preferences:R}),O=t.Record({lines:t.Vec(t.Text)}),V=t.Variant({LineDisplayMessage:t.Record({pages:t.Vec(O)}),GenericDisplayMessage:t.Text}),v=t.Record({metadata:b,consent_message:V}),w=t.Record({description:t.Text}),F=t.Variant({GenericError:t.Record({description:t.Text,error_code:t.Nat}),InsufficientPayment:w,UnsupportedCanisterCall:w,ConsentMessageUnavailable:w}),T=t.Variant({Ok:v,Err:F}),k=t.Record({account:r,spender:r}),j=t.Record({allowance:t.Nat,expires_at:t.Opt(t.Nat64)}),q=t.Record({fee:t.Opt(t.Nat),memo:t.Opt(t.Vec(t.Nat8)),from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat,expected_allowance:t.Opt(t.Nat),expires_at:t.Opt(t.Nat64),spender:r}),I=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),AllowanceChanged:t.Record({current_allowance:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,Expired:t.Record({ledger_time:t.Nat64}),InsufficientFunds:t.Record({balance:t.Nat})}),C=t.Variant({Ok:t.Nat,Err:I}),E=t.Record({to:r,fee:t.Opt(t.Nat),spender_subaccount:t.Opt(t.Vec(t.Nat8)),from:r,memo:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat}),M=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,InsufficientAllowance:t.Record({allowance:t.Nat}),BadBurn:t.Record({min_burn_amount:t.Nat}),Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,InsufficientFunds:t.Record({balance:t.Nat})}),B=t.Variant({Ok:t.Nat,Err:M}),P=t.Record({name:t.Text}),S=t.Record({start:t.Nat64,length:t.Nat64}),A=t.Record({timestamp_nanos:t.Nat64}),K=t.Variant({Approve:t.Record({fee:n,from:t.Vec(t.Nat8),allowance_e8s:t.Int,allowance:n,expected_allowance:t.Opt(n),expires_at:t.Opt(A),spender:t.Vec(t.Nat8)}),Burn:t.Record({from:t.Vec(t.Nat8),amount:n,spender:t.Opt(t.Vec(t.Nat8))}),Mint:t.Record({to:t.Vec(t.Nat8),amount:n}),Transfer:t.Record({to:t.Vec(t.Nat8),fee:n,from:t.Vec(t.Nat8),amount:n,spender:t.Opt(t.Vec(t.Nat8))})}),L=t.Record({memo:t.Nat64,icrc1_memo:t.Opt(t.Vec(t.Nat8)),operation:t.Opt(K),created_at_time:A}),U=t.Record({transaction:L,timestamp:A,parent_hash:t.Opt(t.Vec(t.Nat8))}),D=t.Record({blocks:t.Vec(U)}),G=t.Variant({BadFirstBlockIndex:t.Record({requested_index:t.Nat64,first_valid_index:t.Nat64}),Other:t.Record({error_message:t.Text,error_code:t.Nat64})}),z=t.Variant({Ok:D,Err:G}),Z=t.Record({callback:t.Func([S],[z],["query"]),start:t.Nat64,length:t.Nat64}),$=t.Record({certificate:t.Opt(t.Vec(t.Nat8)),blocks:t.Vec(U),chain_length:t.Nat64,first_block_index:t.Nat64,archived_blocks:t.Vec(Z)}),W=t.Variant({Ok:t.Vec(t.Vec(t.Nat8)),Err:G}),J=t.Record({callback:t.Func([S],[W],["query"]),start:t.Nat64,length:t.Nat64}),Q=t.Record({certificate:t.Opt(t.Vec(t.Nat8)),blocks:t.Vec(t.Vec(t.Nat8)),chain_length:t.Nat64,first_block_index:t.Nat64,archived_blocks:t.Vec(J)}),H=t.Record({to:t.Text,fee:n,memo:t.Nat64,from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(A),amount:n}),X=t.Record({symbol:t.Text}),Y=t.Record({to:t.Vec(t.Nat8),fee:n,memo:t.Nat64,from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(A),amount:n}),ee=t.Variant({TxTooOld:t.Record({allowed_window_nanos:t.Nat64}),BadFee:t.Record({expected_fee:n}),TxDuplicate:t.Record({duplicate_of:t.Nat64}),TxCreatedInFuture:t.Null,InsufficientFunds:t.Record({balance:n})}),te=t.Variant({Ok:t.Nat64,Err:ee}),re=t.Record({transfer_fee:n});return t.Service({account_balance:t.Func([u],[n],["query"]),account_balance_dfx:t.Func([l],[n],["query"]),account_identifier:t.Func([r],[t.Vec(t.Nat8)],["query"]),archives:t.Func([],[p],["query"]),decimals:t.Func([],[m],["query"]),icrc10_supported_standards:t.Func([],[t.Vec(_)],["query"]),icrc1_balance_of:t.Func([r],[t.Nat],["query"]),icrc1_decimals:t.Func([],[t.Nat8],["query"]),icrc1_fee:t.Func([],[t.Nat],["query"]),icrc1_metadata:t.Func([],[t.Vec(t.Tuple(t.Text,f))],["query"]),icrc1_minting_account:t.Func([],[t.Opt(r)],["query"]),icrc1_name:t.Func([],[t.Text],["query"]),icrc1_supported_standards:t.Func([],[t.Vec(_)],["query"]),icrc1_symbol:t.Func([],[t.Text],["query"]),icrc1_total_supply:t.Func([],[t.Nat],["query"]),icrc1_transfer:t.Func([N],[x],[]),icrc21_canister_call_consent_message:t.Func([g],[T],[]),icrc2_allowance:t.Func([k],[j],["query"]),icrc2_approve:t.Func([q],[C],[]),icrc2_transfer_from:t.Func([E],[B],[]),name:t.Func([],[P],["query"]),query_blocks:t.Func([S],[$],["query"]),query_encoded_blocks:t.Func([S],[Q],["query"]),send_dfx:t.Func([H],[t.Nat64],[]),symbol:t.Func([],[X],["query"]),transfer:t.Func([Y],[te],[]),transfer_fee:t.Func([t.Record({})],[re],["query"])})}},8657:(e,t,r)=>{r.d(t,{A:()=>f});var a=r(7097),c=r(5043),n=r(1935),s=r(2198),i=r(8247),o=r(2013),u=r(3216),l=r(39),d=r(1699),p=r(4230),m=r(4186),_=r(579);const f=e=>{let{nftid:t,nft_price:r,userP:f}=e;const[N,h]=(0,c.useState)(!1),[x,b]=(0,c.useState)(!1),[y,R]=(0,c.useState)(""),[g,O]=(0,c.useState)(""),{invalidateListings:V,invalidateUserNfts:v,invalidateUserBalance:w}=(0,o.A)(),F=(0,l.fJ)(),{user:T}=(0,l._d)(),k=async(e,t)=>{R(e),O(t),b(!0),setTimeout((()=>b(!1)),3e3)},j=(0,u.Zp)(),{mutateAsync:q}=(0,a.n)({mutationFn:()=>I(),onSuccess:async()=>{V(),v(),w(),h(!1)}}),I=async()=>{try{if(!T||!F)return void k("Log in first to purchase this NFT","error");let e=(0,d.M)(n.WC,p.c,F);const a=(0,d.M)(n.tc,m.c,F);h(!0);let c=await a.icrc2_approve({fee:[],memo:[],from_subaccount:[],created_at_time:[],amount:Number(r)+2e4,expected_allowance:[],expires_at:[],spender:{owner:s.Principal.fromText(n.WC),subaccount:[]}});console.log("approve results :",c);let i=await e.buy_nft(t);200==i.status&&"Ok"==i.status_text?k("NFT purchase successful","success"):k(i.error_text,"error"),console.log("buy results :",i)}catch(e){console.log("error in buying nft :",e)}j("/profile")};return(0,_.jsxs)(_.Fragment,{children:[x&&(0,_.jsx)("div",{className:"absolute top-10 z-50 text-xs  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out "+("success"===g?"bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in":"bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"),children:(0,_.jsx)("div",{className:"modal-message",children:(0,_.jsx)("p",{children:y})})}),(0,_.jsx)("button",{onClick:()=>q(),className:"flex w-full bg-[#2E8DEE] rounded-b-lg mt-4 font-bold text-white justify-center items-center p-2",children:N?(0,_.jsx)(i.A,{size:20,color:"white"}):"Buy"})]})}},1303:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var a=r(3248),c=r(3747),n=(r(5043),r(1935),r(8657)),s=r(3216),i=r(579);const o={wrapper:"bg-[#212121] w-[200px] mb-3 rounded-md overflow-hidden group",imgContainer:"h-40 bg-red-400 sm:h-32 md:h-36 w-full bg-[#121212] flex justify-center items-center overflow-hidden",nftImg:"w-[200px] h-48 ml-[3px] mt-[3px] rounded-t-md cursor-pointer object-cover",info:"flex justify-between text-white drop-shadow-xl ml-2 mr-2",infoLeft:"flex-0.6 flex-wrap",collectionName:"font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-white",assetName:"font-bold mt-1",infoRight:"flex-0.4 text-right",priceTag:"font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-white",priceValue:"flex items-center text-lg sm:text-xl md:text-2xl font-bold mt-1",ethLogo:"h-5 mr-2",likes:"text-[#8a939b] font-bold flex items-center w-full justify-end mt-2",likeIcon:"text-xl mr-2",buyButtonContainer:"opacity-0 group-hover:opacity-100 transition-opacity duration-300"},u=e=>{let{nft:t}=e;const{data:r}=(0,c.I)({queryKey:["userPrincipal"]}),a=(0,s.Zp)();return(0,i.jsxs)("div",{className:o.wrapper,children:[(0,i.jsx)("img",{src:`https://${t[1].nft_canister}.raw.icp0.io/?tokenid=${t[1].token_identifier}&type=thumbnail`,alt:"",onClick:()=>a("../marketplace/"+t[1].nft_canister+"/"+t[1].nft_id),className:o.nftImg}),(0,i.jsxs)("div",{className:o.details,children:[(0,i.jsxs)("div",{className:o.info,children:[(0,i.jsxs)("div",{className:o.infoLeft,children:[(0,i.jsx)("div",{className:o.collectionName,children:Object.keys(t[1].nft_category)}),(0,i.jsxs)("div",{className:o.priceTag,children:[Number(t[1].nft_price)/1e8," ICP"]})]}),(0,i.jsx)("div",{className:o.infoRight,children:(0,i.jsxs)("div",{className:o.assetName,children:["#",t[1].nft_id," "]})})]}),(0,i.jsx)("div",{className:o.buyButtonContainer,children:(0,i.jsx)(n.A,{nftid:t[0],nft_price:Number(t[1].nft_price),userP:t[1].seller_principal})})]})]})},l=()=>{const e=(0,s.Zp)(),{data:t}=((0,a.jE)(),(0,c.I)({queryKey:["userPrincipal"]})),{data:r}=(0,c.I)({queryKey:["allListings"]}),{data:n}=(0,c.I)({queryKey:["userIcpBalance"]}),{data:o}=(0,c.I)({queryKey:["marketplaceActor"]}),{data:l}=(0,c.I)({queryKey:["nftActor"]}),{data:d}=(0,c.I)({queryKey:["userAccountId"]});return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"flex bg-[#121212] flex-col py-2 min-h-screen  items-center w-full",children:t?(0,i.jsx)("div",{className:"flex px-4 flex-wrap justify-center md:justify-start items-center gap-3",children:r&&(null===r||void 0===r?void 0:r.map(((e,t)=>(0,i.jsxs)("div",{className:"",children:[" ",(0,i.jsx)(u,{nft:e,index:t})]},t))))}):e("/")})})}},7097:(e,t,r)=>{r.d(t,{n:()=>d});var a=r(5043),c=r(5239),n=r(1454),s=r(329),i=r(9723),o=class extends s.Q{#e;#t=void 0;#r;#a;constructor(e,t){super(),this.#e=e,this.setOptions(t),this.bindMethods(),this.#c()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){const t=this.options;this.options=this.#e.defaultMutationOptions(e),(0,i.f8)(this.options,t)||this.#e.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#r,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,i.EN)(t.mutationKey)!==(0,i.EN)(this.options.mutationKey)?this.reset():"pending"===this.#r?.state.status&&this.#r.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#r?.removeObserver(this)}onMutationUpdate(e){this.#c(),this.#n(e)}getCurrentResult(){return this.#t}reset(){this.#r?.removeObserver(this),this.#r=void 0,this.#c(),this.#n()}mutate(e,t){return this.#a=t,this.#r?.removeObserver(this),this.#r=this.#e.getMutationCache().build(this.#e,this.options),this.#r.addObserver(this),this.#r.execute(e)}#c(){const e=this.#r?.state??(0,c.$)();this.#t={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#n(e){n.j.batch((()=>{if(this.#a&&this.hasListeners()){const t=this.#t.variables,r=this.#t.context;"success"===e?.type?(this.#a.onSuccess?.(e.data,t,r),this.#a.onSettled?.(e.data,null,t,r)):"error"===e?.type&&(this.#a.onError?.(e.error,t,r),this.#a.onSettled?.(void 0,e.error,t,r))}this.listeners.forEach((e=>{e(this.#t)}))}))}},u=r(3248),l=r(3247);function d(e,t){const r=(0,u.jE)(t),[c]=a.useState((()=>new o(r,e)));a.useEffect((()=>{c.setOptions(e)}),[c,e]);const s=a.useSyncExternalStore(a.useCallback((e=>c.subscribe(n.j.batchCalls(e))),[c]),(()=>c.getCurrentResult()),(()=>c.getCurrentResult())),i=a.useCallback(((e,t)=>{c.mutate(e,t).catch(l.l)}),[c]);if(s.error&&(0,l.G)(c.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:i,mutateAsync:s.mutate}}}}]);
//# sourceMappingURL=303.39847830.chunk.js.map