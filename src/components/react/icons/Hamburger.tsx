import { type SVGProps } from "react";

const Hamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={13}
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.743896 12.0526V10.0452H18V12.0526H0.743896ZM0.743896 7.50359V5.49624H18V7.50359H0.743896ZM0.743896 2.95462V0.947266H18V2.95462H0.743896Z"
      fill="white"
    />
  </svg>
);
export default Hamburger;
