"use client";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
export default function Switchbg(props) {
  let { ubah, setUbah } = useContext(ThemeContext);

  let handleChange = () => {
    setUbah((prev) => !prev);
    localStorage.setItem("darkMode", JSON.stringify(ubah));
  };

  return (
    <>
      <div className=" flex justify-center items-center mr-5">
        {ubah ? (
          <WbSunnyIcon className={props.className} color="primary" />
        ) : (
          <NightsStayIcon className={props.className} />
        )}
        <FormControlLabel
          control={
            <Switch
              onClick={handleChange}
              className={props.className}
              defaultChecked={false}
            />
          }
          labelPlacement="start"
        />
      </div>
    </>
  );
}
