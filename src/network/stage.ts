import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import type Stage from "@/interface/stage.interface";

export interface StageResponse {
  stage: {
    mint_stages: {
      data: Stage[];
    };
    stages: string[];
  };
}

export interface BalanceResponse {
  balance: string | number;
}

const fetchStage = async (accountAddress?: string) => {
  try {
    const stageResponse = await networkRequest<StageResponse>(
      urls.getStage,
      "GET"
    );

    if (!accountAddress) {
      return {
        stageResponse,
        allowlistReponse: null,
        publicListResponse: null,
      };
    }

    const allowlistBalance = await networkRequest<BalanceResponse>(
      urls.getAllowListBalance(accountAddress),
      "GET"
    ).then((res) => res?.balance);

    const publicListBalance = await networkRequest<BalanceResponse>(
      urls.getPublicListBalance(accountAddress),
      "GET"
    ).then((res) => res?.balance);

    return {
      stageResponse,
      allowlistBalance,
      publicListBalance,
    };
  } catch (e: any) {
    console.error("Error getting Stage Request", e.message);
  }
};

export default fetchStage;
