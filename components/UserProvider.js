"use client";
import React, { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserProvider({ children }) {
  const [data, setData] = useState({ is_login: false, akhir: [] });
  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
}
