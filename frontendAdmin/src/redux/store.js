import { createStore } from "redux";
import { currencyReducer } from "./reducers/currencyReducer";

const appStore = createStore(currencyReducer);

export default appStore;