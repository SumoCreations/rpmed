import * as React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import FieldContainer from './FieldContainer'

const Captcha: React.FC<{
  test?: boolean
  onChange: (token: string | null) => void
}> = ({ onChange, test }) => (
  <FieldContainer>
    <ReCAPTCHA
      sitekey={
        test
          ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
          : '6Ld8_oYUAAAAAJ9hZI6XcaD8_41E7yqHLW5MpREY'
      }
      onChange={onChange}
    />
  </FieldContainer>
)

export default Captcha
