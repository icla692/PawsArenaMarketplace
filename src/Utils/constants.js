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
export const getColorFromId = (id) => {
  for (const traitData of traitsData) {
    const traitName =
      traitData.trait === "Background"
        ? "bg"
        : traitData.trait.replace(/\s+/g, "").toLowerCase();
    for (let index = 0; index < traitData.colors.length; index++) {
      const colorId = `${traitName}${index + 1}`;
      if (colorId === id) {
        return [traitData.trait, traitData.colors[index]];
      }
    }
  }
  // return null;
};
export function getUnixTimestampInNanoseconds(days) {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const unixTimestampInNanoseconds = futureDate.getTime() * 1e6; // 1 second = 1e9 nanoseconds
  return unixTimestampInNanoseconds;
}
export const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 10)}...${address.slice(-5)}`;
};


export  const convertExpiryDate = (expiry) => {
  const date = new Date(Number(expiry) / 1e6);
  return date.toLocaleString(); // Adjust options as needed for formatting
};


export const traitsData = [
  {
    trait: "Background",
    colors: [
      { color: "Gray", count: 1723 },
      { color: "Green", count: 1614 },
      { color: "Sand", count: 1164 },
      { color: "Blue", count: 1311 },
      { color: "Red", count: 1513 },
      { color: "Pink", count: 1263 },
      { color: "Purple", count: 1412 },
    ]  },

  {
    trait: "Ground",
    colors: [
      { color: "Carpet Green", count: 1003 },
      { color: "Carpet Yellow", count: 497 },
      { color: "Carpet Pink", count: 352 },
      { color: "Carpet Blue", count: 199 },
      { color: "Clouds", count: 7 },
      { color: "Blood", count: 7 },
      { color: "Candies", count: 7 },
      { color: "Embers", count: 7 },
      { color: "Water", count: 7 },
      { color: "Ice", count: 7 },
      { color: "Books", count: 7 },
      { color: "Nothing", count: 0 },
    ],
  },
  {
    trait: "Kitty Color",
    colors: [
      { color: "Gray", count: 1723 },
      { color: "Green", count: 1614 },
      { color: "Teal", count: 1164 },
      { color: "Yellow", count: 1311 },
      { color: "Red", count: 1513 },
      { color: "Pink", count: 1263 },
      { color: "Purple", count: 1412 },
    ],  },
  {
    trait: "Ground Back",
    colors: [
      { color: "Poop Brown", count: 971 },
      { color: "Poop Blue", count: 743 },
      { color: "Poop Pink", count: 212 },
      { color: "Poop Gold", count: 49 },
      { color: "Fart Gray", count: 592 },
      { color: "Fart Green", count: 296 },
      { color: "Fart Blue", count: 103 },
      { color: "Trash Can", count: 223 },
      { color: "Trash Bag", count: 389 },
      { color: "Money Bag", count: 35 },
      { color: "Coke Bottle", count: 243 },
      { color: "Anchor", count: 113 },
      { color: "Empty Bottle", count: 312 },
      { color: "Ice Cream", count: 150 },
      { color: "Bullet", count: 73 },
      { color: "Cone", count: 280 },
      { color: "Barrell", count: 271 },
      { color: "Spray Can", count: 322 },
      { color: "Ball", count: 501 },
      { color: "Cloud", count: 7 },
      { color: "Mud", count: 7 },
      { color: "Blue Candy", count: 7 },
      { color: "Flame", count: 7 },
      { color: "Feather", count: 7 },
      { color: "Frozen Popsicle", count: 7 },
      { color: "Paper", count: 7 },
      { color: "Nothing", count: 4073 },
    ],
  },
  {
    trait: "Ground Front",
    colors: [
      { color: "Food Bowl", count: 927 },
      { color: "Water Bowl", count: 614 },
      { color: "Milk Bowl", count: 373 },
      { color: "Fish", count: 223 },
      { color: "Cardboard Box", count: 145 },
      { color: "Thread Ball", count: 251 },
      { color: "Glass Bottle", count: 673 },
      { color: "Cherries", count: 284 },
      { color: "Cookie", count: 409 },
      { color: "Burger", count: 31 },
      { color: "French Fries", count: 211 },
      { color: "Soda", count: 458 },
      { color: "Paper Plane", count: 71 },
      { color: "Flower Pot", count: 178 },
      { color: "Rubber Duck", count: 316 },
      { color: "Tennis Ball", count: 196 },
      { color: "Tennis Racket", count: 92 },
      { color: "Matchbox", count: 118 },
      { color: "Mug", count: 55 },
      { color: "Coffee Cup", count: 153 },
      { color: "Cloud", count: 7 },
      { color: "Gravestone", count: 7 },
      { color: "Yellow Candy", count: 7 },
      { color: "Flame", count: 7 },
      { color: "Boat", count: 7 },
      { color: "Frozen Icecream", count: 7 },
      { color: "Ruler", count: 7 },
      { color: "Nothing", count: 4173 },
    ],
  },
  {
    trait: "Body",
    colors: [
      { color: "Sprinkles", count: 334 },
      { color: "Red sports Tshirt", count: 569 },
      { color: "Regular Gray Tshirt", count: 476 },
      { color: "Regular Black Tshirt", count: 833 },
      { color: "Dfinity TShirt Gray", count: 53 },
      { color: "Dfinity TShirt Black", count: 27 },
      { color: "Wand", count: 7 },
      { color: "Shovel", count: 7 },
      { color: "Candies", count: 7 },
      { color: "Trident", count: 7 },
      { color: "Pirate Sword", count: 7 },
      { color: "Fancy Popsicle", count: 7 },
      { color: "Pencil", count: 7 },
      { color: "Mud", count: 944 },
      { color: "Fleas", count: 1062 },
      { color: "Purple Suit", count: 121 },
      { color: "Bowtie", count: 265 },
      { color: "Bandaid", count: 206 },
      { color: "Rainbow Shirt", count: 83 },
      { color: "Dotted Bowtie", count: 145 },
      { color: "Nothing", count: 4833 },
    ],
  },
  {
    trait: "Tail",
    colors: [
      { color: "Balloon Blue", count: 832 },
      { color: "Balloon Pink", count: 684 },
      { color: "Balloon Gold", count: 76 },
      { color: "Balloon Purple", count: 419 },
      { color: "Balloon Rainbow", count: 7 },
      { color: "Wallet", count: 261 },
      { color: "Credit Card", count: 143 },
      { color: "Bone", count: 37 },
      { color: "Ghost", count: 7 },
      { color: "Green Candy", count: 7 },
      { color: "Flame", count: 7 },
      { color: "Parrot", count: 7 },
      { color: "Penguin", count: 7 },
      { color: "Hourglass", count: 7 },
      { color: "Mud", count: 1581 },
      { color: "Sprinkles", count: 957 },
      { color: "Fleas", count: 1087 },
      { color: "Nothing", count: 3874 },
    ],
  },
  {
    trait: "Back",
    colors: [
      { color: "Milk Box", count: 1163 },
      { color: "Milk Bottle", count: 1031 },
      { color: "Closed Book", count: 838 },
      { color: "Console", count: 241 },
      { color: "Controller", count: 329 },
      { color: "Casette", count: 541 },
      { color: "Floppy Disk", count: 412 },
      { color: "Coins", count: 197 },
      { color: "Dollars", count: 94 },
      { color: "Phone", count: 67 },
      { color: "Medkit", count: 762 },
      { color: "Scuba Tank", count: 43 },
      { color: "Fairy Wings", count: 7 },
      { color: "Worm", count: 7 },
      { color: "Chocolate", count: 7 },
      { color: "Devil Wings", count: 7 },
      { color: "Bomb", count: 7 },
      { color: "Snowball", count: 7 },
      { color: "Backpack", count: 7 },
      { color: "Popcorn", count: 188 },
      { color: "Catnip", count: 112 },
      { color: "Poison potion", count: 73 },
      { color: "Life Potion", count: 165 },
      { color: "Mana Potion", count: 135 },
      { color: "King Cape", count: 7 },
      { color: "Queen Cape", count: 7 },
      { color: "Nothing", count: 3546 },
    ],
  },
  {
    trait: "Eyes",
    colors: [
      { color: "Normal", count: 7000 },
      { color: "Interior", count: 600 },
      { color: "Exterior", count: 400 },
      { color: "Backwards", count: 2000 },
    ],  },
  {
    trait: "Mouth",
    colors: [
      { color: "Cigar", count: 313 },
      { color: "Water Bottle", count: 401 },
      { color: "Milk Bottle", count: 98 },
      { color: "Medical Mask", count: 314 },
      { color: "Tongue", count: 7 },
      { color: "Piggy Nose", count: 387 },
      { color: "Bubble Gum Gold", count: 38 },
      { color: "Bubble Gum Purple", count: 511 },
      { color: "Bubble Gum Blue", count: 648 },
      { color: "Vampire Teeth", count: 200 },
      { color: "Clown Nose", count: 832 },
      { color: "Cigarette", count: 455 },
      { color: "Vape", count: 73 },
      { color: "Open mouth", count: 1770 },
      { color: "Nothing", count: 4553 },
    ],
  },
  {
    trait: "Eye Wear",
    colors: [
      { color: "Monocle Gold", count: 63 },
      { color: "Monocle Blue", count: 763 },
      { color: "Monocle Green", count: 493 },
      { color: "Mask Purple", count: 698 },
      { color: "Mask Gold", count: 87 },
      { color: "Mask Blue", count: 240 },
      { color: "Mask Green", count: 399 },
      { color: "Glasses Green", count: 831 },
      { color: "Glasses Blue", count: 581 },
      { color: "Glasses Yellow", count: 189 },
      { color: "Glasses Purple", count: 75 },
      { color: "Glasses 3D", count: 51 },
      { color: "Sunglasses", count: 121 },
      { color: "Stoner Eyes", count: 115 },
      { color: "Laser Eyes", count: 31 },
      { color: "Scuba Diving Mask", count: 43 },
      { color: "Rainbow Glasses", count: 7 },
      { color: "Red Contacts", count: 7 },
      { color: "Candy Glasses", count: 7 },
      { color: "Devil Glasses", count: 7 },
      { color: "Ski Mask", count: 7 },
      { color: "Reading Glasses", count: 7 },
      { color: "Eye Patch", count: 7 },
      { color: "Nothing", count: 5171 },
    ],
  },
  {
    trait: "Hat",
    colors: [
      { color: "Wizzard Hat", count: 139 },
      { color: "Party Hat", count: 583 },
      { color: "Headband yellow", count: 612 },
      { color: "Headband Red", count: 763 },
      { color: "Headband Green", count: 521 },
      { color: "Headband Blue", count: 127 },
      { color: "Halo", count: 35 },
      { color: "Chef's Hat", count: 115 },
      { color: "Black Cap", count: 103 },
      { color: "Pink Cap", count: 231 },
      { color: "Yellow Cap", count: 468 },
      { color: "Headphones", count: 312 },
      { color: "Wig", count: 153 },
      { color: "Top Hat", count: 174 },
      { color: "Fast Food Cap", count: 451 },
      { color: "Viking Hat", count: 278 },
      { color: "Propeller Hat", count: 378 },
      { color: "Tiara", count: 114 },
      { color: "Right Earring", count: 423 },
      { color: "Left Earring", count: 206 },
      { color: "Dual Earrings", count: 75 },
      { color: "Pirate Bandana", count: 193 },
      { color: "Unicorn Horn", count: 7 },
      { color: "Bone", count: 7 },
      { color: "Cupcake", count: 7 },
      { color: "Devil Horns", count: 7 },
      { color: "Captain's Hat", count: 7 },
      { color: "Snowy Cap", count: 7 },
      { color: "Graduation Hat", count: 7 },
      { color: "Green Mohawk", count: 957 },
      { color: "Robin Meow Hat", count: 94 },
      { color: "Red Beanie", count: 684 },
      { color: "Bandana", count: 351 },
      // { color: "Nothing", count: 1397 },
      { color: "King Crown", count: 7 },
      { color: "Queen Crown", count: 7 },
    ],
  },
  
];

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};


export function isPrincipalOrAccount(address) {
  // Principal addresses typically contain dashes and are 63 characters long
  const principalRegex = /^[a-z0-9\-]{63}$/;
  
  // Account identifiers are typically 64 character hex strings
  const accountIdRegex = /^[a-f0-9]{64}$/;

  if (principalRegex.test(address)) {
    return "pa";
  } else if (accountIdRegex.test(address)) {
    return "ac";
  } else {
    return "unknown";
  }
}