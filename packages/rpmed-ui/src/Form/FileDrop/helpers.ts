import { v4 } from "uuid"

export const uniqueFileName = (name: string, uniqueId?: string) => {
  const chunks = name.replace(/[\W_]+/g, " ").split(" ")
  const extension = (chunks || []).pop()
  return (uniqueId
    ? `${uniqueId}-${v4()}.${extension}`
    : `${chunks.join("-")}-${v4()}.${extension}`
  ).toLowerCase()
}
