import { type SVGProps } from "react";

const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.33341 11.8332L0.166748 10.6665L4.83342 5.99984L0.166748 1.33317L1.33341 0.166504L6.00008 4.83317L10.6667 0.166504L11.8334 1.33317L7.16675 5.99984L11.8334 10.6665L10.6667 11.8332L6.00008 7.1665L1.33341 11.8332Z"
      fill="white"
    />
  </svg>
);
export default Close;
