import { useActiveUser } from "@/services/auth"
import { SubmitButton } from "../ui/button"
import { Link } from "expo-router"

type AuthButtonWrapperProps = {
  children: React.ReactNode
}

export const AuthButtonWrapper = ({ children }: AuthButtonWrapperProps) => {
  const { data: user, isLoading } = useActiveUser()

  if (!user?.user) {
    return (
      <Link asChild href="/auth/login">
        <SubmitButton
          isLoading={isLoading}
          text="Login"
          onPress={() => {
            console.log("login button pressed")
          }}
        />
      </Link>
    )
  }

  return children
}

