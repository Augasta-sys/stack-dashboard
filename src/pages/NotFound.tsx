import { useNavigate } from "react-router-dom"
import AuthButton from "../components/auth/AuthButton"
import AuthCard from "../components/auth/AuthCard"
import NotFoundIllustration from "../components/error/NotFoundIllustration"
import AuthLayout from "../components/layout/AuthLayout"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthCard
        className="
          flex
          items-center
          justify-center
          px-5
          py-6
          sm:px-8
          sm:py-7
          md:px-10
          md:py-8
        "
      >
        <div className="flex w-full flex-col items-center">
          <NotFoundIllustration />

          <h1
            className="
              mt-4
              text-center
              text-[19px]
              font-bold
              leading-tight
              text-[#202224]
              dark:text-white
              sm:mt-5
              sm:text-[23px]
              md:mt-6
              md:text-[27px]
            "
          >
            Looks like you've got lost....
          </h1>

          <div className="mt-6 w-full">
            <AuthButton
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </AuthButton>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}