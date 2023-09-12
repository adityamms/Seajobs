import React from "react";

export default function page({ params }) {
  const user = params.userID;
  return <div>user : {user}</div>;
}
