// SomeComponent.tsx or another TypeScript file
import { useEffect, useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import Tag from "./Tag";
import { TokenMetadata } from "../interface/TokenMetadata";
import Heading from "./Heading";
import ImageViewer from "./AssetCard";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
  accountAddress: string;
  collectionAddress: string;
  aptos: Aptos;
}

const OwnedAssetsComponent: React.FC<Props> = ({
  accountAddress,
  collectionAddress,
  aptos,
}) => {
  const [ownedAssets, setOwnedAssets] =
    useState<TokenMetadata[]>(sampleTokenMetadata);

  const fetchMetadata = async (uri: string) => {
    const response = await fetch(uri);
    const metadata = await response.json();
    return metadata;
  };

  const fetchOwnedAssets = async () => {
    try {
      const ownedDigitalAssets =
        await aptos.getAccountOwnedTokensFromCollectionAddress({
          accountAddress: accountAddress,
          collectionAddress: collectionAddress,
        });
      const assetsWithMetadata = await Promise.all(
        ownedDigitalAssets.map(async (asset: any) => {
          let metadata = {
            name: "Default Name",
            image: "Default Image URL",
            description: "Default Description",
            attributes: [],
          };
          if (asset.current_token_data.token_uri) {
            const fetchedMetadata = await fetchMetadata(
              asset.current_token_data.token_uri
            );
            // Assuming the fetched metadata is properly structured; validate or use fallbacks as necessary
            metadata = {
              name: fetchedMetadata.name || metadata.name,
              image: fetchedMetadata.image || metadata.image,
              description: fetchedMetadata.description || metadata.description,
              attributes: fetchedMetadata.attributes || metadata.attributes,
            };
          }
          return {
            token_data_id: asset.current_token_data.token_data_id,
            token_name: asset.current_token_data.token_name,
            token_uri: asset.current_token_data.token_uri,
            metadata: metadata,
          };
        })
      );
      setOwnedAssets(assetsWithMetadata);
    } catch (error) {
      console.error("Failed to fetch owned assets:", error);
    }
  };
  /*
  useEffect(() => {
    fetchOwnedAssets();
    const interval = setInterval(fetchOwnedAssets, 10000); // Polling every 10 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [accountAddress, collectionAddress]);*/
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 py-4">
      {ownedAssets.map((asset, index) => (
        <ImageViewer imageSrc={asset.metadata.image} key={index}>
          <Heading text={asset.token_name} level="h4" />
          {/* <p className="text-base">ID: {asset.token_data_id}</p> */}
          <div className="flex-col-row gap-1">
            {asset.metadata.attributes?.map((attr, idx) => (
              <Tag text={`${attr.trait_type}: ${attr.value}`} key={idx} />
            ))}
          </div>
          <button className="mt-2 flex gap-2 justify-center items-center w-full">
            Share it on <FaXTwitter />
          </button>
        </ImageViewer>
      ))}
    </div>
  );
};

export default OwnedAssetsComponent;

const sampleTokenMetadata: TokenMetadata[] = [
  {
    token_data_id: "1",
    token_name: "Token One",
    token_uri: "https://example.com/token1",
    metadata: {
      name: "Token One",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token One",
      attributes: [
        { trait_type: "Color", value: "Red" },
        { trait_type: "Size", value: "Large" },
      ],
    },
  },
  {
    token_data_id: "2",
    token_name: "Token Two",
    token_uri: "https://example.com/token2",
    metadata: {
      name: "Token Two",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token Two",
      attributes: [
        { trait_type: "Color", value: "Blue" },
        { trait_type: "Size", value: "Medium" },
      ],
    },
  },
  {
    token_data_id: "3",
    token_name: "Token Three",
    token_uri: "https://example.com/token3",
    metadata: {
      name: "Token Three",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token Three",
      attributes: [
        { trait_type: "Color", value: "Green" },
        { trait_type: "Size", value: "Small" },
      ],
    },
  },
];
