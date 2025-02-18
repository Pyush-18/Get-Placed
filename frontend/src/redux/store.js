import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.js"
import jobReducer from "../redux/jobSlice.js"
import companyReducer from "../redux/companySlice.js"
import applicationReducer from "../redux/applicationSlice.js"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    application : applicationReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})