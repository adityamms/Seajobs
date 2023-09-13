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
import axios from "axios";
import Toaster, { notify } from "./toaster";
import { useRouter } from "next/navigation";

const borderI = {
  style: "border border-black pl-5 rounded h-8",
};

export default function RegisterCard() {
  const [form, setForm] = useState({
    account_type: "Company",
  });
  const [visibility, setVisibility] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your data posting logic here, e.g., an API request
      let coba = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hello`,
        form
      );
      notify.sukses("berhasil register");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      // Redirect the user to a different page on success
    } catch (error) {
      notify.gagal("gagal register ");
      console.error("Data posting error:", error);
    }
    setTimeout(() => {
      return router.push("/");
    }, 2000);
  };

  const changeVisibility = () => {
    setVisibility((prev) => !prev);
  };

  let phoneHandler = (value) => {
    setForm((prev) => {
      return {
        ...prev,
        phone_number: value,
      };
    });
  };

  const saveToState = (e) => {
    let { value, name } = e.target;
    setForm(() => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const changeHandler = (value) => {
    setForm((prev) => {
      return {
        ...prev,
        company_country: value,
      };
    });
  };
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="grid border border-black gap-5 p-5 w-">
      <Toaster />
      <h1>Account creation</h1>
      <div className="flex gap-10 h-">
        <Link href={"/register/seaman"}>Register as Seaman</Link>
        <Link
          href={"/register/company"}
          className=" border-b-2 border-lime-600"
        >
          register as Company
        </Link>
      </div>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label>Company name :</label>
          <input
            placeholder="enter the name of your company"
            className={borderI.style}
            onChange={saveToState}
            name="company_name"
            required
          ></input>
        </div>

        <div className="grid gap-2">
          <label>Email : </label>
          <input
            placeholder="Type your email"
            className={borderI.style}
            type="email"
            name="email"
            onChange={saveToState}
            required
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
            name="password"
            type={visibility ? "password" : Text}
            onChange={saveToState}
            required
          ></input>
        </div>

        <div className="grid gap-2 ">
          <label>Phone Number : </label>
          <div className={`${borderI.style}`}>
            <PhoneInput
              placeholder="Enter phone number"
              international={false}
              onChange={phoneHandler}
              defaultCountry="ID"
              countryCallingCodeEditable={false}
              className="pt-1"
              required
              name="phone_number"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label>Website url : </label>
          <input
            placeholder="Enter link to your website"
            className={borderI.style}
            name="company_website"
            onChange={saveToState}
            required
          ></input>
        </div>
        <div className="grid md:flex md:gap-10 gap-2 ">
          <div className="grid w-2/4">
            <p>Select Country</p>
            <Select
              options={options}
              onChange={changeHandler}
              name="company_country"
              value={form.company_country}
            />
          </div>
          <div className="grid">
            <p>City</p>
            <input
              placeholder="Enter your city"
              className={borderI.style}
              onChange={saveToState}
              name="company_city"
              required
            ></input>
          </div>
        </div>
        <div className="grid gap-2">
          <label>Addres : </label>
          <input
            placeholder="Enter your Addres"
            className={borderI.style}
            onChange={saveToState}
            name="company_address"
            required
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
            Register As a Company
          </button>
        </div>
      </form>
    </div>
  );
}
