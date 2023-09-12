"use client";
import { createContext, useState } from "react";

export const ThemeContext = createContext(false);

export default function ThemeProvider({ children }) {
  const [ubah, setUbah] = useState(false);
  return (
    <ThemeContext.Provider value={{ ubah, setUbah }}>
      {children}
    </ThemeContext.Provider>
  );
}
