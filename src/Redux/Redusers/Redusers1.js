import { TotalResults } from "../constant";

export const inhitialState = {
  TotalResultsBlock: [],
};

export const TotalResultstRedusers = (state = inhitialState, action) => {
  switch (action.type) {
    case TotalResults:
      return {
        TotalResultsBlock: [action.payload, ...state.TotalResultsBlock],
      };
    default:
      return state;
  }
};
