import React from "react";

const Compliance = ({ ...className }) => {
  return (
    <svg
      {...className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 22H21.5C21.7652 22 22.0196 21.8946 22.2071 21.7071C22.3946 21.5196 22.5 21.2652 22.5 21V3C22.5 2.73478 22.3946 2.48043 22.2071 2.29289C22.0196 2.10536 21.7652 2 21.5 2H3.5C3.23478 2 2.98043 2.10536 2.79289 2.29289C2.60536 2.48043 2.5 2.73478 2.5 3V21C2.5 21.2652 2.60536 21.5196 2.79289 21.7071C2.98043 21.8946 3.23478 22 3.5 22ZM4.5 10H6.5V20H4.5V10ZM20.5 20H8.5V10H20.5V20ZM4.5 4H20.5V8H4.5V4Z"
        fill="#515B6F"
      />
    </svg>
  );
};

export default Compliance;
