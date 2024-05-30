import urls from "@/constants/urls";
import networkRequest from "./networkRequest";

const updateTokenMetadataImage = async (index: string, token: string) => {
  try {
    const response = await networkRequest(
      urls.updateMetadataImage(index, token),
      "GET"
    );

    console.log("Updated token metadata:", response);
  } catch (error: any) {
    console.error("Error updating token metadata:", error.message);
  }
};

const findAllMintedTokens = async (transactions: any) => {
  const changes = transactions.changes || [];
  const mintedToken = [];
  for (const change of changes) {
    if (change.data) {
      if (change.data.type === "0x4::token::TokenIdentifiers") {
        console.log(change);
        const tokenAddress = change.address;
        const tokenIndex = change.data.data.index.value;
        await updateTokenMetadataImage(tokenIndex, tokenAddress);
        mintedToken.push(change);
      }
    }
  }
  return mintedToken;
};

export default findAllMintedTokens;
