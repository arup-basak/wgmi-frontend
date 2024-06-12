import { useState, useEffect } from "react";
import fetchStage from "@/network/stage";
import Stage from "@/interface/stage.interface";

const useBalance = (account: any) => {
  const [key, setKey] = useState<number>(0);
  const refresh = () => setKey((prev) => prev + 1);
  const [allowListBalance, setAllowListBalance] = useState<any>(null);
  const [publicListBalance, setPublicListBalance] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchStage(account?.address);
      if (result) {
        setAllowListBalance(result.allowlistReponse);
        setPublicListBalance(result.publicListBalance);
      }
    };

    fetchData();
  }, [account?.address, key]);

  return { allowListBalance, publicListBalance, refresh };
};

export default useBalance;
