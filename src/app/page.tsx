"use client";

import React, { useState, useMemo } from "react";
import getNetwork from "@/network/getNetwork";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import urls from "@/constants/urls";
import networkRequest from "@/libs/networkRequest";
import findAllMintedTokens from "@/libs/findAllMintedTokens";
import Spinner from "@/components/Spinner";
import Heading from "@/components/Heading";
import Image from "@/components/Image";
import MintedProgress from "@/components/MintedProgress";
import CountButton from "@/components/CountButton";
import StageCard from "@/components/StageCard";
import useOdyssey from "@/hooks/useOdyssey";
import useStage from "@/hooks/useStage";
import OwnedCollectionAsset from "@/components/OwnedCollectionAsset";

const Page = () => {
  const aptos = useMemo(() => getNetwork(), []);
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setLoading] = useState(false);

  const {
    odyssey,
    sum_fees: fees,
    collectionData,
  } = useOdyssey(account);
  const { stages } = useStage(account);

  const handleMint = async (mintQty: number) => {
    if (!account || !odyssey || !mintQty || isLoading) {
      return;
    }

    try {
      setLoading(true); // Set loading to true when minting starts

      const mintedTxn = await networkRequest<any>(
        urls.getMintedTxn(account.address, mintQty),
        "GET"
      );

      if(!mintedTxn) {
        console.error("Minting error: No minted transaction found")
        return;
      }

      //aptos.transaction.batch.forSingleAccount({ sender: account, data: data.payloads });
      //Sign and submit transaction to chain
      const response2 = await signAndSubmitTransaction(mintedTxn.payloads);

      //Wait for transaction
      const mintedTransactions = await aptos.waitForTransaction({
        transactionHash: response2.hash,
      });

      // //console.log(mintedTransactions);

      // // Function to filter and find all 'Mint' events

      const tokens = await findAllMintedTokens(mintedTransactions);

      console.log(tokens);

      setLoading(false);
    } catch (error) {
      console.error("Minting error:", error);
      setLoading(false); // Set loading to false if there is an error
    }
  };


  if (odyssey)
    return (
      <main>
        <div className="glass-morphism bg-white bg-opacity-10 centered-container flex-row-col gap-6 min-w-[24rem]">
          <Image
            src={odyssey.cover}
            alt="cover image"
            className="aspect-square rounded-xl md:min-w-[25rem]"
            priority
          />
          <div className="space-y-2 md:space-y-4 md:min-w-[28rem]">
            <Heading text={String(collectionData.collection_name)} level="h2" />
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
        {account && (
          <div className="p-12 max-w-screen-xl flex flex-col items-center">
            <Heading text="Your Minted NFTs: " level="h3" />
            <OwnedCollectionAsset
              accountAddress={account.address}
              collectionAddress={odyssey.collection.inner}
              aptos={aptos}
            />
          </div>
        )}
      </main>
    );

  return (
    <>
      <Spinner />
    </>
  );
};

export default Page;
