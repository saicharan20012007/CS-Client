import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./authentication/reducer";
import { IndentReducer } from "./indent/reducer";
import { IssueReducer } from "./issue/reducer";
import { ProjectReducer } from "./project/reducer";
import { PurchaseReducer } from "./purchase/reducer";
import { TaskReducer } from "./task/reducer";
import { UserReducer } from "./user/reducer";
import { VendorReducer } from "./vendor/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  IndentReducer,
  IssueReducer,
  ProjectReducer,
  PurchaseReducer,
  TaskReducer,
  UserReducer,
  VendorReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
