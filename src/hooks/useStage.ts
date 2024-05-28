import { useState, useEffect } from "react";
import fetchStage, { type StageResponse } from "@/network/stage";
import Stage from "@/interface/stage.interface";

interface StageData {
  stageResponse: StageResponse | null;
  allowlistResponse: any | null;
  publicListBalance: any | null;
}

const useStage = (account: any) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [allowListBalance, setAllowListBalance] = useState<any>(null);
  const [publicListBalance, setPublicListBalance] = useState<any>(null);

  useEffect(() => {
    if (!account?.address) return;

    const fetchData = async () => {
      const result = await fetchStage(account.address);
      if (result) {
        setStages(result.stageResponse?.stage.mint_stages.data || []);
        setAllowListBalance(result.allowlistReponse);
        setPublicListBalance(result.publicListBalance);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [account?.address]);

  return { stages, allowListBalance, publicListBalance };
};

export default useStage;
