import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom"
import AuthButton from "../components/auth/AuthButton"
import AuthCard from "../components/auth/AuthCard"
import PasswordField from "../components/auth/PasswordField"
import AuthLayout from "../components/layout/AuthLayout"

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email ?? ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [passwordError, setPasswordError] =
    useState("")
  const [confirmError, setConfirmError] =
    useState("")

  const [success, setSuccess] = useState(false)

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required."
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters."
    }

    return ""
  }

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value

    setPassword(value)
    setPasswordError(validatePassword(value))

    if (
      confirmPassword &&
      value !== confirmPassword
    ) {
      setConfirmError("Passwords do not match.")
    } else {
      setConfirmError("")
    }
  }

  const handleConfirmChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value

    setConfirmPassword(value)

    if (!value) {
      setConfirmError(
        "Please confirm your password.",
      )
    } else if (value !== password) {
      setConfirmError(
        "Passwords do not match.",
      )
    } else {
      setConfirmError("")
    }
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const passwordValidation =
      validatePassword(password)

    let confirmValidation = ""

    if (!confirmPassword) {
      confirmValidation =
        "Please confirm your password."
    } else if (
      password !== confirmPassword
    ) {
      confirmValidation =
        "Passwords do not match."
    }

    setPasswordError(passwordValidation)
    setConfirmError(confirmValidation)

    if (
      passwordValidation ||
      confirmValidation
    ) {
      return
    }

    /*
      In a real application this is where the API
      request would update the user's password.
    */

    localStorage.setItem(
      "dashstack-password",
      password,
    )

    setSuccess(true)
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
              Reset Password
            </h1>

            <p
              className="
                mt-2.5
                text-[11px]
                font-semibold
                text-[#202224]/70
                dark:text-gray-300
                sm:text-[13px]
                md:text-[15px]
              "
            >
              Create a new password for your account
            </p>

            {email && (
              <p
                className="
                  mt-1.5
                  truncate
                  text-[10px]
                  text-[#8A8A8A]
                  dark:text-gray-400
                  sm:text-[11px]
                "
              >
                {email}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <PasswordField
              id="new-password"
              label="New Password"
              value={password}
              error={passwordError}
              onChange={handlePasswordChange}
            />

            <PasswordField
              id="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              error={confirmError}
              onChange={handleConfirmChange}
            />

            {success && (
              <div
                role="status"
                className="
                  rounded-md
                  border
                  border-green-200
                  bg-green-50
                  px-3
                  py-2
                  text-center
                  text-[11px]
                  font-semibold
                  text-green-700
                  dark:border-green-900
                  dark:bg-green-950/30
                  dark:text-green-400
                "
              >
                Password changed successfully.
              </div>
            )}

            {!success ? (
              <div className="pt-1">
                <AuthButton>
                  Reset Password
                </AuthButton>
              </div>
            ) : (
              <div className="pt-1">
                <AuthButton
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </AuthButton>
              </div>
            )}

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