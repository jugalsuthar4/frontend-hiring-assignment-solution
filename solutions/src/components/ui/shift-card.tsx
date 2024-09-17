import { bookedShift, cancelShift } from "@/actions/shifts";
import { Button } from "@/components/ui/button";
import useShift from "@/hooks/use-shift";
import moment from "moment";
import { useMemo } from "react";
import StatusText from "./status-text";
import SpinnerGreenSvg from "@/assets/spinner_green.svg";
import SpinnerRedSvg from "@/assets/spinner_red.svg";

type ShiftCardProps = {
  card: {
    id: string;
    startTime: number;
    endTime: number;
    booked: boolean;
    area: string;
    isOverlapping: boolean;
  };
  showArea: boolean;
};

const ShiftCard = ({
  card: { area, booked, endTime, id, isOverlapping, startTime },
  showArea,
}: ShiftCardProps) => {
  const formattedStartTime = useMemo(
    () => moment(startTime).format("LT"),
    [startTime]
  );
  const formattedEndTime = useMemo(
    () => moment(endTime).format("LT"),
    [endTime]
  );
  const isShiftStarted = useMemo(
    () => moment().isAfter(moment(startTime)),
    [startTime]
  );
  const {
    dispatch,
    state: { loadingShifts },
  } = useShift();

  const bookOrCancelShift = async () => {
    if (booked) {
      await cancelShift(id)(dispatch);
    } else {
      await bookedShift(id)(dispatch);
    }
  };
  const isLoading = useMemo(() => {
    return loadingShifts[id];
  }, [loadingShifts, id]);

  return (
    <div
      className={`flex justify-between border-[#ECEEF0] border-[1px] p-2 hover:bg-[#ECEEF0] cursor-pointer ${id}`}
      key={id}
    >
      <div className="flex flex-col">
        <h1>
          {formattedStartTime}-{formattedEndTime}
        </h1>
        {showArea && <p>{area}</p>}
      </div>

      <div className="flex gap-4 items-center">
        <StatusText booked={booked} overlapped={isOverlapping} />
        <Button
          variant={"outline"}
          className={
            booked ? "text-[#16A64D] border-[#16A64D]" : "text-primary"
          }
          disabled={isShiftStarted || isOverlapping}
          onClick={bookOrCancelShift}
        >
          {isLoading ? (
            <img
              src={booked ? SpinnerGreenSvg : SpinnerRedSvg}
              width={24}
              height={24}
            />
          ) : booked ? (
            "Cancel"
          ) : (
            "Book"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShiftCard;
