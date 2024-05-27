import { unixTimeDiff } from "@/libs/time";

interface Props {
  startInTimestamp: number;
  endInTimestamp: number;
}

const ShowTime = ({ startInTimestamp, endInTimestamp }: Props) => {
  const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);

  if (currentUnixTimestampSeconds < startInTimestamp) {
    return <p>{`Starts in ${unixTimeDiff(startInTimestamp)}`}</p>;
  }

  if (currentUnixTimestampSeconds < endInTimestamp) {
    return (
      <p>{`Ends in ${unixTimeDiff(endInTimestamp)}`}</p>
    );
  }

  return <p>Ended</p>;
};

export default ShowTime;
