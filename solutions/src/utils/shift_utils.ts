import { IShift } from "@/model/IShift";
import formatTime from "./format_time";
import { IGroupedShifts } from "@/model/IGroupedShifts";
import moment from "moment";

const mapAvailableShifts = (booked: IShift[], allShifts: IShift[]) => {
  const available = allShifts?.reduce<IGroupedShifts>((acc, shift) => {
    if (!acc[shift?.area]) {
      acc[shift?.area] = { count: 0, dates: {} };
    }
    const key = formatTime(shift?.startTime);

    if (!acc[shift?.area].dates[key]) {
      acc[shift?.area].dates[key] = [];
    }
    acc[shift?.area]?.dates[key].push({
      ...shift,
      isOverlapping: booked.some(
        (bookedShift) =>
          shift?.startTime < bookedShift?.endTime &&
          shift?.endTime > bookedShift?.startTime &&
          shift?.id !== bookedShift?.id
      ),
    });
    acc[shift?.area].count += 1;
    return acc;
  }, {});
  return available;
};

const groupBookedShiftsByDate = (shifts: IShift[]) => {
  return shifts?.reduce((acc, shift) => {
    const shiftDate = moment(shift.startTime).startOf("day");
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "day").startOf("day");

    let dateKey;

    if (shiftDate.isSame(today, "day")) {
      dateKey = "Today";
    } else if (shiftDate.isSame(tomorrow, "day")) {
      dateKey = "Tomorrow";
    } else {
      dateKey = shiftDate.format("DD MMMM YYYY");
    }

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(shift);
    return acc;
  }, {} as Record<string, IShift[]>);
};

export const organizeShifts = (shifts: IShift[]) => {
  shifts?.sort((a, b) => a.startTime - b.startTime);
  //storing booked shift in seperate array
  const bookedShifts = shifts?.filter((shift) => shift.booked);

  // mapping available shifts into IGroupedShifts format
  const available = mapAvailableShifts(bookedShifts, shifts);

  // mapping booked shifts into Record<string,IShift[]> format where key string is day
  // shifts corresponds to a day
  const groupedBookedShifts = groupBookedShiftsByDate(bookedShifts);

  return { available, groupedBookedShifts };
};


