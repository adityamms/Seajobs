"use client";
import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import UserProvider from "./UserProvider";
import { UserContext } from "./UserProvider";
import AnchorIcon from "@mui/icons-material/Anchor";
import Link from "next/link";
import axios from "axios";
import Toaster, { notify } from "./toaster";
import { useRouter } from "next/navigation";

const style = {
  div: "md:w-1/2 h-screen",
  input_border: "border border-black h-10 rounded p-5 focus:border-blue-500",
};
export default function loginForm() {
  const [data, setData] = useState();
  let router = useRouter();

  const global = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios
        .post("http://localhost:3000/api/" + data.login_as, data)
        .then(async (res) => {
          let datanya = JSON.stringify(res.data);
          Cookies.set("user", datanya, { expires: 7 });
        });
      let { login_as } = data;
      Cookies.set("login_as", login_as);
      notify.sukses("berhasil login");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      return notify.gagal("email/password salah");
    }
  };

  const checkTyping = (e) => {
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const radioHandle = (e) => {
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="md:flex grid mb-40">
      <Toaster />
      <div className={`${style.div} text-center justify-center`}>
        <h1 className=" text-7xl md:text-9xl mt-60 flex-wrap text-center">
          Welcome Back
        </h1>
        <AnchorIcon sx={{ fontSize: 380 }} className=" md:hidden" />
      </div>
      <div className={`${style.div}`}>
        <div className=" grid  gap-20">
          <h2 className=" text-5xl text-center mt-10">USER LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-10">
              <div className=" gap-10 flex justify-center">
                <div className="grid">
                  <p>login as seaman</p>
                  <input
                    type="radio"
                    name="login_as"
                    value={"seaman"}
                    onChange={radioHandle}
                    required
                  ></input>
                </div>
                <div className="grid">
                  <p>login as company</p>
                  <input
                    type="radio"
                    name="login_as"
                    value={"company"}
                    onChange={radioHandle}
                    required
                  ></input>
                </div>
              </div>
              <div className="grid pl-10 pr-10 gap-3">
                <label>username :</label>
                <input
                  placeholder="type your user email"
                  className={style.input_border}
                  name="user_email"
                  type="email"
                  onChange={checkTyping}
                />
              </div>

              <div className="grid pl-10 pr-10 gap-3">
                <label>password :</label>
                <input
                  placeholder="type your password"
                  className={style.input_border}
                  type="password"
                  name="user_password"
                  onChange={checkTyping}
                />
              </div>
            </div>
            <div className="flex justify-end pr-10 mt-5 mb-5 gap-5">
              <Link href={"/register/seaman"} className=" hover:text-blue-500">
                Create new account
              </Link>
              <Link href={"/forgotpassword"} className=" hover:text-blue-500">
                forgot password?
              </Link>
            </div>
            <div className=" justify-center flex">
              <button className=" border border-black w-2/3 rounded-full h-14 hover:border-blue-500">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
