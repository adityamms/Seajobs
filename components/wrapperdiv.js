"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import React from "react";

export default function wrapperdiv({ children }) {
  let { ubah, setUbah } = useContext(ThemeContext);
  return (
    <div
      className={`${
        ubah
          ? "bg-neutral-700 border-black border-2"
          : "bg-white border-2 border-blue-900"
      }`}
    >
      {children}
    </div>
  );
}
