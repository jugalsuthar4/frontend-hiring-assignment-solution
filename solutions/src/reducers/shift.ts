import {
  BOOK_SHIFT_ERROR,
  BOOK_SHIFT_SUCCESS,
  CANCEL_SHIFT_ERROR,
  CANCEL_SHIFT_SUCCESS,
  CLEAR_ERROR,
  FETCH_SHIFTS_ERROR,
  FETCH_SHIFTS_SUCCESS,
  SHIFT_ACTIONS,
  START_SHIFT_LOADING,
  STOP_SHIFT_LOADING,
} from "@/actions/shifts";
import { IGroupedShifts } from "@/model/IGroupedShifts";
import { IShift } from "@/model/IShift";

export interface initialStateType {
  loading: boolean;
  error: string;
  success: string;
  shifts: IShift[];
  bookedShift: Record<string, IShift[]>;
  availableShifts: IGroupedShifts;
  loadingShifts: Record<string, boolean>;
}

export const initialState: initialStateType = {
  error: "",
  success: "",
  loading: false,
  shifts: [],
  availableShifts: {},
  bookedShift: {},
  loadingShifts: { name: false },
};

const shiftReducer = (
  state: initialStateType = initialState,
  action: SHIFT_ACTIONS
): initialStateType => {
  switch (action.type) {
    case FETCH_SHIFTS_SUCCESS: {
      return {
        ...state,
        shifts: action.payload.shifts,
        availableShifts: action.payload.availableShifts,
        bookedShift: action.payload.bookedShifts,
      };
    }
    case FETCH_SHIFTS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case BOOK_SHIFT_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case BOOK_SHIFT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CANCEL_SHIFT_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case CANCEL_SHIFT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case START_SHIFT_LOADING: {
      return {
        ...state,
        loadingShifts: {
          ...state.loadingShifts,
          [action.payload]: true,
        },
      };
    }
    case STOP_SHIFT_LOADING: {
      return {
        ...state,
        loadingShifts: {
          ...state.loadingShifts,
          [action.payload]: false,
        },
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: "",
      };
    }
    default:
      return state;
  }
};
export default shiftReducer;
