import { createStore } from "redux";
import tasksApp from "../reducers";

const store = createStore(tasksApp);

export default store;
