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
    <div className="h-[100px] w-[10px] relative">
      <div
        className={clsx(
          `bottom-[${+stPosition}px] h-[${-Math.floor(length)}px]`,
          "bg-green-400",
          "absolute w-[2px]",
        )}
      ></div>
    </div>
  );
}

export default TimeLine;
