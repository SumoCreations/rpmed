import * as React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import FieldContainer from './FieldContainer'

const Captcha: React.FC<{
  test?: boolean
  onChange: (token: string | null) => void
}> = ({ onChange }) => (
  <FieldContainer as="div">
    <ReCAPTCHA
      sitekey={
        process.env.REACT_APP_RECAPTCHA_KEY ||
        '6LfpWKIUAAAAAP79GcsYo-2ge-xWKICgTZvU5XW8'
      }
      onChange={onChange}
    />
  </FieldContainer>
)

export default Captcha
