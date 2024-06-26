// SomeComponent.tsx or another TypeScript file
import { useEffect, useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { TokenMetadata } from "../interface/TokenMetadata";
import Heading from "./Heading";
import ImageViewer from "./AssetCard";
import { OdysseyResource } from "@/interface/OdysseyTypes";

interface Props {
  accountAddress: string;
  collectionAddress: string;
  aptos: Aptos;
  odyssey: OdysseyResource;
}

const OwnedAssetsComponent: React.FC<Props> = ({
  accountAddress,
  collectionAddress,
  aptos,
  odyssey,
}) => {
  const [ownedAssets, setOwnedAssets] = useState<TokenMetadata[]>([]);

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

      console.log("Digital Assets", ownedDigitalAssets);
      const assetsWithMetadata = await Promise.all(
        ownedDigitalAssets.map(async (asset: any) => {
          let metadata = {
            name: "Default Name",
            image: odyssey.cover,
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

  useEffect(() => {
    fetchOwnedAssets();
    const interval = setInterval(fetchOwnedAssets, 10000); // Polling every 10 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [accountAddress, collectionAddress]);
  return (
    <>
      {ownedAssets.length > 0 && <Heading text="Your Minted NFTs: " level="h3" />}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 py-4">
        {ownedAssets.map((asset, index) => (
          <ImageViewer imageSrc={asset.metadata.image} key={index}>
            <Heading text={asset.token_name} level="h6" />
            {/* <p className="text-base">ID: {asset.token_data_id}</p>
          <div className="flex-col-row gap-1">
          {asset.metadata.attributes?.map((attr, idx) => (
            <Tag text={`${attr.trait_type}: ${attr.value}`} key={idx} />
            ))}
            </div>
            <motion.button
            className="mt-2 flex gap-2 justify-center items-center w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            >
            Share it on <FaXTwitter />
            </motion.button>*/}
          </ImageViewer>
        ))}
      </div>
    </>
  );
};

export default OwnedAssetsComponent;
