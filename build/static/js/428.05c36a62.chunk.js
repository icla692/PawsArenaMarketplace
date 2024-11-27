"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[428],{4186:(e,t,r)=>{r.d(t,{c:()=>a});const a=e=>{let{IDL:t}=e;const r=t.Record({owner:t.Principal,subaccount:t.Opt(t.Vec(t.Nat8))}),a=t.Record({icrc2:t.Bool}),s=t.Record({icrc1_minting_account:t.Opt(r),feature_flags:t.Opt(a)}),n=t.Record({e8s:t.Nat64}),i=t.Record({secs:t.Nat64,nanos:t.Nat32}),l=t.Record({num_blocks_to_archive:t.Nat64,max_transactions_per_response:t.Opt(t.Nat64),trigger_threshold:t.Nat64,more_controller_ids:t.Opt(t.Vec(t.Principal)),max_message_size_bytes:t.Opt(t.Nat64),cycles_for_archive_creation:t.Opt(t.Nat64),node_max_memory_size_bytes:t.Opt(t.Nat64),controller_id:t.Principal}),c=t.Record({send_whitelist:t.Vec(t.Principal),token_symbol:t.Opt(t.Text),transfer_fee:t.Opt(n),minting_account:t.Text,maximum_number_of_accounts:t.Opt(t.Nat64),accounts_overflow_trim_quantity:t.Opt(t.Nat64),transaction_window:t.Opt(i),max_message_size_bytes:t.Opt(t.Nat64),icrc1_minting_account:t.Opt(r),archive_options:t.Opt(l),initial_values:t.Vec(t.Tuple(t.Text,n)),token_name:t.Opt(t.Text),feature_flags:t.Opt(a)}),o=(t.Variant({Upgrade:t.Opt(s),Init:c}),t.Record({account:t.Vec(t.Nat8)})),d=t.Record({account:t.Text}),u=t.Record({canister_id:t.Principal}),m=t.Record({archives:t.Vec(u)}),x=t.Record({decimals:t.Nat32}),p=t.Record({url:t.Text,name:t.Text}),f=t.Variant({Int:t.Int,Nat:t.Nat,Blob:t.Vec(t.Nat8),Text:t.Text}),h=t.Record({to:r,fee:t.Opt(t.Nat),memo:t.Opt(t.Vec(t.Nat8)),from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat}),N=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,BadBurn:t.Record({min_burn_amount:t.Nat}),Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,InsufficientFunds:t.Record({balance:t.Nat})}),v=t.Variant({Ok:t.Nat,Err:N}),g=t.Record({utc_offset_minutes:t.Opt(t.Int16),language:t.Text}),b=t.Variant({GenericDisplay:t.Null,LineDisplay:t.Record({characters_per_line:t.Nat16,lines_per_page:t.Nat16})}),y=t.Record({metadata:g,device_spec:t.Opt(b)}),j=t.Record({arg:t.Vec(t.Nat8),method:t.Text,user_preferences:y}),_=t.Record({lines:t.Vec(t.Text)}),w=t.Variant({LineDisplayMessage:t.Record({pages:t.Vec(_)}),GenericDisplayMessage:t.Text}),k=t.Record({metadata:g,consent_message:w}),T=t.Record({description:t.Text}),C=t.Variant({GenericError:t.Record({description:t.Text,error_code:t.Nat}),InsufficientPayment:T,UnsupportedCanisterCall:T,ConsentMessageUnavailable:T}),R=t.Variant({Ok:k,Err:C}),O=t.Record({account:r,spender:r}),F=t.Record({allowance:t.Nat,expires_at:t.Opt(t.Nat64)}),S=t.Record({fee:t.Opt(t.Nat),memo:t.Opt(t.Vec(t.Nat8)),from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat,expected_allowance:t.Opt(t.Nat),expires_at:t.Opt(t.Nat64),spender:r}),V=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),AllowanceChanged:t.Record({current_allowance:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,Expired:t.Record({ledger_time:t.Nat64}),InsufficientFunds:t.Record({balance:t.Nat})}),q=t.Variant({Ok:t.Nat,Err:V}),A=t.Record({to:r,fee:t.Opt(t.Nat),spender_subaccount:t.Opt(t.Vec(t.Nat8)),from:r,memo:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(t.Nat64),amount:t.Nat}),I=t.Variant({GenericError:t.Record({message:t.Text,error_code:t.Nat}),TemporarilyUnavailable:t.Null,InsufficientAllowance:t.Record({allowance:t.Nat}),BadBurn:t.Record({min_burn_amount:t.Nat}),Duplicate:t.Record({duplicate_of:t.Nat}),BadFee:t.Record({expected_fee:t.Nat}),CreatedInFuture:t.Record({ledger_time:t.Nat64}),TooOld:t.Null,InsufficientFunds:t.Record({balance:t.Nat})}),P=t.Variant({Ok:t.Nat,Err:I}),D=t.Record({name:t.Text}),E=t.Record({start:t.Nat64,length:t.Nat64}),z=t.Record({timestamp_nanos:t.Nat64}),U=t.Variant({Approve:t.Record({fee:n,from:t.Vec(t.Nat8),allowance_e8s:t.Int,allowance:n,expected_allowance:t.Opt(n),expires_at:t.Opt(z),spender:t.Vec(t.Nat8)}),Burn:t.Record({from:t.Vec(t.Nat8),amount:n,spender:t.Opt(t.Vec(t.Nat8))}),Mint:t.Record({to:t.Vec(t.Nat8),amount:n}),Transfer:t.Record({to:t.Vec(t.Nat8),fee:n,from:t.Vec(t.Nat8),amount:n,spender:t.Opt(t.Vec(t.Nat8))})}),L=t.Record({memo:t.Nat64,icrc1_memo:t.Opt(t.Vec(t.Nat8)),operation:t.Opt(U),created_at_time:z}),M=t.Record({transaction:L,timestamp:z,parent_hash:t.Opt(t.Vec(t.Nat8))}),B=t.Record({blocks:t.Vec(M)}),$=t.Variant({BadFirstBlockIndex:t.Record({requested_index:t.Nat64,first_valid_index:t.Nat64}),Other:t.Record({error_message:t.Text,error_code:t.Nat64})}),W=t.Variant({Ok:B,Err:$}),K=t.Record({callback:t.Func([E],[W],["query"]),start:t.Nat64,length:t.Nat64}),G=t.Record({certificate:t.Opt(t.Vec(t.Nat8)),blocks:t.Vec(M),chain_length:t.Nat64,first_block_index:t.Nat64,archived_blocks:t.Vec(K)}),H=t.Variant({Ok:t.Vec(t.Vec(t.Nat8)),Err:$}),Z=t.Record({callback:t.Func([E],[H],["query"]),start:t.Nat64,length:t.Nat64}),X=t.Record({certificate:t.Opt(t.Vec(t.Nat8)),blocks:t.Vec(t.Vec(t.Nat8)),chain_length:t.Nat64,first_block_index:t.Nat64,archived_blocks:t.Vec(Z)}),J=t.Record({to:t.Text,fee:n,memo:t.Nat64,from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(z),amount:n}),Q=t.Record({symbol:t.Text}),Y=t.Record({to:t.Vec(t.Nat8),fee:n,memo:t.Nat64,from_subaccount:t.Opt(t.Vec(t.Nat8)),created_at_time:t.Opt(z),amount:n}),ee=t.Variant({TxTooOld:t.Record({allowed_window_nanos:t.Nat64}),BadFee:t.Record({expected_fee:n}),TxDuplicate:t.Record({duplicate_of:t.Nat64}),TxCreatedInFuture:t.Null,InsufficientFunds:t.Record({balance:n})}),te=t.Variant({Ok:t.Nat64,Err:ee}),re=t.Record({transfer_fee:n});return t.Service({account_balance:t.Func([o],[n],["query"]),account_balance_dfx:t.Func([d],[n],["query"]),account_identifier:t.Func([r],[t.Vec(t.Nat8)],["query"]),archives:t.Func([],[m],["query"]),decimals:t.Func([],[x],["query"]),icrc10_supported_standards:t.Func([],[t.Vec(p)],["query"]),icrc1_balance_of:t.Func([r],[t.Nat],["query"]),icrc1_decimals:t.Func([],[t.Nat8],["query"]),icrc1_fee:t.Func([],[t.Nat],["query"]),icrc1_metadata:t.Func([],[t.Vec(t.Tuple(t.Text,f))],["query"]),icrc1_minting_account:t.Func([],[t.Opt(r)],["query"]),icrc1_name:t.Func([],[t.Text],["query"]),icrc1_supported_standards:t.Func([],[t.Vec(p)],["query"]),icrc1_symbol:t.Func([],[t.Text],["query"]),icrc1_total_supply:t.Func([],[t.Nat],["query"]),icrc1_transfer:t.Func([h],[v],[]),icrc21_canister_call_consent_message:t.Func([j],[R],[]),icrc2_allowance:t.Func([O],[F],["query"]),icrc2_approve:t.Func([S],[q],[]),icrc2_transfer_from:t.Func([A],[P],[]),name:t.Func([],[D],["query"]),query_blocks:t.Func([E],[G],["query"]),query_encoded_blocks:t.Func([E],[X],["query"]),send_dfx:t.Func([J],[t.Nat64],[]),symbol:t.Func([],[Q],["query"]),transfer:t.Func([Y],[te],[]),transfer_fee:t.Func([t.Record({})],[re],["query"])})}},1289:(e,t,r)=>{r.d(t,{TZ:()=>s,Wr:()=>i,_E:()=>n,h9:()=>l});var a=r(2198);function s(e,t){let r=new Uint8Array([10,116,105,100]);const s=a.Principal.fromText(t).toUint8Array();r=new Uint8Array([...r,...s]);let n=e;for(let a=3;a>=0;a--){const e=Math.pow(2,8*a),t=Math.floor(n/e);r=new Uint8Array([...r,t]),n-=t*e}return a.Principal.fromUint8Array(r).toText()}function n(e,t){const r=a.Principal.fromText(e).toUint8Array(),s=a.Principal.fromText(t).toUint8Array();let n=0;for(let a=0;a<4;a++)n=n<<8|r[r.length-4+a];const i=new Uint8Array([10,116,105,100,...s]);for(let a=0;a<i.length;a++)if(r[a]!==i[a])throw new Error("Invalid finalPrincipal or principal");return n}const i=e=>`${null===e||void 0===e?void 0:e.slice(0,6)}...${null===e||void 0===e?void 0:e.slice(-4)}`,l=e=>new Date(Number(e)/1e6).toLocaleString()},6551:(e,t,r)=>{r.d(t,{A:()=>x});var a=r(7097),s=r(5043),n=r(8973),i=r(8247),l=r(2013),c=r(1699),o=r(1935),d=r(39),u=r(4230),m=r(579);const x=e=>{let{nft:t,handleTrigger:r}=e;const[x,p]=(0,s.useState)(!1),[f,h]=(0,s.useState)(""),[N,v]=(0,s.useState)(!1),{invalidateListings:g}=(0,l.A)(),[b,y]=(0,s.useState)(!1),j=(0,d.fJ)(),{user:_}=(0,d._d)(),[w,k]=(0,s.useState)(!1),[T,C]=(0,s.useState)(""),[R,O]=(0,s.useState)(""),F=async(e,t)=>{C(e),O(t),k(!0),setTimeout((()=>k(!1)),3e3)},{mutateAsync:S}=(0,a.n)({mutationFn:e=>V(e),onSuccess:async()=>{g()}}),V=async e=>{e.preventDefault();let a=(0,c.M)(o.WC,u.c,j);if(console.log("new price : ",f,t),!a)return void F("login first","error");if(!f||0==f||!t)return;y(!0),v(!0);let s=await(null===a||void 0===a?void 0:a.update_nft_price(t,parseInt(1e8*f)));200==(null===s||void 0===s?void 0:s.status)&&"Ok"==(null===s||void 0===s?void 0:s.status_text)?F("price updated successfully","success"):F(null===s||void 0===s?void 0:s.error_text,"error"),r(),y(!1),v(!1)};return(0,m.jsxs)("div",{className:"flex flex-col gap-1 w-1/2",children:[w&&(0,m.jsx)("div",{className:"absolute text-xs top-5 z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out "+("success"===R?"bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in":"bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"),children:(0,m.jsx)("div",{className:"modal-message",children:(0,m.jsx)("p",{children:T})})}),(0,m.jsx)("button",{className:"flex bg-[#6fa0d1] w-full rounded-lg mt-4 text-white justify-center items-center p-2",onClick:()=>p(!0),children:"Update"}),x&&(0,m.jsx)("div",{className:"fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50",children:(0,m.jsxs)("div",{className:"bg-[#252525] rounded-lg shadow-lg p-6 w-96",children:[(0,m.jsxs)("div",{className:"flex justify-between ",children:[(0,m.jsx)("h2",{className:" mb-4",children:"Update NFT price"}),(0,m.jsx)(n.PXF,{className:"cursor-pointer",onClick:()=>p(!1)})]}),(0,m.jsxs)("form",{onSubmit:S,children:[(0,m.jsx)("input",{type:"number",id:"price",value:f,placeholder:"enter new nft price",onChange:e=>h(e.target.value),className:" border border-white text-black rounded p-1 w-full mb-4",required:!0}),(0,m.jsx)("div",{className:"flex justify-end",children:N?(0,m.jsx)(i.A,{color:"white",size:20}):(0,m.jsx)("button",{type:"submit",className:"px-4 py-2 bg-white text-black rounded",children:"update"})})]})]})})]})}},7428:(e,t,r)=>{r.r(t),r.d(t,{default:()=>I});var a=r(5043),s=r(3747),n=r(3248),i=(r(1614),r(6246),r(2126)),l=r(2198),c=r(1289),o=(r(5772),r(7097)),d=r(8973),u=r(8247),m=r(1935),x=r(2013),p=r(39),f=r(1699),h=r(4230),N=r(7586),v=r(579);const g=e=>{let{nft:t,handleTrigger:r}=e;const[i,g]=(0,a.useState)(!1),[b,y]=(0,a.useState)(0),[j,_]=(0,a.useState)(!1),w=(0,n.jE)(),{invalidateListings:k}=(0,x.A)(),T=(0,p.fJ)(),[C,R]=(0,a.useState)(!1),[O,F]=(0,a.useState)(""),[S,V]=(0,a.useState)(""),q=async(e,t)=>{F(e),V(t),R(!0),setTimeout((()=>R(!1)),3e3)},{data:A}=(0,s.I)({queryKey:["userPrincipal"]}),{user:I}=(0,p._d)(),{mutateAsync:P}=(0,o.n)({mutationFn:e=>D(e),onSuccess:async()=>{k(),_(!1)}}),D=async e=>{if(e.preventDefault(),!I||!t||!T)return;let r=(0,f.M)(m.WC,h.c,T),a=(0,f.M)(m.qY,N.c,T);if(0!=b){_(!0);try{let e=await(null===r||void 0===r?void 0:r.init_list_nft(I.principal,t.nftid,{Kitties:null},parseInt(1e8*b)));console.log("init res:",e);let s=(0,c.TZ)(t.nftid,t.canister_id),n=await(null===a||void 0===a?void 0:a.transfer({amount:parseInt(1),from:{principal:I.principal},memo:[],notify:!1,subaccount:[],to:{principal:l.Principal.fromText(m.WC)},token:s}));console.log("transfer result:",n);let i=await(null===r||void 0===r?void 0:r.complete_listing(null===I||void 0===I?void 0:I.principal,t.nftid,{Kitties:null}));console.log("final listing:",i),200==(null===i||void 0===i?void 0:i.status)&&"Ok"==(null===i||void 0===i?void 0:i.status_text)?q("NFT listed successfully","success"):q(i.error_text,"error")}catch(s){console.log("Error in listing NFT:",s)}w.setQueryData(["refreshData"],Math.random().toString())}else alert("price is zero")};return(0,v.jsxs)("div",{className:"relative flex-row gap-1 flex w-full text-white justify-center items-center p-2 ",children:[(0,v.jsx)("button",{className:"flex bg-gray-300 w-full border mt-4  text-black justify-center items-center p-1",onClick:()=>g(!0),children:"List"}),i&&(0,v.jsxs)("div",{className:"fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50",children:[C&&(0,v.jsx)("div",{className:"absolute top-10 text-xs z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out "+("success"===S?"bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in":"bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"),children:(0,v.jsx)("div",{className:"modal-message",children:(0,v.jsx)("p",{children:O})})}),(0,v.jsxs)("div",{className:"bg-[#252525] text-sm rounded-lg shadow-lg p-6 w-96",children:[(0,v.jsxs)("div",{className:"flex justify-between ",children:[(0,v.jsx)("h2",{className:" text-sm mb-4",children:"List NFT"}),(0,v.jsx)(d.PXF,{className:"cursor-pointer",onClick:()=>g(!1)})]}),(0,v.jsxs)("form",{onSubmit:P,children:[(0,v.jsx)("input",{type:"number",id:"price",value:b,placeholder:"enter listing price in icp",onChange:e=>y(e.target.value),className:"border border-white text-black rounded p-1 w-full mb-4",required:!0}),(0,v.jsx)("div",{className:"flex justify-end",children:j?(0,v.jsx)(u.A,{color:"white",size:20}):(0,v.jsx)("button",{type:"submit",className:"px-4 py-2 bg-white text-black rounded",children:"Confirm listing"})})]})]})]})]})};var b=r(3216);const y=e=>{let{nft:t,handleTrigger:r}=e;const[s,i]=(0,a.useState)(!1),[h,g]=(0,a.useState)(!1),[b,y]=(0,a.useState)(""),[j,_]=(0,a.useState)(!1),{invalidateListings:w}=(0,x.A)(),k=(0,p.fJ)(),{user:T}=(0,p._d)(),C=(0,n.jE)(),[R,O]=(0,a.useState)(!1),[F,S]=(0,a.useState)(""),[V,q]=(0,a.useState)(""),A=async(e,t)=>{S(e),q(t),O(!0),setTimeout((()=>O(!1)),3e3)},{mutateAsync:I}=(0,o.n)({mutationFn:e=>P(e),onSuccess:async()=>{w(),_(!1)}}),P=async e=>{e.preventDefault(),_(!0),console.log("nft :",t);let r=(0,f.M)(m.qY,N.c,k);r&&t||A("please login first","success");let a=(0,c.TZ)(Number(t.nftid),t.canister_id),s=(0,m.Dy)(b);if("unkown"===s)return void alert("invalid recipient");let n="pa"===s?{principal:l.Principal.fromText(b)}:{address:b};try{let e=await r.transfer({amount:parseInt(1),from:{principal:T.principal},memo:[],notify:!1,subaccount:[],to:n,token:a});e.ok?A("NFT transfer successful","success"):A(e.err,"error"),console.log("transfer success",e)}catch(i){console.log("error in transfering nft :",i)}C.setQueryData(["refreshData"],Math.random()),_(!1)};return(0,v.jsxs)("div",{className:"relative flex-row gap-1 flex w-full text-sm  text-white justify-center items-center p-2 ",children:[(0,v.jsx)("button",{className:"flex border bg-slate-300 w-full mt-4  text-black justify-center items-center p-1",onClick:()=>i(!0),children:"Transfer"}),s&&(0,v.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50",children:[R&&(0,v.jsx)("div",{className:"absolute top-10 text-xs z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out "+("success"===V?"bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in":"bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"),children:(0,v.jsx)("div",{className:"modal-message",children:(0,v.jsx)("p",{children:F})})}),(0,v.jsxs)("div",{className:"bg-[#252525] rounded-lg shadow-lg p-6 w-96",children:[(0,v.jsxs)("div",{className:"flex justify-between ",children:[(0,v.jsx)("h2",{className:"text-sm mb-4",children:"Transfer NFT"}),(0,v.jsx)(d.PXF,{className:"cursor-pointer",onClick:()=>i(!1)})]}),(0,v.jsxs)("form",{onSubmit:P,children:[(0,v.jsx)("input",{type:"text",id:"recipient",placeholder:"enter receiver account or principal address",value:b,onChange:e=>y(e.target.value),className:" border border-white text-black rounded p-1 w-full mb-4",required:!0}),(0,v.jsx)("div",{className:"flex justify-end",children:j?(0,v.jsx)(u.A,{color:"white",size:20}):(0,v.jsx)("button",{type:"submit",className:"px-4 py-2 bg-white text-black rounded",children:"Transfer"})})]})]})]})]})};r(6551);const j=e=>{let{selectedTab:t,handleTabClick:r}=e;const a=e=>"cursor-pointer p-2  "+(t===e?" text-white border-b-4 border-blue-500":"bg-transparent");return(0,v.jsx)("div",{className:"flex flex-col w-full border-b-2 mt-6 rounded-md",children:(0,v.jsxs)("div",{className:"flex flex-row w-full justify-evenly items-center gap-4",children:[(0,v.jsx)("div",{className:a("Collected"),onClick:()=>r("Collected"),children:"Collected"}),(0,v.jsx)("div",{className:a("Selling"),onClick:()=>r("Selling"),children:"Selling"}),(0,v.jsx)("div",{className:a("Offers"),onClick:()=>r("Offers"),children:"Offers"}),(0,v.jsx)("div",{className:a("Activity"),onClick:()=>r("Activity"),children:"Activity"})]})})},_=e=>{let{results:t}=e;return(0,v.jsxs)("div",{className:"flex  w-full  text-white gap-3  border-gray-400 p-2",children:[(0,v.jsx)("div",{className:"hidden md:flex justify-center w-1/4",children:(0,v.jsxs)("div",{className:"flex t flex-col border-r-2 px-4 ",children:[(0,v.jsx)("h2",{className:"text-2xl",children:"Collections"}),(0,v.jsx)("div",{children:"IC Kitties"})]})}),(0,v.jsx)("div",{className:"flex flex-col w-full",children:(0,v.jsx)("div",{className:"flex flex-row w-full",children:(0,v.jsx)("div",{className:"flex-grow w-full flex  justify-center items-center flex-wrap",children:t})})})]})},w=e=>{var t;let{transactions:r,selectedCollection:a}=e;return(0,v.jsx)("div",{className:" mb-10 overflow-x-auto w-full mt-10  p-2 h-[600px] rounded-lg  border-gray-400",children:(0,v.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"NFT"}),(0,v.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"From"}),(0,v.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"To"}),(0,v.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amount"}),(0,v.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Date"})]})}),(0,v.jsx)("tbody",{className:" divide-y divide-gray-200",children:(null===r||void 0===r?void 0:r.length)>0?null===r||void 0===r||null===(t=r.slice(0,15))||void 0===t?void 0:t.map(((e,t)=>{var r;return(0,v.jsxs)("tr",{children:[(0,v.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:[(0,v.jsx)("img",{src:`https://${a}.raw.icp0.io/?tokenid=${null===e||void 0===e?void 0:e.token}&type=thumbnail`,alt:"",height:40,width:40}),"#",(0,c._E)(null===e||void 0===e?void 0:e.token,a)]}),(0,v.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:(0,c.Wr)(null===e||void 0===e||null===(r=e.seller)||void 0===r?void 0:r.toString())}),(0,v.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:(0,c.Wr)(null===e||void 0===e?void 0:e.buyer)}),(0,v.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:Number(null===e||void 0===e?void 0:e.price)/1e8}),(0,v.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:(0,c.h9)(null===e||void 0===e?void 0:e.time)})]},t)})):(0,v.jsx)("div",{className:"flex w-full justify-center items-center text-xs mt-3",children:"No activity available"})})]})})};var k=r(1462),T=r(4186),C=r(3002);const R=new(r(826).qB)({host:"https://ic0.app",retryTimes:10}),O=(0,f.M)(m.tc,T.c,R),F=e=>{let{recipient:t,amount:r,buttonLoading:a,onPreview:s,onRecipientChange:n,onAmountChange:i,onClose:l}=e;return(0,v.jsxs)("div",{className:"bg-[#252525] rounded-lg text-sm shadow-lg p-6 w-96",children:[(0,v.jsxs)("div",{className:"flex justify-between",children:[(0,v.jsx)("h2",{className:"mb-4",children:"Withdraw ICP"}),(0,v.jsx)(d.PXF,{className:"cursor-pointer",onClick:l})]}),(0,v.jsxs)("form",{onSubmit:s,children:[(0,v.jsx)("input",{type:"text",id:"recipient",value:t,placeholder:"Enter principal",onChange:e=>n(e.target.value),className:"border border-white text-black rounded p-1 w-full mb-4",required:!0}),(0,v.jsx)("input",{type:"number",id:"amount",value:r,placeholder:"Enter amount",onChange:e=>i(e.target.value),className:"border border-white text-black rounded p-1 w-full mb-4",required:!0}),(0,v.jsx)("div",{className:"flex justify-end",children:a?(0,v.jsx)(u.A,{color:"white",size:20}):(0,v.jsx)("button",{type:"submit",className:"px-4 py-2 bg-white text-black rounded",children:"Preview"})})]})]})},S=e=>{let{recipient:t,amount:r,buttonLoading:a,onWithdraw:s,onClose:n}=e;return(0,v.jsxs)("div",{className:"bg-[#252525] text-sm rounded-lg shadow-lg p-6 w-96",children:[(0,v.jsxs)("div",{className:"flex justify-between",children:[(0,v.jsx)("h2",{className:"text-xl border-b w-full mb-4",children:"Withdraw Preview"}),(0,v.jsx)(d.PXF,{className:"cursor-pointer",onClick:n})]}),(0,v.jsxs)("div",{className:"flex text-sm flex-col gap-1 w-full",children:[(0,v.jsx)(V,{label:"Destination:",value:(i=t,`${i.slice(0,15)}...${i.slice(-10)}`)}),(0,v.jsx)(V,{label:"Amount:",value:`${r} ICP`}),(0,v.jsx)(V,{label:"Fee:",value:"0.0001 ICP"})]}),(0,v.jsx)("div",{className:"flex mt-3 justify-end",children:a?(0,v.jsx)(u.A,{color:"white",size:20}):(0,v.jsx)("button",{onClick:s,className:"px-4 py-2 bg-white text-black rounded",children:"Send"})})]});var i},V=e=>{let{label:t,value:r}=e;return(0,v.jsxs)("div",{className:"flex flex-col",children:[(0,v.jsx)("span",{children:t}),(0,v.jsx)("span",{className:"flex text-gray-400",children:r})]})},q=()=>{const[e,t]=(0,a.useState)(!1),[r,i]=(0,a.useState)(!1),[c,d]=(0,a.useState)(""),[h,N]=(0,a.useState)(0),[g,b]=(0,a.useState)(!1),[y,j]=(0,a.useState)(!1),[_,w]=(0,a.useState)(""),[k,R]=(0,a.useState)(""),[V,q]=(0,a.useState)(!1),[A,I]=(0,a.useState)(""),[P,D]=(0,a.useState)(0),{user:E}=(0,p._d)(),z=(0,p.fJ)(),U=(0,n.jE)(),{invalidateListings:L,invalidateUserNfts:M,invalidateUserBalance:B}=(0,x.A)(),{data:$}=(0,s.I)({queryKey:["userIcpBalance"]});(0,a.useEffect)((()=>{(async()=>{if(E){try{q(!0);let e=await O.icrc1_balance_of({owner:null===E||void 0===E?void 0:E.principal,subaccount:[]});console.log("rs",e),D(Number(e)/1e8)}catch(e){console.log("Error in fetching balance",e)}q(!1)}})()}),[E,A]);const{mutateAsync:W}=(0,o.n)({mutationFn:e=>G(e),onSuccess:async()=>{L(),M(),B(),t(!1)}}),K=(e,t)=>{w(e),R(t),j(!0),setTimeout((()=>j(!1)),3e3)},G=async e=>{if(e.preventDefault(),t(!0),!z)return;let r=(0,m.Dy)(c);try{const e=(0,f.M)(m.tc,T.c,z);let t;"pa"===r?t=await e.icrc1_transfer({to:{owner:l.Principal.fromText(c),subaccount:[]},fee:[],memo:[],from_subaccount:[],created_at_time:[],amount:1e8*Number(h)}):"ac"===r&&(t=await e.send_dfx({to:c,fee:{e8s:1e4},memo:1234,from_subaccount:[],created_at_time:[],amount:{e8s:1e8*Number(h)}})),t.Ok||"bigint"===typeof t?K("ICP transfer successful","success"):K(t.Err,"error")}catch(a){console.error("Error in sending ICP:",a),K("An error occurred during the transfer","error")}U.setQueryData(["refreshData"],Math.random()),t(!1),I(Math.random())};return(0,v.jsxs)("div",{className:"relative flex flex-row gap-1 text-white",children:[(0,v.jsxs)("div",{className:"flex flex-col ",children:[(0,v.jsx)("span",{className:"font-bold",children:"Balance"}),(0,v.jsxs)("div",{className:"flex flex-row text-sm gap-1 justify-center items-center",children:[V?(0,v.jsx)(u.A,{size:15,color:"white"}):P,(0,v.jsx)(C.kiE,{size:20,className:"cursor-pointer",onClick:()=>i(!0)})]})]}),r&&(0,v.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50",children:[y&&(0,v.jsx)("div",{className:`absolute text-xs top-10 z-50 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${"success"===k?"bg-green-100 text-green-800 border border-green-300":"bg-red-100 text-red-800 border border-red-300"} rounded-lg p-1`,children:(0,v.jsx)("p",{children:_})}),g?(0,v.jsx)(S,{recipient:c,amount:h,buttonLoading:e,onWithdraw:W,onClose:()=>{i(!1),b(!1)}}):(0,v.jsx)(F,{recipient:c,amount:h,buttonLoading:e,onPreview:e=>{e.preventDefault(),b(!0)},onRecipientChange:d,onAmountChange:N,onClose:()=>i(!1)})]})]})},A={wrapper:"flex mt-[80px] min-h-screen bg-[#121212] flex-col w-full items-center px-[1.2rem] md:px-[4.2rem] py-4 text-white",profileSection:"flex flex-col border rounded-lg w-full max-w-3xl max-h-2xl mb-6 ",addressContainer:"flex flex-row gap-2 items-center justify-center mt-8",address:"  mt-20 mb-2 text-center",balance:"text-md text-[#8a939b] mb-4",qrCodeContainer:"flex flex-col items-center",qrCodeLabel:"text-md font-semibold mb-2",nftsSection:"w-full  rounded-lg p-4",nftGrid:"flex flex-wrap justify-center gap-1",nftCard:"bg-[#212121] w-[200px] mb-3 rounded-md  overflow-hidden relative",nftImg:"w-[200px] h-48 ml-[3px] mt-[3px] rounded-t-md cursor-pointer object-cover",info:"flex justify-between text-white drop-shadow-xl ml-2 mr-2",infoLeft:"flex-0.6 flex-wrap",assetName:"font-bold mt-1",buttonsContainer:"absolute bottom-6 left-0 right-0 flex flex-row  justify-center items-center"},I=()=>{var e,t;const[r,o]=(0,a.useState)(null),[d,x]=(0,a.useState)([]),[f,h]=(0,a.useState)([]),[N,T]=(0,a.useState)(null),[C,R]=(0,a.useState)(""),{user:O}=(0,p._d)(),{data:F}=(0,s.I)({queryKey:["userPrincipal"]}),{data:S}=(0,s.I)({queryKey:["refreshData"]}),{data:V}=(0,s.I)({queryKey:["userIcpBalance"]}),{data:I}=(0,s.I)({queryKey:["marketplaceActor"]}),{data:P}=(0,s.I)({queryKey:["nftActor"]}),{data:D}=(0,s.I)({queryKey:["bulkData"]}),{data:E}=(0,s.I)({queryKey:["IcpActor"]}),z=(0,b.Zp)();(0,n.jE)();(0,a.useEffect)((()=>{if(!F)return;let e=i.nG.fromPrincipal({principal:l.Principal.fromText(F),subAccount:void 0}).toHex();console.log(e),T(e)}),[F]),(0,a.useEffect)((()=>{(async()=>{try{let e=[],t=[];if(!F||!I)return;let r=await(null===I||void 0===I?void 0:I.get_all_user_listed_nfts(l.Principal.fromText(F)));if(console.log("heeee :",r.data[0]),200==r.status&&"Ok"==r.status_text&&r.data[0].length>0)for(const i of r.data[0])!0===i.isConfirmed&&t.push({nftid:i.nft_id,type:"Listed",canister_id:i.nft_canister,collectionName:Object.keys(i.nft_category)[0]});let a=i.nG.fromPrincipal({principal:l.Principal.fromText(F),subAccount:void 0}).toHex(),s=await(null===P||void 0===P?void 0:P.tokens(a)),n=Array.from(null===s||void 0===s?void 0:s.ok);if(console.log("ahaha :",n),n&&n.length>0)for(const i of n)e.push({nftid:i,type:"Owned",canister_id:"rw7qm-eiaaa-aaaak-aaiqq-cai",collectionName:"Kitties"});x(e),h(t)}catch(e){console.log("error in fetching user listed NFTs",e)}})()}),[O,C,S]);const U=e=>R(Math.random()),L=(e,t)=>`${e.slice(0,t)}...${e.slice(-7)}`,[M,B]=(0,a.useState)("Activity"),[$,W]=(0,a.useState)("rw7qm-eiaaa-aaaak-aaiqq-cai"),K=(0,a.useMemo)((()=>{if(console.log("here is the data :",M),"Activity"===M){var e,t;let r=null===D||void 0===D?void 0:D.find((e=>e[0]==$));console.log("token listings :",r);let a=null===(e=r[1])||void 0===e||null===(t=e.transactions)||void 0===t?void 0:t.filter((e=>(null===e||void 0===e?void 0:e.buyer)==i.nG.fromPrincipal({principal:null===O||void 0===O?void 0:O.principal,subAccount:void 0}).toHex()||(null===e||void 0===e?void 0:e.seller)===(null===O||void 0===O?void 0:O.principal)));return console.log("transactions :",a),(0,v.jsx)(w,{transactions:a,selectedCollection:$})}if("Collected"===M){return null===d||void 0===d?void 0:d.map(((e,t)=>(0,v.jsxs)("div",{className:`${A.nftCard} ${A.nftCardHover}`,children:[(0,v.jsx)("img",{src:`https://${e.canister_id}.raw.icp0.io/?tokenid=${(0,c.TZ)(e.nftid,e.canister_id)}&type=thumbnail`,alt:"",onClick:()=>z("../marketplace/"+e.canister_id+"/"+e.nftid),className:A.nftImg}),(0,v.jsxs)("div",{className:A.info,children:[(0,v.jsx)("div",{className:A.infoLeft,children:(0,v.jsx)("div",{className:A.collectionName,children:e.collectionName})}),(0,v.jsx)("div",{className:A.infoRight,children:(0,v.jsxs)("div",{className:A.assetName,children:["#",e.nftid," "]})})]}),(0,v.jsx)("div",{className:A.buttonsContainer,children:"Owned"==e.type&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(g,{nft:e,handleTrigger:U}),(0,v.jsx)(y,{nft:e,handleTrigger:U})]})})]})))}if("Selling"===M){return console.log(f),null===f||void 0===f?void 0:f.map(((e,t)=>(0,v.jsxs)("div",{className:`${A.nftCard} ${A.nftCardHover}`,children:[(0,v.jsx)("img",{src:`https://${e.canister_id}.raw.icp0.io/?tokenid=${(0,c.TZ)(e.nftid,e.canister_id)}&type=thumbnail`,alt:"",onClick:()=>z("Listed"===e.type&&"../marketplace/"+e.canister_id+"/"+e.nftid),className:A.nftImg}),(0,v.jsxs)("div",{className:A.info,children:[(0,v.jsx)("div",{className:A.infoLeft,children:(0,v.jsx)("div",{className:A.collectionName,children:e.collectionName})}),(0,v.jsx)("div",{className:A.infoRight,children:(0,v.jsxs)("div",{className:A.assetName,children:["#",e.nftid," "]})})]}),(0,v.jsx)("div",{className:A.buttonsContainer,children:"Owned"==e.type&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(g,{nft:e,handleTrigger:U}),(0,v.jsx)(y,{nft:e,handleTrigger:U})]})})]},t)))}}),[M,S]);return(0,v.jsx)(v.Fragment,{children:null!==O&&void 0!==O&&O.principal?(0,v.jsxs)("div",{className:A.wrapper,children:[(0,v.jsxs)("div",{className:A.profileSection,children:[(0,v.jsx)("div",{className:"flex rounded-t-md text-black font-bold px-4 bg-white",children:"Overview"}),(0,v.jsxs)("div",{className:"flex flex-col justify-center md:flex-row gap-2 w-full ",children:[(0,v.jsxs)("div",{className:" flex flex-col px-4 py-2 md:py-4 w-full",children:[(0,v.jsx)("span",{className:"font-bold",children:"Wallet ID:"}),(null===O||void 0===O?void 0:O.principal)&&(0,v.jsxs)("div",{className:"flex flex-row gap-2  items-center",children:[(0,v.jsx)("span",{className:"flex flex-row justify-center  items-center",children:L(null===O||void 0===O||null===(e=O.principal)||void 0===e?void 0:e.toString(),20)}),(0,v.jsx)(k.r6e,{className:"cursor-pointer",onClick:()=>{var e;return(0,m.lW)(null===O||void 0===O||null===(e=O.principal)||void 0===e?void 0:e.toText())}})]})]}),(0,v.jsx)("div",{className:"flex flex-col px-4 py-1  md:py-4 w-full",children:(0,v.jsx)(q,{})})]}),(0,v.jsxs)("div",{className:" flex flex-col px-4 py-1  md:py-4 w-full",children:[(0,v.jsx)("span",{className:"font-bold",children:"Account Identifier:"}),null!==O&&void 0!==O&&O.principal?(0,v.jsxs)("div",{className:"flex flex-row gap-2  items-center",children:[(0,v.jsx)("span",{children:L(null===(t=i.nG.fromPrincipal({principal:O.principal}))||void 0===t?void 0:t.toHex(),18)}),(0,v.jsx)(k.r6e,{className:"cursor-pointer",onClick:()=>{var e;return(0,m.lW)(null===(e=i.nG.fromPrincipal({principal:O.principal}))||void 0===e?void 0:e.toHex())}})]}):(0,v.jsx)(u.A,{})]})]}),(0,v.jsx)(j,{selectedTab:M,handleTabClick:e=>{B(e)}}),(0,v.jsx)(_,{results:K})]}):z("/")})}},5772:(e,t,r)=>{r.d(t,{A:()=>f});var a=r(3248),s=r(7097),n=r(5043),i=r(8973),l=r(8247),c=r(2013),o=r(39),d=r(1935),u=r(4230),m=r(1699),x=r(3216),p=r(579);const f=e=>{let{nft:t,handleTrigger:r}=e;const[f,h]=(0,n.useState)(!1),[N,v]=(0,n.useState)(!1),[g,b]=(0,n.useState)(!1),[y,j]=(0,n.useState)(""),[_,w]=(0,n.useState)(""),{invalidateListings:k,invalidateUserNfts:T}=(0,c.A)(),C=(0,o.fJ)(),R=(0,x.Zp)(),O=(0,a.jE)(),F=async(e,t)=>{j(e),w(t),b(!0),setTimeout((()=>b(!1)),3e3)},{mutateAsync:S}=(0,s.n)({mutationFn:()=>V(),onSuccess:async()=>{k(),T(),v(!1)}}),V=async()=>{let e=(0,m.M)(d.WC,u.c,C);if(t&&e){v(!0);try{console.log("unlist :",t);let a=await(null===e||void 0===e?void 0:e.un_list_nft(t));200==(null===a||void 0===a?void 0:a.status)&&"Ok"==(null===a||void 0===a?void 0:a.status_text)?(F("NFT unlisted successfully","success"),R("/profile")):(F(null===a||void 0===a?void 0:a.error_text,"error"),R("/profile")),r(),O.setQueryData(["refreshData"],Math.random()),console.log("unlisting res :",a)}catch(a){console.log("error in unlisting token :",a)}}};return(0,p.jsxs)("div",{className:"flex flex-col gap-1 w-1/2",children:[(0,p.jsx)("div",{className:"flex flex-row gap-4",children:(0,p.jsx)("button",{className:"flex bg-[#2c2d2e] rounded-lg w-full mt-4 text-white justify-center items-center p-2 cursor-pointer",onClick:()=>h(!0),children:"Unlist"})}),f&&(0,p.jsxs)("div",{className:"fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50",children:[g&&(0,p.jsx)("div",{className:"absolute top-10 text-xs z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out "+("success"===_?"bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in":"bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"),children:(0,p.jsx)("div",{className:"modal-message",children:(0,p.jsx)("p",{children:y})})}),(0,p.jsxs)("div",{className:"bg-[#252525] rounded-lg shadow-lg p-6 w-96",children:[(0,p.jsxs)("div",{className:"flex justify-between ",children:[(0,p.jsx)("h2",{className:" mb-4",children:"Unlist NFT"}),(0,p.jsx)(i.PXF,{className:"cursor-pointer",onClick:()=>h(!1)})]}),(0,p.jsx)("span",{children:"Remove NFT from the marketplace?"}),(0,p.jsx)("div",{className:"flex justify-end mt-3",children:N?(0,p.jsx)(l.A,{color:"white",size:20}):(0,p.jsx)("button",{onClick:S,className:"px-4 py-2 bg-white text-black rounded",children:"Unlist"})})]})]})]})}}}]);
//# sourceMappingURL=428.05c36a62.chunk.js.map