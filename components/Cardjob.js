"use client";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { UserContext } from "./UserProvider";
import { Pagination } from "@mui/material";
import axios from "axios";

export default function Cardjob(props) {
  let { ubah, setUbah } = useContext(ThemeContext);
  let { data, setData } = useContext(UserContext);

  const dig = (res) => {
    let akhir = [];
    res &&
      res.data.forEach((element) => {
        element.lowongan.forEach((item) => {
          akhir.reverse().push(item);
          setData((prev) => {
            return { ...prev, akhir };
          });
        });
      });
  };

  let colorText = {
    color: "",
  };

  useEffect(() => {
    let fetch = async () => {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
      if (res.status === 200) {
        dig(res);
      } else console.log("error fetching");
    };
    fetch();
  }, []);

  const handleChange = async (e, value) => {
    try {
      let page = value;
      let job_post_title = data.job_post_title;
      let location = data.location;
      setData((prev) => {
        return { ...prev, page: page };
      });
      const res = await axios.post("http://localhost:3000/api/find", {
        page,
        job_post_title,
        location,
      });
      dig(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 p-5 justify-center items-center">
        {data.akhir.map((item) => {
          return (
            <>
              <div className="p-5">
                <div
                  className={`grid border-2 w-80 mt-10 mb-10 rounded-2xl p-5 shadow-md border-green-950 cursor-point bg-white`}
                >
                  <h2>SALT</h2>
                  <h1 className=" font-medium">{item.job_post_title}</h1>
                  <h3 className="mt-2">{item.location}</h3>
                  <div className="flex gap-5">
                    <div className=" bg-slate-200 mt-2 mb-2 rounded-md text-sm p-1">
                      {item.salary} a month
                    </div>
                    <div className=" bg-slate-200 mt-2 mb-2 rounded-md text-sm p-1">
                      Type : {item.commitment_type}
                    </div>
                  </div>
                  <div className="grid mb-2">
                    {item.visa_sponsorship && (
                      <p className="text-amber-700">visa sponsorship</p>
                    )}

                    {item.forreignn_applicant && (
                      <p className=" text-amber-700">
                        forreignn applicant can apply
                      </p>
                    )}

                    {item.remote_job && (
                      <p className="text-amber-700">support remote job</p>
                    )}
                    {item.visa && <p className="text-amber-700">visa needed</p>}
                  </div>
                  <h3 className="mb-2">
                    Description : <br /> {item.job_description}
                  </h3>
                  <p>2 hari yang lalu</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex justify-center mb-20 mt-24">
        <Pagination
          color="primary"
          variant="outlined"
          count={10}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
