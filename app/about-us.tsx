import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginHorizontal: 20, flex: 1 }}>
      <Link asChild href="/terms-of-service">
        <Button style={{ width: 300 }} text="Terms of Service" />
      </Link>

      <Link asChild href="/privacy-policy">
        <Button style={{ width: 300 }} text="Privacy Policy" />
      </Link>
    </SafeAreaView>
  )
}
