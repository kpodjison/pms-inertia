// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSlice";
const rootReducer = combineReducers({
    adminDash: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
