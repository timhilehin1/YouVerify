import { type SVGProps } from "react";
interface CategoryIconProps extends SVGProps<SVGSVGElement> {}

const CategoryIcon = ({ className = "" }: CategoryIconProps) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.3333 16.6666H31.6666C34.9999 16.6666 36.6666 15 36.6666 11.6666V8.33331C36.6666 4.99998 34.9999 3.33331 31.6666 3.33331H28.3333C24.9999 3.33331 23.3333 4.99998 23.3333 8.33331V11.6666C23.3333 15 24.9999 16.6666 28.3333 16.6666Z"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.33325 36.6666H11.6666C14.9999 36.6666 16.6666 35 16.6666 31.6666V28.3333C16.6666 25 14.9999 23.3333 11.6666 23.3333H8.33325C4.99992 23.3333 3.33325 25 3.33325 28.3333V31.6666C3.33325 35 4.99992 36.6666 8.33325 36.6666Z"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      opacity="0.34"
      d="M9.99992 16.6666C13.6818 16.6666 16.6666 13.6819 16.6666 9.99998C16.6666 6.31808 13.6818 3.33331 9.99992 3.33331C6.31802 3.33331 3.33325 6.31808 3.33325 9.99998C3.33325 13.6819 6.31802 16.6666 9.99992 16.6666Z"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      opacity="0.34"
      d="M29.9999 36.6666C33.6818 36.6666 36.6666 33.6819 36.6666 30C36.6666 26.3181 33.6818 23.3333 29.9999 23.3333C26.318 23.3333 23.3333 26.3181 23.3333 30C23.3333 33.6819 26.318 36.6666 29.9999 36.6666Z"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default CategoryIcon;
