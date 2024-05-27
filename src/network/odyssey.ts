import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import { type OdysseyResource } from "@/interface/OdysseyTypes";

interface OdysseyResponse {
  odyssey: OdysseyResource;
}

interface Fees {
  key: string;
  amount: string; // Note: amount is still considered as string
}

interface FeesData {
  key: string;
  value: {
    amount: string; // Note: amount is still considered as string
  }[];
}

const fetchOdyssey = async (aptos: any) => {
  if (!aptos) return;
  try {
    const odysseyResponse = await networkRequest<OdysseyResponse>(
      urls.getOdyssey,
      "GET"
    );

    const odyssey = odysseyResponse?.odyssey;

    if (!odyssey) {
      console.error("Odyssey not found");
      return;
    }

    const sum_fees: Fees[] =
      odyssey?.fees.data.map((item: FeesData) => {
        // Summing up the amount values within the value array
        const totalAmount = item.value.reduce(
          (acc, fee) => acc + parseInt(fee.amount),
          0
        );
        return { key: item.key, amount: totalAmount.toString() };
      }) || [];

    const collectionData = await aptos.getCollectionDataByCollectionId({
      collectionId: odyssey.collection.inner,
    });

    return { odyssey, sum_fees, collectionData };
  } catch (e: any) {
    console.error("Error getting odyssey:", e.message);
  }
};

export default fetchOdyssey;
