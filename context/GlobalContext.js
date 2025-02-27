"use client";
import { createContext, useContext, useState, useEffect } from "react";
import getUnreadCount from "@/app/actions/getUnreadCount";
import { useSession } from "next-auth/react";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      getUnreadCount().then((c) => setCount(c));
    }
  }, [session, getUnreadCount]);

  return (
    <GlobalContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
