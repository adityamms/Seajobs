"use client";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import Switchbg from "./Switchbg";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { notify } from "./toaster";

export default function navbar() {
  const [click, setClick] = useState(false);
  const router = useRouter();
  let login = Cookies.get("user");

  let cookies = login && JSON.parse(login);

  let { ubah, setUbah } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      Cookies.remove("user");
      Cookies.remove("login_as", {
        path: "/login",
      });
      notify.sukses("LOGOUT");
      router.push("/");
    } catch (error) {
      console.log(error);
      notify.gagal("err");
    }
  };

  const handleClick = () => {
    setClick((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <div
        className={`flex backdrop-blur-md ${
          ubah ? " bg-slate-800" : "bg-white"
        } justify-evenly md:justify-between p-5 shadow-lg h-20 items-center`}
      >
        <div className="cursor-pointer flex gap-10">
          <Link
            href={`/`}
            className={`pointer text-lg font-serif font-bold ${
              ubah ? "text-white" : "text-black"
            }`}
          >
            JOBS@SEA
          </Link>

          <Link
            href={"/"}
            className={`hidden md:flex items-center font-light ${
              ubah ? "text-white" : "text-black"
            }`}
          >
            Find jobs
          </Link>
        </div>
        <div className="flex justify-between gap-5 align-middle items-center">
          <Switchbg className=" hidden md:flex" />
          {login && (
            <Link
              href={"/myaccount"}
              className={`hidden md:flex items-center font-light ${
                ubah ? "text-white" : "text-black"
              }`}
            >
              My Account
            </Link>
          )}

          {!login && (
            <Link
              href={"/login"}
              className={`hidden md:flex items-center font-light ${
                ubah ? "text-white" : "text-black"
              }`}
            >
              Login/Register
            </Link>
          )}

          {login && (
            <h1
              className={`hidden md:flex items-center font-light ${
                ubah ? "text-white" : "text-black cursor-pointer"
              }`}
              onClick={handleLogout}
            >
              Logout
            </h1>
          )}

          {login && (
            <Link
              className={`hidden md:flex items-center font-light ${
                ubah ? "text-white" : "text-black"
              }`}
              href={
                cookies.data.type === "seaman"
                  ? "/register/company"
                  : "/postjobs"
              }
            >
              POST jobs
            </Link>
          )}

          <div className="md:hidden cursor-pointer" onClick={handleClick}>
            {click ? <MenuOpenIcon /> : <MenuIcon />}
            {click && (
              <Drawer
                anchor={"right"}
                open={click}
                onClose={() => {
                  handleClick, "backdropClick";
                }}
                transitionDuration={1000}
              >
                <div className=" bg-slate-500 w-60  h-screen p-5">
                  <Link href={"/"} className=" font-bold text-center">
                    JOBS@SEA
                  </Link>
                  <div className="grid gap-10 mt-20 ">
                    <Link href={"/"} className=" hover:text-white">
                      Search Jobs
                    </Link>
                    {login && (
                      <Link href={"/postjobs"} className=" hover:text-white">
                        Post jobs
                      </Link>
                    )}
                    {login && (
                      <Link href={"/myaccount"} className=" hover:text-white">
                        My Account
                      </Link>
                    )}
                    <div className="flex gap-10">
                      <Link href={"/login"} className=" hover:text-white">
                        LOGIN
                      </Link>
                      <Link
                        href={"/register/seaman"}
                        className=" hover:text-white"
                      >
                        REGISTER
                      </Link>
                    </div>
                  </div>
                </div>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
