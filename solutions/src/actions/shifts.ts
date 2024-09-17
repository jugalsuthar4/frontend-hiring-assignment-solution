import axios from "axios";
import { IShift } from "@/model/IShift";
import { SERVER } from "@/constants/constant";
import { organizeShifts } from "@/utils/shift_utils";
import { IGroupedShifts } from "@/model/IGroupedShifts";

export const FETCH_SHIFTS_SUCCESS = "FETCH_SHIFTS";
export const FETCH_SHIFT_SUCCESS = "FETCH_SHIFT";
export const FETCH_SHIFTS_ERROR = "FETCH_SHIFTS_ERROR";
export const FETCH_SHIFT_ERROR = "FETCH_SHIFT_ERROR";
export const BOOK_SHIFT_SUCCESS = "BOOK_SHIFT_SUCCESS";
export const BOOK_SHIFT_ERROR = "BOOK_SHIFT_ERROR";
export const CANCEL_SHIFT_SUCCESS = "CANCEL_SHIFT_SUCCESS";
export const CANCEL_SHIFT_ERROR = "CANCEL_SHIFT_ERROR";
export const START_SHIFT_LOADING = "START_SHIFT_LOADING";
export const STOP_SHIFT_LOADING = "STOP_SHIFT_LOADING";
export const CLEAR_ERROR = "CLEAR_ERROR";

export type SHIFT_ACTIONS =
  | {
      type: typeof FETCH_SHIFTS_SUCCESS;
      payload: {
        shifts: IShift[];
        bookedShifts: Record<string, IShift[]>;
        availableShifts: IGroupedShifts;
      };
    }
  | {
      type: typeof FETCH_SHIFTS_ERROR;
      payload: string;
    }
  | {
      type: typeof FETCH_SHIFT_SUCCESS;
      payload: IShift;
    }
  | {
      type: typeof FETCH_SHIFT_ERROR;
      payload: string;
    }
  | {
      type: typeof BOOK_SHIFT_SUCCESS;
      payload: string;
    }
  | {
      type: typeof BOOK_SHIFT_ERROR;
      payload: string;
    }
  | {
      type: typeof CANCEL_SHIFT_SUCCESS;
      payload: string;
    }
  | {
      type: typeof CANCEL_SHIFT_ERROR;
      payload: string;
    }
  | {
      type: typeof START_SHIFT_LOADING;
      payload: string;
    }
  | {
      type: typeof STOP_SHIFT_LOADING;
      payload: string;
    }
  | {
      type: typeof CLEAR_ERROR;
    };

export const fetchShifts =
  () => async (dispatch: React.Dispatch<SHIFT_ACTIONS>) => {
    try {
      dispatch({ type: CLEAR_ERROR });
      const result = await axios.get<IShift[]>(`${SERVER}`);
      const shifts = result.data;
      const { available, groupedBookedShifts } = organizeShifts(shifts ?? []);
      dispatch({
        type: FETCH_SHIFTS_SUCCESS,
        payload: {
          shifts,
          availableShifts: available,
          bookedShifts: groupedBookedShifts,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return dispatch({ type: FETCH_SHIFTS_ERROR, payload: error.message });
      }
      return dispatch({
        type: FETCH_SHIFTS_ERROR,
        payload: "unable to fetch shifts",
      });
    }
  };

/**
 *
 * Note : There are some issues in post request while sending request to hapi server
 * for temporary i changed that http post method to get in hapi server
 * url: https://stackoverflow.com/questions/72052025/post-request-not-completing-on-postman
 * incompatibilty with my current node version
 */
export const bookedShift =
  (id: string) => async (dispatch: React.Dispatch<SHIFT_ACTIONS>) => {
    try {
      dispatch({ type: START_SHIFT_LOADING, payload: id });
      dispatch({ type: CLEAR_ERROR });
      await axios.get(`${SERVER}/${id}/book`);
      dispatch({
        type: BOOK_SHIFT_SUCCESS,
        payload: "shift booked successfully",
      });
      dispatch({ type: STOP_SHIFT_LOADING, payload: id });
      fetchShifts()(dispatch);
    } catch (error) {
      dispatch({ type: STOP_SHIFT_LOADING, payload: id });
      if (error instanceof Error) {
        return dispatch({ type: BOOK_SHIFT_ERROR, payload: error.message });
      }
      return dispatch({
        type: BOOK_SHIFT_ERROR,
        payload: "unable to book shifts",
      });
    }
  };

/**
 *
 * Note : There are some issues in post request while sending request to hapi server
 * for temporary i changed that http post method to get in hapi server
 * url: https://stackoverflow.com/questions/72052025/post-request-not-completing-on-postman
 * incompatibilty with my current node version
 */

export const cancelShift =
  (id: string) => async (dispatch: React.Dispatch<SHIFT_ACTIONS>) => {
    try {
      dispatch({ type: START_SHIFT_LOADING, payload: id });
      dispatch({ type: CLEAR_ERROR });
      await axios.get(`${SERVER}/${id}/cancel`);
      dispatch({ type: STOP_SHIFT_LOADING, payload: id });
      dispatch({
        type: CANCEL_SHIFT_SUCCESS,
        payload: "shift cancelled successfully",
      });
      fetchShifts()(dispatch);
    } catch (error) {
      dispatch({ type: STOP_SHIFT_LOADING, payload: id });
      if (error instanceof Error) {
        return dispatch({ type: CANCEL_SHIFT_ERROR, payload: error.message });
      }
      return dispatch({
        type: CANCEL_SHIFT_ERROR,
        payload: "unable to cancel shifts",
      });
    }
  };
