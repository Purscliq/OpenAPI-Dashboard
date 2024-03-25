import { apiKeysApi } from "@/services/apikeys/index.service";
import { businessApi } from "@/services/business/index.service";
import { webhooksApi } from "@/services/apikeys/index.service";
import { whitelistApi } from "@/services/apikeys/index.service";
import { authApi } from "@/services/auth/index.service";
import { userApi } from "@/services/users/index.service";
import userSlice from "@/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [apiKeysApi.reducerPath]: apiKeysApi.reducer,
    [webhooksApi.reducerPath]: webhooksApi.reducer,
    [whitelistApi.reducerPath]: whitelistApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,

    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      apiKeysApi.middleware,
      webhooksApi.middleware,
      whitelistApi.middleware,
      businessApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define custom hooks for typing useSelector and useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
