import React from "react";
import Link from "next/link";

const Logo = ({ width = "140px" }: { width?: string }) => {
  return (
    <Link href="/" className="inline-block" style={{ width }}>
      <svg
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ width, height: "auto" }}
      >
        <rect x="0.5" width="32" height="32" rx="16" fill="#E8B65D" fillOpacity="0.1" />
        <path
          d="M16.5 6.25C14.5716 6.25 12.6866 6.82183 11.0832 7.89317C9.47982 8.96451 8.23013 10.4873 7.49218 12.2688C6.75422 14.0504 6.56114 16.0108 6.93735 17.9021C7.31355 19.7934 8.24215 21.5307 9.60571 22.8943C10.9693 24.2579 12.7066 25.1865 14.5979 25.5627C16.4892 25.9389 18.4496 25.7458 20.2312 25.0078C22.0127 24.2699 23.5355 23.0202 24.6068 21.4168C25.6782 19.8134 26.25 17.9284 26.25 16C26.2473 13.415 25.2192 10.9366 23.3913 9.10872C21.5634 7.28084 19.085 6.25273 16.5 6.25Z"
          fill="#4CAF50"
        />
        <circle cx="16.125" cy="11.875" r="2.125" fill="#FFA500" />
        <path
          d="M17.25 21.25C17.25 20.1478 17.092 19.0763 16.8107 18.0362C16.5294 16.9961 16.1478 16.0326 15.75 15.1458"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15.75 21.25C16.1478 21.25 16.5294 21.092 16.8107 20.8107C17.092 20.5294 17.25 20.1478 17.25 19.75V16"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
};

export default Logo;
