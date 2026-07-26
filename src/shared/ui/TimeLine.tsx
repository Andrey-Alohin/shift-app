import clsx from "clsx";

interface TimeLineProps {
  start: string;
  end: string;
  full: boolean;
}

function TimeLine({ start, end, full }: TimeLineProps) {
  const stPosition = (Number(start.split(":")[0]) * 100) / 24;
  const length = stPosition - (Number(end.split(":")[0]) * 100) / 24;
  return (
    <div className="h-44 w-[10px] relative">
      <div
        className="absolute w-full bg-indigo-300"
        style={{ bottom: `${stPosition}%`, height: `${-length}%` }}
      ></div>
    </div>
  );
}

export default TimeLine;
