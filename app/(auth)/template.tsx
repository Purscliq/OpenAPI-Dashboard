"use client";
import { useEffect, useLayoutEffect } from "react";
import { updateUser } from "@/slice/userSlice";
import { useAppDispatch } from "@/context/store";
import { useLazyProfileQuery } from "@/services/users/index.service";

const Template = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  let token: unknown = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [getUser, { isLoading }] = useLazyProfileQuery({});
  useEffect(() => {
    if (token) {
      getUser({})
        .unwrap()
        .then((res) => {
          dispatch(updateUser(res?.data?.data));
        });
    }
  }, [token]);
  useLayoutEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  return <>{children}</>;
};

export default Template;
