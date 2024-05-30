const urls = {
  getOdyssey: "/api/get-odyssey",
  getStage: "/api/get-stage",
  getAllowListBalance: (account: string) => `/api/allowlist-balance/${account}`,
  getMintedTxn: (account: string, mintQty: number) => `/api/get-mint-txn/${account}/${mintQty}`,
  getPublicListBalance: (account: string) => `/api/publiclist-balance/${account}`,
  updateMetadataImage: (index: string, token: string) => `/api/update-metadata-image/${index}/${token}`,
};

export default urls;
