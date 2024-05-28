"use client";

import React, { useState } from "react";
import getNetwork from "@/network/getNetwork";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import findAllMintedTokens from "@/libs/findAllMintedTokens";
import Spinner from "@/components/Spinner";
import type Stage from "@/interface/stage.interface";
import Heading from "@/components/Heading";
import Image from "@/components/Image";
import MintedProgress from "@/components/MintedProgress";
import CountButton from "@/components/CountButton";
import StageCard from "@/components/StageCard";
import useOdyssey from "@/hooks/useOdyssey";
import useStage from "@/hooks/useStage";

const Page = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState<string>("");

  const aptos = getNetwork();
  const {
    odyssey,
    sum_fees: fees,
    collectionData,
  } = useOdyssey(aptos, account);
  const { stages } = useStage(account);

  const handleMint = async (mintQty: number) => {
    if (!account) {
      return;
    }
    try {
      setLoading(true); // Set loading to true when minting starts

      const mintedTxn = await networkRequest<any>(
        urls.getMintedTxn(account.address, mintQty),
        "GET"
      );

      //aptos.transaction.batch.forSingleAccount({ sender: account, data: data.payloads });
      //Sign and submit transaction to chain
      const response2 = await signAndSubmitTransaction(mintedTxn.payloads);

      //Wait for transaction
      const mintedTransactions = await aptos.waitForTransaction({
        transactionHash: response2.hash,
      });

      //console.log(mintedTransactions);

      // Function to filter and find all 'Mint' events

      const tokens = await findAllMintedTokens(mintedTransactions);

      setLoading(false);
    } catch (error) {
      console.error("Minting error:", error);
      setLoading(false); // Set loading to false if there is an error
    }
  };

  if (!isLoading && odyssey)
    return (
      <main>
        <div className="glass-morphism centered-container flex-row-col gap-6">
          <Image
            src={odyssey.cover}
            alt="cover image"
            className="aspect-square rounded-xl min-w-[25rem]"
          />
          <div className="space-y-2 md:space-y-4">
            <Heading text={collectionName} level="h2" />
            <p>{odyssey.description}</p>
            {stages.length > 0 &&
              stages.map((stage, index) => {
                const fee = fees.find((fee) => fee.key === stage.key);

                return <StageCard stage={stage} fee={fee} key={index} />;
              })}
            <MintedProgress
              maxSupply={parseInt(odyssey.collection_size)}
              totalMinted={parseInt(odyssey.minted)}
            />
            <CountButton
              onSubmit={handleMint}
              minLimit={0}
              defaultValue={1}
              maxLimit={10}
            />
          </div>
        </div>
      </main>
    );

  return (
    <>
      <Spinner />
    </>
  );
};

export default Page;
