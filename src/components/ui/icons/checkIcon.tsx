import { type SVGProps } from "react";
interface CheckIconProps extends SVGProps<SVGSVGElement> {}

const CheckIcon = ({ className = "" }: CheckIconProps) => (
  <svg
    className={className}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.75 3.99998L3.58 6.82998L9.25 1.16998"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default CheckIcon;
