# PawsArenaMarketplace


## Marketplace Logic FLow

The marketplace will offer these main features ie  direct listing, buying and selling, offer based buying and selling.

- To list an and NFT on the marketplace, the user needs to transfer the ownership of the  NFT to the marketplace and then call the listNFT method on the marketplace specifying the nft canister, its nft id, and the price. The marketplace checks the transaction history of the nft to see if the last transaction was to transfer the nft to the marketplace and if it is still the owner of the marketplace. If the conditions are met, the nft listed on the marketplace.

- To buy the nft, the user needs to approve the marketplace to deduct funds from their account. The marketplace transfers the funds from the buyer to itself, then transfers the nft to the buyer, And finally transfers the funds to the seller of the nft

- To place an offer, the buyer has to approve the marketplace canister to transfer the offer amount incase their offer is accepted and the time the offer is expiring. The seller can choose from a list of the available offers to accept.







