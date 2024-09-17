import { SHIFT_ACTIONS } from "@/actions/shifts";
import shiftReducer, { initialState, initialStateType } from "@/reducers/shift";
import { createContext, useReducer } from "react";

export const ShiftContext = createContext<{
  state: initialStateType;
  dispatch: React.Dispatch<SHIFT_ACTIONS>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ShiftContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(shiftReducer, initialState);
  const value = { state, dispatch };
  return (
    <ShiftContext.Provider value={value}>{children}</ShiftContext.Provider>
  );
};
