// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { apiSlice } from "./Slices/apiSlice";
// import authSliceReducer from './Slices/authSlice';

// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authSliceReducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import loginReducer from './Slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
  },
});

export default store;