import type { SVGProps } from "react";

const User = ({ id, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={24}
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 11.9999C13.1562 11.9999 15.7143 9.44182 15.7143 6.28557C15.7143 3.12932 13.1562 0.571289 10 0.571289C6.84375 0.571289 4.28571 3.12932 4.28571 6.28557C4.28571 9.44182 6.84375 11.9999 10 11.9999ZM14 13.4284H13.2545C12.2634 13.8838 11.1607 14.1427 10 14.1427C8.83929 14.1427 7.74107 13.8838 6.74554 13.4284H6C2.6875 13.4284 0 16.1159 0 19.4284V21.2856C0 22.4686 0.959821 23.4284 2.14286 23.4284H17.8571C19.0402 23.4284 20 22.4686 20 21.2856V19.4284C20 16.1159 17.3125 13.4284 14 13.4284Z"
      fill={id ? `url(#${id})` : "url(#paint0_radial_934_3958)"}
    />
    <defs>
      <radialGradient
        id={id ? id : "paint0_radial_934_3958"}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.5567 -13.5239) rotate(102.071) scale(27.8539 37.8596)"
      >
        <stop stopColor="#22C6C6" />
        <stop offset={1} stopColor="#353572" />
      </radialGradient>
    </defs>
  </svg>
);

export default User;
