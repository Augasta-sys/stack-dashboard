import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthButton from "../components/auth/AuthButton"
import AuthCard from "../components/auth/AuthCard"
import Checkbox from "../components/auth/Checkbox"
import InputField from "../components/auth/InputField"
import PasswordField from "../components/auth/PasswordField"
import AuthLayout from "../components/layout/AuthLayout"

const emailRegex =
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] =
    useState("")

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email address is required."
    }

    if (!emailRegex.test(value)) {
      return "Enter a valid lowercase email."
    }

    return ""
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required."
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters."
    }

    return ""
  }

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value =
      event.target.value.toLowerCase()

    setEmail(value)
    setEmailError(validateEmail(value))
  }

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value

    setPassword(value)
    setPasswordError(validatePassword(value))
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const emailValidation = validateEmail(email)
    const passwordValidation =
      validatePassword(password)

    setEmailError(emailValidation)
    setPasswordError(passwordValidation)

    if (
      emailValidation ||
      passwordValidation
    ) {
      return
    }

    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <AuthCard>
        <form
          onSubmit={handleSubmit}
          className="
            px-5
            py-6
            sm:px-9
            sm:py-8
            md:px-12
            md:py-9
          "
        >
          <div className="text-center">
            <h1
              className="
                text-[20px]
                font-bold
                leading-none
                text-[#202224]
                dark:text-white
                sm:text-[24px]
                md:text-[28px]
              "
            >
              Login to Account
            </h1>

            <p
              className="
                mt-2.5
                text-[11px]
                font-semibold
                leading-tight
                text-[#202224]/70
                dark:text-gray-300
                sm:text-[13px]
                md:text-[15px]
              "
            >
              Please enter your email and password to
              continue
            </p>
          </div>

          <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-4">
            <InputField
              id="login-email"
              label="Email address:"
              type="email"
              value={email}
              placeholder="esteban_schiller@gmail.com"
              autoComplete="email"
              error={emailError}
              onChange={handleEmailChange}
            />

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="login-password"
                  className="
                    text-[12px]
                    font-semibold
                    text-[#202224]
                    dark:text-white
                    sm:text-[13px]
                    md:text-[15px]
                  "
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-[11px]
                    font-semibold
                    text-[#707070]
                    hover:text-[#4880FF]
                    dark:text-gray-300
                    sm:text-[13px]
                    md:text-[14px]
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              <PasswordField
                id="login-password"
                label=""
                value={password}
                error={passwordError}
                onChange={handlePasswordChange}
              />
            </div>

            <Checkbox
              id="remember-password"
              checked={remember}
              onChange={setRemember}
            >
              Remember Password
            </Checkbox>

            <div className="pt-1">
              <AuthButton>Sign In</AuthButton>
            </div>

            <p
              className="
                pt-1
                text-center
                text-[11px]
                font-semibold
                text-[#202224]/65
                dark:text-gray-400
                sm:text-[13px]
                md:text-[14px]
              "
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="
                  font-bold
                  text-[#5A8CFF]
                  underline
                  underline-offset-2
                  hover:text-[#3B6EE8]
                "
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}