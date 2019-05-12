import { RGA } from "../../../../models"
import { IRGAQueryOutput } from "./rgaQueryTypes"

export const rgas = async (): Promise<IRGAQueryOutput> => {
  try {
    const results = await RGA.all()
    return {
      rgas: results.map(RGA.output).map(o => ({
        ...o
      })),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not find any RGAs" }],
      success: false
    }
  }
}
