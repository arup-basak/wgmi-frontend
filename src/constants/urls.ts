const urls = {
  getOdyssey: "/api/get-odyssey",
  getStage: "/api/get-stage",
  getAllowListBalance: (account: string) => `/api/allowlist-balance/${account}`,
  getMintedTxn: (account: string, mintQty: number) => `/api/get-mint-txn/${account}/${mintQty}`,
  getPublicListBalance: (account: string) => `/api/publiclist-balance/${account}`,
};

export default urls;
