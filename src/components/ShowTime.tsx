import { unixTimeDiff } from "@/libs/time";
import Tag from "./Tag";

interface Props {
  startInTimestamp: number;
  endInTimestamp: number;
}

const ShowTime = ({ startInTimestamp, endInTimestamp }: Props) => {
  const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);

  if (currentUnixTimestampSeconds < startInTimestamp) {
    return <p className="text-end">{`Starts in ${unixTimeDiff(startInTimestamp)}`}</p>;
  }

  if (currentUnixTimestampSeconds < endInTimestamp) {
    return (
      <p className="md:min-w-[15rem] text-end">{`Ends in ${unixTimeDiff(endInTimestamp)}`}</p>
    );
  }

  return <Tag text="Ended" />;
};

export default ShowTime;
