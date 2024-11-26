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

export const traitsData = [
  {
    trait: "Background",
    colors: ["Gray", "Green", "Sand", "Blue", "Red", "Pink", "Purple"],
  },
  {
    trait: "Ground",
    colors: [
      "Carpet Green",
      "Carpet Yellow",
      "Carpet Pink",
      "Carpet Blue",
      "Clouds",
      "Blood",
      "Candies",
      "Embers",
      "Water",
      "Ice",
      "Books",
      "Nothing",
    ],
  },
  {
    trait: "Fur",
    colors: ["Gray", "Green", "Teal", "Yellow", "Red", "Pink", "Purple"],
  },
  {
    trait: "Ground Back",
    colors: [
      "Poop Brown",
      "Poop Blue",
      "Poop Pink",
      "Poop Gold",
      "Fart Gray",
      "Fart Green",
      "Fart Blue",
      "Trash Can",
      "Trash Bag",
      "Money Bag",
      "Coke Bottle",
      "Anchor",
      "Empty Bottle",
      "Ice Cream",
      "Bullet",
      "Cone",
      "Barrell",
      "Spray Can",
      "Ball",
      "Cloud",
      "Mud",
      "Blue Candy",
      "Flame",
      "Feather",
      "Frozen Popsicle",
      "Paper",
      "Nothing",
    ],
  },
  {
    trait: "Ground Front",
    colors: [
      "Food Bowl",
      "Water Bowl",
      "Milk Bowl",
      "Fish",
      "Cardboard Box",
      "Thread Ball",
      "Glass Bottle",
      "Cherries",
      "Cookie",
      "Burger",
      "French Fries",
      "Soda",
      "Paper Plane",
      "Flower Pot",
      "Rubber Duck",
      "Tennis Ball",
      "Tennis Racket",
      "Matchbox",
      "Mug",
      "Coffee Cup",
      "Cloud",
      "Gravestone",
      "Yellow Candy",
      "Flame",
      "Boat",
      "Frozen Icecream",
      "Ruler",
      "Nothing",
    ],
  },
  {
    trait: "Kitty Color",
    colors: [
      "Sprinkles",
      "Red sports Tshirt",
      "Regular Gray Tshirt",
      "Regular Black Tshirt",
      "Dfinity TShirt Gray",
      "Dfinity TShirt Black",
      "Wand",
      "Shovel",
      "Candies",
      "Trident",
      "Pirate Sword",
      "Fancy Popsicle",
      "Pencil",
      "Mud",
      "Fleas",
      "Purple Suit",
      "Bowtie",
      "Bandaid",
      "Rainbow Shirt",
      "Dotted Bowtie",
      "Nothing",
    ],
  },
  {
    trait: "Tail",
    colors: [
      "Balloon Blue",
      "Balloon Pink",
      "Balloon Gold",
      "Balloon Purple",
      "Balloon Rainbow",
      "Wallet",
      "Credit Card",
      "Bone",
      "Ghost",
      "Green Candy",
      "Flame",
      "Parrot",
      "Penguin",
      "Hourglass",
      "Mud",
      "Sprinkles",
      "Fleas",
      "Nothing",
    ],
  },
  {
    trait: "Back",
    colors: [
      "Milk Box",
      "Milk Bottle",
      "Closed Book",
      "Console",
      "Controller",
      "Casette",
      "Floppy Disk",
      "Coins",
      "Dollars",
      "Phone",
      "Medkit",
      "Scuba Tank",
      "Fairy Wings",
      "Worm",
      "Chocolate",
      "Devil Wings",
      "Bomb",
      "Snowball",
      "Backpack",
      "Popcorn",
      "Catnip",
      "Poison potion",
      "Life Potion",
      "Mana Potion",
      "King Cape",
      "Queen Cape",
      "Nothing",
    ],
  },
  {
    trait: "Eyes",
    colors: ["Normal", "Interior", "Exterior", "Backwards"],
  },
  {
    trait: "Mouth",
    colors: [
      "Cigar",
      "Water Bottle",
      "Milk Bottle",
      "Medical Mask",
      "Tongue",
      "Piggy Nose",
      "Bubble Gum Gold",
      "Bubble Gum Purple",
      "Bubble Gum Blue",
      "Vampire Teeth",
      "Clown Nose",
      "Cigarette",
      "Vape",
      "God tongue",
      "Nothing",
    ],
  },
  {
    trait: "Eye Wear",
    colors: [
      "Monocle Gold",
      "Monocle Blue",
      "Monocle Green",
      "Mask Purple",
      "Mask Gold",
      "Mask Blue",
      "Mask Green",
      "Glasses Green",
      "Glasses Blue",
      "Glasses Yellow",
      "Glasses Purple",
      "Glasses 3D",
      "Sunglasses",
      "Stoner Eyes",
      "Laser Eyes",
      "Scuba Diving Mask",
      "Rainbow Glasses",
      "Red Contacts",
      "Candy Glasses",
      "Devil Glasses",
      "Ski Mask",
      "Reading Glasses",
      "Eye Patch",
      "Nothing",
    ],
  },
  {
    trait: "Hat",
    colors: [
      "Wizzard Hat",
      "Party Hat",
      "Headband yellow",
      "Headband Red",
      "Headband Green",
      "Headband Blue",
      "Halo",
      "Chef's Hat",
      "Black Cap",
      "Pink Cap",
      "Yellow Cap",
      "Headphones",
      "Wig",
      "Top Hat",
      "Fast Food Cap",
      "Viking Hat",
      "Propeller Hat",
      "Tiara",
      "Right Earring",
      "Left Earring",
      "Dual Earrings",
      "Pirate Bandana",
      "Unicorn Horn",
      "Bone",
      "Cupcake",
      "Devil Horns",
      "Captain's Hat",
      "Snowy Cap",
      "Graduation Hat",
      "Green Mohawk",
      "Robin Meow Hat",
      "Red Beanie",
      "Bandana",
      "Nothing",
      "King Crown",
      "Queen Crown",
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