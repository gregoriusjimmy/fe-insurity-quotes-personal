import { type SVGProps } from "react";

const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 0.5L6.26625 1.73375L11.1487 6.625H0.5V8.375H11.1487L6.26625 13.2663L7.5 14.5L14.5 7.5L7.5 0.5Z"
      fill="currentColor"
    />
  </svg>
);
export default ArrowRight;
