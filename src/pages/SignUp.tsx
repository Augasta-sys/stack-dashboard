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

const usernameRegex = /^[A-Za-z]+$/

export default function SignUp() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [terms, setTerms] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [usernameError, setUsernameError] =
    useState("")
  const [passwordError, setPasswordError] =
    useState("")
  const [termsError, setTermsError] =
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

  const validateUsername = (value: string) => {
    if (!value) {
      return "Username is required."
    }

    if (!usernameRegex.test(value)) {
      return "Use letters only."
    }

    return ""
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required."
    }

    if (value.length < 6) {
      return "Minimum 6 characters."
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

  const handleUsernameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value =
      event.target.value.replace(
        /[^A-Za-z]/g,
        "",
      )

    setUsername(value)
    setUsernameError(validateUsername(value))
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
    const usernameValidation =
      validateUsername(username)
    const passwordValidation =
      validatePassword(password)

    const termsValidation = terms
      ? ""
      : "Please accept the terms."

    setEmailError(emailValidation)
    setUsernameError(usernameValidation)
    setPasswordError(passwordValidation)
    setTermsError(termsValidation)

    if (
      emailValidation ||
      usernameValidation ||
      passwordValidation ||
      termsValidation
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
            py-5
            sm:px-9
            sm:py-6
            md:px-12
            md:py-7
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
              Create an Account
            </h1>

            <p
              className="
                mt-2
                text-[11px]
                font-semibold
                text-[#202224]/70
                dark:text-gray-300
                sm:text-[13px]
                md:text-[15px]
              "
            >
              Create a account to continue
            </p>
          </div>

          <div className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
            <InputField
              id="signup-email"
              label="Email address:"
              type="email"
              value={email}
              placeholder="esteban_schiller@gmail.com"
              autoComplete="email"
              error={emailError}
              onChange={handleEmailChange}
            />

            <InputField
              id="signup-username"
              label="Username"
              type="text"
              value={username}
              placeholder="Username"
              autoComplete="username"
              error={usernameError}
              onChange={handleUsernameChange}
            />

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="signup-password"
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
                id="signup-password"
                label=""
                value={password}
                error={passwordError}
                onChange={handlePasswordChange}
              />
            </div>

            <Checkbox
              id="terms"
              checked={terms}
              onChange={(value) => {
                setTerms(value)

                if (value) {
                  setTermsError("")
                }
              }}
              error={termsError}
            >
              I accept terms and conditions
            </Checkbox>

            <div className="pt-1">
              <AuthButton>Sign Up</AuthButton>
            </div>

            <p
              className="
                pt-0.5
                text-center
                text-[11px]
                font-semibold
                text-[#202224]/65
                dark:text-gray-400
                sm:text-[13px]
                md:text-[14px]
              "
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-bold
                  text-[#5A8CFF]
                  underline
                  underline-offset-2
                  hover:text-[#3B6EE8]
                "
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}