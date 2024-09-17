import { IShift } from "@/model/IShift";
import ShiftCard from "./shift-card";
import FlipMove from "react-flip-move";

type ShiftGroupProps = {
  groupedShifts: Record<string, IShift[]>;
  showArea?: boolean;
};

const ShiftGroup = ({ groupedShifts, showArea = true }: ShiftGroupProps) => {
  return (
    <div>
      {Object.keys(groupedShifts).map((key) => {
        return (
          <div className="w-full  bg-white" key={key}>
            <div className="w-full bg-[#d9e3ed] p-2 ">{key}</div>
            <FlipMove>
              {groupedShifts[key].map((shift) => {
                return (
                  <div key={shift.id}>
                    <ShiftCard card={shift} showArea={showArea} />
                  </div>
                );
              })}
            </FlipMove>
          </div>
        );
      })}
    </div>
  );
};

export default ShiftGroup;
