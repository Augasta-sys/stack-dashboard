import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthButton from "../components/auth/AuthButton"
import AuthCard from "../components/auth/AuthCard"
import InputField from "../components/auth/InputField"
import AuthLayout from "../components/layout/AuthLayout"

const emailRegex =
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email address is required."
    }

    if (!emailRegex.test(value)) {
      return "Enter a valid lowercase email."
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

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const validation = validateEmail(email)

    setEmailError(validation)

    if (validation) {
      return
    }

    navigate("/reset-password", {
      state: { email },
    })
  }

  return (
    <AuthLayout>
      <AuthCard>
        <form
          onSubmit={handleSubmit}
          className="
            px-5
            py-7
            sm:px-9
            sm:py-8
            md:px-12
            md:py-10
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
              Forgot Password?
            </h1>

            <p
              className="
                mx-auto
                mt-2.5
                max-w-[400px]
                text-[11px]
                font-semibold
                leading-tight
                text-[#202224]/70
                dark:text-gray-300
                sm:text-[13px]
                md:text-[15px]
              "
            >
              Please enter your email address to reset your
              password
            </p>
          </div>

          <div className="mt-7 space-y-5 sm:mt-8">
            <InputField
              id="forgot-email"
              label="Email address:"
              type="email"
              value={email}
              placeholder="esteban_schiller@gmail.com"
              autoComplete="email"
              error={emailError}
              onChange={handleEmailChange}
            />

            <div className="pt-1">
              <AuthButton>
                Send Reset Link
              </AuthButton>
            </div>

            <p
              className="
                text-center
                text-[11px]
                font-semibold
                text-[#202224]/65
                dark:text-gray-400
                sm:text-[13px]
                md:text-[14px]
              "
            >
              Remember your password?{" "}
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