import clsx from "clsx"
import React from "react"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "responsive"
export interface AvatarProps {
  name: string
  color?: string
  imageUrl?: string
  size?: AvatarSize
  className?: string
}

const getInitials = (name: string) =>
  `${name ?? ""}`
    .split(" ")
    .reduce((a, b) => a + b.charAt(0), "")
    .substring(0, 2)

const AVATAR_STYLES =
  "flex rounded-full hover:shadow-md transition-shadow duration-500 ease-out"
const RESPONSIVE_STYLES =
  "h-6 w-6 text-xs md:h-8 md:w-8 md:text-sm lg:h-10 lg:w-10 lg:text-md"
const EXTRA_SMALL_STLYES = "h-6 w-6 text-xs"
const SMALL_STLYES = "h-8 w-8 text-sm"
const MEDIUM_STYLES = "h-10 w-10 text-md"
const LARGE_STYLES = "h-12 w-12 text-lg"

const styleForSize = (size: AvatarSize) => {
  switch (size) {
    case "lg":
      return LARGE_STYLES
    case "md":
      return MEDIUM_STYLES
    case "sm":
      return SMALL_STLYES
    case "xs":
      return EXTRA_SMALL_STLYES
    case "responsive":
      return RESPONSIVE_STYLES
  }
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  color,
  size = "md",
  imageUrl,
  className,
}) => (
  <div
    className={clsx(AVATAR_STYLES, className, styleForSize(size))}
    style={{ background: color ?? "" }}
  >
    {imageUrl ? (
      <span
        className="w-full h-full flex rounded-full bg-center bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    ) : (
      <span className="flex m-auto font-body font-semibold text-white">
        {getInitials(name)}
      </span>
    )}
  </div>
)
