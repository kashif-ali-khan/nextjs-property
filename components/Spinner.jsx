"use client";

import { ClipLoader } from "react-spinners";

const Spinner = () => {
  const override = {
    margin: "100px auto",
    display: "block",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
