import { type SVGProps } from "react";
interface SettingsIconProps extends SVGProps<SVGSVGElement> {}

const SettingsIcon = ({ className = "" }: SettingsIconProps) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 30.3667V49.6C10 56.6667 10 56.6667 16.6667 61.1667L35 71.7667C37.7667 73.3667 42.2667 73.3667 45 71.7667L63.3333 61.1667C70 56.6667 70 56.6667 70 49.6333V30.3667C70 23.3333 70 23.3333 63.3333 18.8333L45 8.23333C42.2667 6.63333 37.7667 6.63333 35 8.23333L16.6667 18.8333C10 23.3333 10 23.3333 10 30.3667Z"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      opacity="0.34"
      d="M40 50C45.5228 50 50 45.5228 50 40C50 34.4772 45.5228 30 40 30C34.4772 30 30 34.4772 30 40C30 45.5228 34.4772 50 40 50Z"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default SettingsIcon;
