import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, ButtonRaw } from "../ui/button"
import { LucideIcon } from "lucide-react-native"
import { supabase } from "@/lib/supabase"
import { useActiveUser } from "@/services/auth"

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()

  const { data, isLoading } = useActiveUser()

  const { state, descriptors } = props

  const onLogoutPress = () => {
    supabase.auth.signOut()
    router.navigate('/auth/login')
  }

  return (
    <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <View style={schoolStyles.container}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png"
          }}
          width={50}
          height={50}
          style={schoolStyles.img}
        />

        <View>
          <Text style={schoolStyles.title}>Golden School of India</Text>
          <Text style={schoolStyles.subtitle}>32 students</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.routesContainer]}>
        {state.routes.map((route, i) => {
          const label = String(descriptors[route.key].options.drawerLabel)

          if (!label || label === 'undefined') return null

          return (
            <Button
              key={i}
              style={{ width: '100%', justifyContent: 'flex-start', paddingVertical: 12 }}
              // onPress={() => route.path && router.navigate(route.name as unknown as any)}
              onPress={() => {
                route.name && router.navigate(route.name as any)
              }}
              text={label}
              Icon={descriptors[route.key].options.drawerIcon as LucideIcon}
            />
          )
        })}
      </ScrollView>


      <View style={footerStyles.container}>
        <Pressable>
          <Text style={footerStyles.buttonText}>Help & Support</Text>
        </Pressable>

        <ButtonRaw style={footerStyles.button} onPress={() => Alert.alert("hello")}>
          {/*
          <View style={footerStyles.avatar} >
            <Text style={footerStyles.avatarText}>DS</Text>
          </View>
        */}

          <Text style={footerStyles.buttonText}>{isLoading ? '...' : '+' + data?.user?.phone}</Text>

          {/* <ChevronsUpDownIcon size={16} color="black" style={{ marginLeft: 'auto' }} /> */}
        </ButtonRaw>

        <Pressable style={{ marginLeft: 'auto', marginRight: 12 }} onPress={onLogoutPress}>
          <Text style={footerStyles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  )
}

const schoolStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  img: {
    borderRadius: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    // fontFamily: 'Satoshi'
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
  },
})

const styles = StyleSheet.create({
  routesContainer: {
    display: 'flex',
    padding: 16,
    gap: 15,
    marginTop: 12
  },
})

const footerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,

    paddingHorizontal: 16,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontFamily: "Itim",
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
})
