import { createStore } from "redux";
import RootRedusers from "./Redusers/index";

const store = createStore(
  RootRedusers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
