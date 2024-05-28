import Heading from "./Heading";

const ShowAPT = ({ value }: { value: string }) => {
  const formatAPT = (apt: number) => {
    return apt / 100000000;
  };
  return (
    <p className="font-semibold">{`${formatAPT(parseInt(value))} APT`}</p>
  );
};

export default ShowAPT;
