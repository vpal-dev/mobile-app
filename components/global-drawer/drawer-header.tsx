import { DrawerHeaderProps } from "@react-navigation/drawer"
import { Platform, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "../ui/button"
import { ChevronsRightIcon } from "lucide-react-native"

export const DrawerHeader = (props: DrawerHeaderProps) => {
  return (
    <SafeAreaView style={headerStyles.container}>
      <Button
        style={{ paddingHorizontal: 10 }}
        text=''
        Icon={ChevronsRightIcon}
        onPress={() => props.navigation.openDrawer()}
      />
      <Text style={headerStyles.logoText}>vpal</Text>
    </SafeAreaView>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,

    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? -10 : 10,
    marginBottom: 20,

    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  logoText: {
    fontFamily: 'Itim',
    fontSize: 20,
  }
})

