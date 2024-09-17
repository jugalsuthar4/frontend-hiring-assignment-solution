export interface IShift {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
  isOverlapping:boolean
}
