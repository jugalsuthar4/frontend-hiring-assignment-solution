export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export type LOADING_ACTION = typeof START_LOADING | typeof STOP_LOADING;

export const startLoading = (dispatch: React.Dispatch<LOADING_ACTION>) => {
  dispatch(START_LOADING);
};

export const stopLoading = (dispatch: React.Dispatch<LOADING_ACTION>) => {
  dispatch(STOP_LOADING);
};
