import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons/faSpinnerThird"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"

export interface SpinnerProps {
  /**
   * The size of the spinner. Defaults to 1x
   */
  size?: SizeProp
  /**
   * Any additional CSS classes to apply to the containing element.
   */
  className?: string
}

const SPINNER_CLASS = "flex flex-grow-0 flex-shrink"

export const Spinner: React.FC<SpinnerProps> = ({ className, size = "1x" }) => (
  <p className={[className ?? "", SPINNER_CLASS].join(" ")}>
    <span className="animate-spin">
      <FontAwesomeIcon icon={faSpinnerThird} size={size} />
    </span>
  </p>
)
