import { Button } from "@/components/ui/button"
import { useRouter } from "expo-router"

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      text='Back'
      onPress={() => {
        console.log("canGoBack", router.canGoBack())
        router.back()
      }}
    />
  )
}
