import { useState, useEffect } from "react";
import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import { type OdysseyResource } from "@/interface/OdysseyTypes";
import Fee from "@/interface/fees.interface";
import getNetwork from "@/network/getNetwork";

interface OdysseyResponse {
  odyssey: OdysseyResource;
}

interface Fees {
  key: string;
  amount: string;
}

interface FeesData {
  key: string;
  value: {
    amount: string;
  }[];
}

const fetchOdysseyData = async (aptos: any) => {
  try {
    const odysseyResponse = await networkRequest<OdysseyResponse>(
      urls.getOdyssey,
      "GET"
    );

    const odyssey = odysseyResponse?.odyssey;

    if (!odyssey) {
      console.error("Odyssey not found");
      return null;
    }

    const sum_fees: Fees[] =
      odyssey?.fees.data.map((item: FeesData) => {
        const totalAmount = item.value.reduce(
          (acc, fee) => acc + parseInt(fee.amount),
          0
        );
        return { key: item.key, amount: totalAmount.toString() };
      }) || [];

    const collectionData = await aptos.getCollectionDataByCollectionId({
      collectionId: odyssey.collection.inner,
    });

    console.log("Collection Data", collectionData)

    return { odyssey, sum_fees, collectionData };
  } catch (e: any) {
    console.error("Error getting odyssey:", e.message);
    return null;
  }
};

const useOdyssey = (account: any) => {
  const aptos = getNetwork();

  const [odyssey, setOdyssey] = useState<OdysseyResource | null>();
  const [sum_fees, setFees] = useState<Fees[]>([]);
  const [collectionData, setCollectionData] = useState<any | null>();

  useEffect(() => {
    if (!aptos) return;

    const fetchData = async () => {
      const result = await fetchOdysseyData(aptos);
      if (result) {
        result.odyssey && setOdyssey(result.odyssey as OdysseyResource);
        result.sum_fees && setFees(result.sum_fees as Fee[]);
        result.collectionData && setCollectionData(result.collectionData);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [account?.address]);

  return { odyssey, sum_fees, collectionData };
};

export default useOdyssey;
