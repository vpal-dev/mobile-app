import React, { useMemo } from "react"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { Link, useRouter } from "expo-router"
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, ButtonRaw } from "../ui/button"
import { LucideIcon } from "lucide-react-native"
import { useActiveUser, useLogout } from "@/services/auth"

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()

  const { data, isLoading } = useActiveUser()

  const { state, descriptors } = props

  const { mutate } = useLogout()
  const onLogoutPress = () => {
    mutate()
    router.navigate('/auth/login')
  }

  const onProfilePress = () => {
    router.navigate('/profile')
  }

  const userName = useMemo(() => {
    const name = data?.user?.user_metadata?.full_name
    const phone = "+" + data?.user?.phone

    if (name) {
      return `${name} (${phone})`
    }

    return phone
  }, [data])

  return (
    <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom, marginVertical: Platform.OS === 'android' ? 20 : 0 }}>
      <Text style={schoolStyles.logoTitle}>
        VPal
      </Text>

      <View style={[schoolStyles.container, { display: 'none' }]}>
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
        <Link asChild href={`https://wa.me/${918981802453}`}>
          <Pressable>
            <Text style={footerStyles.buttonText}>Help & Support</Text>
          </Pressable>
        </Link>

        {/*
        <Link asChild href={`/about-us`}>
          <Pressable>
            <Text style={footerStyles.buttonText}>About us</Text>
          </Pressable>
        </Link>
        */}



        {
          data?.user ? (
            <>
              <ButtonRaw style={footerStyles.button} onPress={onProfilePress}>
                <Text style={footerStyles.buttonText}>{isLoading ? '...' : userName}</Text>
              </ButtonRaw>

              <Pressable style={{ marginLeft: 'auto', marginRight: 12 }} onPress={onLogoutPress}>
                <Text style={footerStyles.buttonText}>Logout</Text>
              </Pressable>
            </>
          ) : (
            <Link asChild href="/auth/login">
              <ButtonRaw style={footerStyles.button}>
                <Text style={footerStyles.buttonText}>Login</Text>
              </ButtonRaw>
            </Link>
          )
        }

      </View>
    </View>
  )
}

const schoolStyles = StyleSheet.create({
  logoTitle: {
    paddingHorizontal: 20,
    fontFamily: "Itim",
    fontSize: 24,
  },
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
