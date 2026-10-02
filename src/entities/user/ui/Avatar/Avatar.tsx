import Image from "next/image";
import { ComponentPropsWithRef } from "react";
import getInitials from "./getInitaials";

interface AvatarProps extends ComponentPropsWithRef<"div"> {
  src?: string;
  name: string;
  className: string;
  userColor?: string;
}

export function Avatar({ src, name, className, ...restProps }: AvatarProps) {
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
        <span role="img" aria-label={"picute" + name} className="font-sm">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
