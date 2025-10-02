import { type SVGProps } from "react";
interface CloseIconProps extends SVGProps<SVGSVGElement> {}

const CloseIcon = ({ className = "" }: CloseIconProps) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M12.9289 12.929L27.0711 27.0711"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.9289 27.0711L27.0711 12.929"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default CloseIcon;
