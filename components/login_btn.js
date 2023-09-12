"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function login_btn() {
  const { data: session } = useSession();

  if (session) {
    session.customdata = "holo saya yang di ubah";

    return (
      <>
        <img src={session.user.image} className=" h-20 w-20 "></img>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
