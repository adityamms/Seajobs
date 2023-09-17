"use client";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "./ThemeProvider";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function pencarian(props) {
  const { ubah, setUbah } = useContext(ThemeContext);
  const { data, setData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let ress = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_NETLIFY_URI
        }/api/find`,
        {
          job_post_title: data.job_post_title,
          location: data.location,
        }
      );
      let akhir = [];
      let coba =
        ress &&
        ress.data.forEach((element) => {
          element.lowongan.forEach((item) => {
            akhir.push(item);
            setData((prev) => {
              return { ...prev, akhir: akhir };
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid justify-center relative pt-10 mb-10 md:flex gap-5 ">
          <div className="flex border border-blue-400 rounded-lg h-10 items-center p-5 bg-white">
            <SearchIcon />
            <input
              placeholder="job title,key words or company"
              className="rounded-full pl-5 w-72"
              onChange={handleInput}
              name="job_post_title"
            ></input>
          </div>

          <div className="flex border border-blue-400 rounded-lg h-10 items-center p-5 bg-white">
            <LocationOnIcon />
            <input
              placeholder="City,province,or region"
              className="rounded-full pl-5 w-72"
              onChange={handleInput}
              name="location"
            ></input>
          </div>
          <button className=" bg-blue-500 text-white font-bold rounded-lg p-2 border border-black">
            find jobs
          </button>
        </div>
      </form>
    </>
  );
}
