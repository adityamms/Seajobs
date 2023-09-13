"use client";
import axios from "axios";
import React, { useState } from "react";
import Toaster, { notify } from "./toaster";
import Cookies from "js-cookie";

const style = {
  input: "border border-black rounded-md h-10 pl-3 focus:border-blue-500",
  div: "grid gap-3",
};

let user = Cookies.get("user");
let convert = user && JSON.parse(user);
let type = convert && convert.data.type;
let email = convert && convert.data.email;

export default function Postjobs() {
  let [form, setForm] = useState({ email: email });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type) {
        return notify.gagal("cant post as seaman");
      }
      const res = await axios.patch(
        "http://localhost:3000/api/company_acc",
        form
      );
      notify.sukses("berhasil post");
    } catch (error) {
      notify.gagal("gagal post");
      console.log(error);
    }
  };

  const checkTyping = (e) => {
    let { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const ubahCheck = (e) => {
    let { name, checked } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: checked,
      };
    });
  };

  return (
    <div className="p-2">
      <h1 className=" text-center text-6xl mt-10">Create your job POST</h1>
      <Toaster />
      <div className="grid mt-20">
        <div className="mb-20">
          <form onSubmit={handleSubmit}>
            <div className="grid justify-center gap-10">
              <div className={style.div}>
                <label>Title :</label>
                <input
                  placeholder="give your job posting a name"
                  className={style.input}
                  name="job_post_title"
                  onChange={checkTyping}
                ></input>
              </div>

              <div className="flex gap-10">
                <div className={style.div}>
                  <label>Number of vacancy :</label>
                  <input
                    placeholder="put some number"
                    className={style.input}
                    name="number_of_vacancy"
                    onChange={checkTyping}
                    type="number"
                  ></input>
                </div>

                <div className={style.div}>
                  <label>commitment type :</label>
                  <select
                    className={style.input}
                    onChange={checkTyping}
                    name="commitment_type"
                  >
                    <option value="Contract">Contract</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="apprentice">apprentice</option>
                  </select>
                </div>
              </div>

              <div className={style.div}>
                <label>Salary :</label>
                <input
                  placeholder="your job location"
                  className={style.input}
                  name="salary"
                  onChange={checkTyping}
                ></input>
              </div>

              <div className={style.div}>
                <label>Location :</label>
                <input
                  placeholder="your job location"
                  className={style.input}
                  name="location"
                  onChange={checkTyping}
                ></input>
              </div>

              <div className=" grid grid-cols-2 gap-3">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="remote_job"
                    onChange={ubahCheck}
                  ></input>
                  <p>job can do remotely</p>
                </div>

                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="forreignn_applicant"
                    onChange={ubahCheck}
                  ></input>
                  <p>open to forreign applicants</p>
                </div>

                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="visa"
                    onChange={ubahCheck}
                  ></input>
                  <p>require visa</p>
                </div>

                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="visa_sponsorship"
                    onChange={ubahCheck}
                  ></input>
                  <p>visa sponsorship</p>
                </div>
              </div>

              <div className={style.div}>
                <label>Job bennefit :</label>
                <textarea
                  rows="6"
                  cols="50"
                  className="border border-black pl-5"
                  maxLength={500}
                  placeholder="description , bennefit about the job"
                  name="job_description"
                  onChange={checkTyping}
                ></textarea>
              </div>
            </div>
            <div className=" justify-center flex">
              <button className=" border-blue-500 border w-60 h-16 top-40 left-10 rounded-full lg:fixed mt-20">
                publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
