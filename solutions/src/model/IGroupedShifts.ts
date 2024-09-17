import { IShift } from "./IShift";

export interface IGroupedShifts {
  [area: string]: {
    count: number;
    dates: {
      [date: string]: (IShift & { isOverlapping: boolean })[];
    };
  };
}
