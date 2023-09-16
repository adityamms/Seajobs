import React from "react";
import Link from "next/link";
import { Pagination } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

const foot = ["about", "company", "developer"];

const handleChange = async (e, value) => {
  const { data, setData } = useContext(UserContext);
  try {
    let page = value;
    let job_post_title = data.job_post_title;
    let location = data.location;
    setData((prev) => {
      return { ...prev, page: page };
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NETLIFY_URI}/api/find`,
      {
        page,
        job_post_title,
        location,
      }
    );
    dig(res);
  } catch (error) {
    console.log(error);
  }
};
export default function Footbar() {
  return (
    <div className="grid">
      <div className="bg-slate-800 p-5 flex justify-evenly">
        <div>
          <Link
            href={`/`}
            className="pointer text-lg font-serif font-bold text-white"
          >
            JOBS@SEA
          </Link>
        </div>
        <ul className="flex gap-4 align-middle justify-center items-center">
          {foot.map((item) => {
            return (
              <Link
                href={"https://www.instagram.com/adityamms_"}
                className="text-white "
                key={item}
              >
                {item}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
