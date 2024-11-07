export const MARKETPLACE_CANISTER = "j4kzr-5qaaa-aaaal-amiaq-cai";
export const MY_LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export const PAWS_ARENA_CANISTER = "rw7qm-eiaaa-aaaak-aaiqq-cai";

export const NFTCollections = [
  {
    name: "IC Kitties",
    description:"The story of ICKitties happens nowadays, in a busy city street, where kitties live peacefully. One of the kitties - Zack - walks on the sidewalk minding his own business, when all of a sudden a book drops from a window and opens in front of him.Zack goes through the book and he finds the answer to a question that he always had - Why are there different colored kitties? Why aren’t we all the same?As soon as he finds the answer, he runs to a dark alley and gathers all his friends to tell them about the long forgotten 7 kitty Kingdoms and how each kitty comes from one of the Kingdoms, ruled by 7 kings and 7 queens, and overseen by 7 gods. What Kingdom will you choose?",
    canisterId: "rw7qm-eiaaa-aaaak-aaiqq-cai",
    imageUrl: "https://hdem4-ryaaa-aaaam-qa4xa-cai.raw.ic0.app/?index=70",
  },
];




export function getUnixTimestampInNanoseconds(days) {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const unixTimestampInNanoseconds = futureDate.getTime() * 1e6; // 1 second = 1e9 nanoseconds
  return unixTimestampInNanoseconds;
}
