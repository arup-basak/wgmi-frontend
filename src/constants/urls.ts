const urls = {
  getOdyssey: "/get-odyssey",
  getStage: "/get-stage",
  getAllowListBalance: (account: string) => `/allowlist-balance/${account}`,
  getMintedTxn: (account: string, mintQty: number) => `/get-mint-txn/${account}/${mintQty}`,
  getPublicListBalance: (account: string) => `/publiclist-balance/${account}`,
};

export default urls;
