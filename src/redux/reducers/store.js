import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./index";

const middleware = [thunk];
const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
