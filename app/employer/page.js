"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  return (
    <div className=" w-52 h-52 border border-black">
      <input placeholder="nama saya aditya marzuk" />

      <button onClick={next}>Next button</button>
    </div>
  );
}
