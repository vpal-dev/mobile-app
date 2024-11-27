import Drawer from "expo-router/drawer"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { CompassIcon, NotebookIcon } from 'lucide-react-native'
import { DrawerContent } from "./drawer-content"
import { DrawerHeader } from "./drawer-header"

export const GlobalDrawer = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: true,
          header: DrawerHeader,
          drawerHideStatusBarOnOpen: true
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: CompassIcon,
          }}
        />

        <Drawer.Screen
          name="documents"
          options={{
            drawerLabel: 'Documents',
            title: 'Documents',
            drawerIcon: NotebookIcon
          }}
        />
      </Drawer>
    </GestureHandlerRootView >
  )
}


