"use client";

import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Toaster, { notify } from "./toaster";
import axios from "axios";
import { useRouter } from "next/navigation";

const borderI = {
  style: "border border-black pl-5 rounded h-8",
};

export default function RegisterSeamanCard() {
  const [form, setForm] = useState({ type: "seaman" });

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Your data posting logic here, e.g., an API request
      let coba = await axios.post("http://localhost:3000/api/hello", form);
      notify.sukses("berhasil register");
    } catch (error) {
      notify.gagal("gagal register");
      console.error("Data posting error:", error);
    }
    setTimeout(() => {
      return router.push("/");
    }, 2000);
  };

  const [visibility, setVisibility] = useState(true);

  const changeVisibility = () => {
    setVisibility((prev) => !prev);
  };

  const options = useMemo(() => countryList().getData(), []);

  const saveToState = (e) => {
    let { value, name } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const phoneHandle = (value) => {
    setForm((prev) => {
      return {
        ...prev,
        phone_number: value,
      };
    });
  };

  const changeHandler = (value) => {
    setForm((prev) => {
      return {
        ...prev,
        country: value,
      };
    });
  };

  return (
    <div className="grid border border-black gap-5 p-5 w-">
      <Toaster />
      <h1>Account creation</h1>
      <div className="flex gap-10 h-">
        <Link href={"/register/seaman"} className=" border-b-2 border-lime-600">
          Register as Seaman
        </Link>
        <Link href={"/register/company"}>Register as Company</Link>
      </div>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label> Name :</label>
          <input
            placeholder="enter your Name"
            className={borderI.style}
            name="name"
            onChange={saveToState}
          ></input>
        </div>

        <div className="grid gap-2">
          <label> Last name :</label>
          <input
            placeholder="enter your Name"
            className={borderI.style}
            name="last_name"
            onChange={saveToState}
          ></input>
        </div>
        <div className="grid gap-2">
          <label>Job Position :</label>
          <input
            placeholder="enter your Last Job position"
            className={borderI.style}
            name="job_position"
            onChange={saveToState}
          />
        </div>

        <div className="grid gap-2">
          <label>Email : </label>
          <input
            placeholder="Type your email"
            className={borderI.style}
            type="email"
            name="email"
            onChange={saveToState}
          ></input>
        </div>

        <div className="grid gap-2">
          <div className="flex gap-5">
            <label>Password : </label>
            {visibility ? (
              <div onClick={changeVisibility}>
                <VisibilityOffIcon className=" cursor-pointer" />
              </div>
            ) : (
              <div onClick={changeVisibility}>
                <VisibilityIcon className=" cursor-pointer" />
              </div>
            )}
          </div>
          <input
            placeholder="Enter password"
            className={borderI.style}
            type={visibility ? "password" : "text"}
            name="password"
            onChange={saveToState}
          ></input>
        </div>

        <div className="grid gap-2 ">
          <label>Phone Number : </label>
          <div className={`${borderI.style}`}>
            <PhoneInput
              placeholder="Enter phone number"
              international={false}
              onChange={phoneHandle}
              defaultCountry="ID"
              countryCallingCodeEditable={false}
              className="pt-1"
              name="phone_number"
            />
          </div>
        </div>

        <div className="grid md:flex md:gap-10 gap-2 ">
          <div className="grid w-2/4">
            <p>Select Country</p>
            <Select options={options} onChange={changeHandler} name="country" />
          </div>
          <div className="grid">
            <p>City</p>
            <input
              placeholder="Enter your city"
              className={borderI.style}
              name="city"
              onChange={saveToState}
            ></input>
          </div>
        </div>
        <div className="grid gap-2">
          <label>Addres : </label>
          <input
            placeholder="Enter your Addres"
            className={borderI.style}
            name="addres"
            onChange={saveToState}
          ></input>
        </div>
        <h2>
          Already have an account?{" "}
          <Link href={"/login"} className=" text-orange-400">
            LOGIN
          </Link>
        </h2>
        <div className="align-middle justify-center flex ">
          <button className=" bg-cyan-700 text-white border border-black rounded-full mt-10 h-10 md:w-2/4 w-full">
            Register As a Seaman
          </button>
        </div>
      </form>
    </div>
  );
}
