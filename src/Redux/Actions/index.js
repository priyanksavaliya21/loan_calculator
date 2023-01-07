import { TotalResults } from "../constant";

export const TotalResultsAction = (payloadData) => ({
  type: TotalResults,
  payload: payloadData,
});
