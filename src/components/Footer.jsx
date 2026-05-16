import React from "react";
import Brand from "../icons/Brand";

const Footer = () => {
  const website = "https://azizdesigns.framer.ai";
  return (
    <div className="w-full max-w-[459px] px-4 py-1 fixed  z-50 bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center bg-sky-card">
      <div className="flex justify-center items-center gap-1">
        <h1 className="font-inter text-xs font-normal text-sky-muted">
          Designed By
        </h1>
        <Brand width={15} height={15} />
        <a
          href={website}
          target="_blank" // ✅ opens in new tab
          rel="noopener noreferrer"
          className="text-sky-muted font-inter text-xs font-normal"
        >
          bdul Aziz
        </a>
      </div>
    </div>
  );
};

export default Footer;
