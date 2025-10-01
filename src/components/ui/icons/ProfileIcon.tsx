import { type SVGProps } from "react";
interface ProfileIconProps extends SVGProps<SVGSVGElement> {}

const ProfileIcon = ({ className = "" }: ProfileIconProps) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.5333 36.2334C30.2 36.2 29.8 36.2 29.4333 36.2334C21.5 35.9667 15.2 29.4667 15.2 21.4667C15.2 13.3 21.8 6.66669 30 6.66669C38.1666 6.66669 44.7999 13.3 44.7999 21.4667C44.7666 29.4667 38.4666 35.9667 30.5333 36.2334Z"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      opacity="0.4"
      d="M54.7001 13.3333C61.1667 13.3333 66.3667 18.5666 66.3667 25C66.3667 31.3 61.3667 36.4333 55.1334 36.6666C54.8667 36.6333 54.5667 36.6333 54.2667 36.6666"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.8667 48.5333C5.79998 53.9333 5.79998 62.7333 13.8667 68.1C23.0333 74.2333 38.0667 74.2333 47.2333 68.1C55.3 62.7 55.3 53.9 47.2333 48.5333C38.1 42.4333 23.0667 42.4333 13.8667 48.5333Z"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      opacity="0.4"
      d="M61.1333 66.6667C63.5333 66.1667 65.8 65.2 67.6666 63.7667C72.8666 59.8667 72.8666 53.4334 67.6666 49.5334C65.8333 48.1334 63.6 47.2 61.2333 46.6667"
      stroke="#373B47"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ProfileIcon;
