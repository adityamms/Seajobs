"use client";
import React, { useEffect, useRef, useState } from "react";
import Wrapperdiv from "@/components/wrapperdiv";
import Cookies from "js-cookie";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";
import Toaster, { notify } from "@/components/toaster";

export default function Myaccountcard() {
  const cookieuserValue = Cookies.get("user");
  const data = cookieuserValue && JSON.parse(cookieuserValue);

  let [namainput, setNamainput] = useState({
    email: data && data.data.email,
    password: data && data.data.password,
  });

  let masuk = (e) => {
    let { value, name, files, result } = e.target;
    value &&
      setNamainput((prev) => {
        return { ...prev, [name]: files[0] };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.patch(
        "http://localhost:3000/api/company_acc",
        namainput
      );
      notify.sukses("berhasil upload");
    } catch (error) {
      notify.gagal("error");
    }
  };

  return (
    <Wrapperdiv>
      <div>
        <div className="grid align-middle p-5 reverse gap-5  bg-slate-600 h-40">
          <Toaster />
          <img
            className="border-2 border-black rounded-full  w-20 h-20 mt-24 md:mt-20 md:ml-40 md:w-28 md:h-28 "
            src={data && data.data.img}
          />
          <div className="gap-2 grid md:ml-36 ">
            <h1 className="self-center text-xl">
              {data && data.data.name + " " + data && data.data.last_name}
            </h1>
            <p className="self-center">{data && data.data.job_position}</p>
            <div>
              <PublicIcon />
              {data && data.data.country && data.data.country.label}
            </div>
            <div>
              <MailIcon /> {data && data.data.email}
            </div>
            <p>
              <PhoneIcon /> {data && data.data.phone_number}
            </p>
          </div>
        </div>

        <div className="p-5 md:mt-80 mb-20 mt-52">
          <div className=" justify-center flex">
            {namainput.display_item && (
              <iframe
                className=" md:w-96 md:h-96 w-80 h-80 border-2 "
                src={namainput && namainput.display_item}
              ></iframe>
            )}
          </div>

          <form className="grid gap-10 justify-center" onSubmit={handleSubmit}>
            <div className="flex">
              <div className="grid">
                <label>Upload Image</label>
                <input
                  type="file"
                  accept=".jpg,png"
                  onChange={masuk}
                  name="image"
                ></input>
              </div>
              <div className="grid">
                <label>Upload CV</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={masuk}
                  placeholder="haloooooo"
                  name="upload_CV"
                />
              </div>
            </div>
            <button className="border-2 border-black hover:border-blue-500">
              save data
            </button>
          </form>
        </div>
      </div>
    </Wrapperdiv>
  );
}
