import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import type Stage from "@/interface/stage.interface";

interface StageResponse {
  stage: {
    mint_stages: {
      data: Stage[];
    };
    stages: string[];
  };
}

const fetchStage = async (accountAddress: string) => {
  try {
    const stageResponse = await networkRequest<StageResponse>(
      urls.getStage,
      "GET"
    );

    const allowlistReponse = await networkRequest(
      urls.getAllowListBalance(accountAddress),
      "GET"
    );

    const publicListBalance = await networkRequest(
      urls.getPublicListBalance(accountAddress),
      "GET"
    );

    return {
      stageResponse,
      allowlistReponse,
      publicListBalance,
    };
  } catch (e: any) {
    console.error("Error getting Stage Request", e.message);
  }
};

export default fetchStage;
