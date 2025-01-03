import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginHorizontal: 20, flex: 1 }}>
      <Link asChild href="/auth/terms-of-service">
        <Button style={{ width: 300 }} text="Terms of Service" />
      </Link>

      <Link asChild href="/auth/privacy-policy">
        <Button style={{ width: 300 }} text="Privacy Policy" />
      </Link>
    </SafeAreaView>
  )
}
