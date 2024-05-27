const findAllMintedTokens = async (transactions: any) => {
  const changes = transactions.changes || [];
  const mintedToken = [];
  for (const change of changes) {
    if (change.data) {
      if (change.data.type === "0x4::token::TokenIdentifiers") {
        console.log(change);
        const tokenAddress = change.address;
        const tokenIndex = change.data.data.index.value;
        // await updateTokenMetadataImage(tokenIndex, tokenAddress);
        mintedToken.push(change);
      }
    }
  }
  return mintedToken;
};

export default findAllMintedTokens;
