import Image from "next/image";
import { ComponentPropsWithRef } from "react";

interface AvatarProps extends ComponentPropsWithRef<"div"> {
  src?: string;
  name: string;
  className: string;
}

function getInitials(str: string): string {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
}

function Avatar({ src, name, className, ...restProps }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...restProps}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      ) : (
        <span role="img" aria-label={"picture " + name} className="font-medium">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

export default Avatar;
