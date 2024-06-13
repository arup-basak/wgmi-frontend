"use client";

import React, { useState, useMemo, useEffect } from "react";
import io from "socket.io-client";
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
import OwnedCollectionAsset from "@/components/OwnedCollectionAsset";
import { type OdysseyResource } from "@/interface/OdysseyTypes";
import Stage from "@/interface/stage.interface";
import useBalance from "@/hooks/useBalance";
import { useMaxStore } from "@/libs/store";
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

const Page = () => {
  const { maxMint } = useMaxStore();
  const aptos = useMemo(() => getNetwork(), []);
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setLoading] = useState(false);

  const [odyssey, setOdyssey] = useState<OdysseyResource | null>();
  const [fees, setFees] = useState<Fees[]>([]);
  const [collectionData, setCollectionData] = useState<any | null>();

  const [stages, setStages] = useState<Stage[]>([]);

  const { allowListBalance, publicListBalance, refresh } = useBalance(account);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on("stage", (data) => {
      console.log(data);
      setStages(data.stage.mint_stages.data);
    });
    socket.on("odyssey", (data) => {
      setOdyssey(data.odyssey);
      setFees(data.odyssey.fees.data);
      setCollectionData(data.odyssey.collection);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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

      if (!mintedTxn) {
        console.error("Minting error: No minted transaction found");
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

      console.log("tokens", tokens);

      setLoading(false);
      refresh();
    } catch (error) {
      console.error("Minting error:", error);
      setLoading(false); // Set loading to false if there is an error
    }
  };

  if (odyssey)
    return (
      <main>
        <div className="glass-morphism bg-white bg-opacity-10 centered-container flex-row-col gap-6">
          <Image
            src={odyssey.cover}
            alt="cover image"
            className="aspect-square rounded-xl md:min-w-[25rem]"
            priority
          />
          <div className="space-y-2 md:space-y-4 md:min-w-[28rem]">
            <Heading text={collectionData?.collection_name} level="h2" />
            <p>{odyssey.description}</p>
            {stages.length > 0 &&
              stages.map((stage, index) => {
                const fee = fees.find((fee) => fee.key === stage.key);

                return (
                  <StageCard
                    stage={stage}
                    fee={fee}
                    key={index}
                    limit={
                      stage.key === "Presale mint stage"
                        ? allowListBalance
                        : publicListBalance
                    }
                  />
                );
              })}
            <MintedProgress
              maxSupply={parseInt(odyssey.collection_size)}
              totalMinted={parseInt(odyssey.minted)}
            />
            <CountButton
              onSubmit={handleMint}
              minLimit={0}
              defaultValue={1}
              maxLimit={maxMint === 0 ? 10 : maxMint}
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
              odyssey={odyssey}
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
