import { ShiftContext } from "@/context/shift";
import { useContext } from "react";

const useShift = () => {
  const context = useContext(ShiftContext);
  return context;
};

export default useShift;
