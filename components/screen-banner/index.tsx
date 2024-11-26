import { LucideIcon } from "lucide-react-native"
import { Container } from "../ui/container"
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

type ScreenBannerProps = {
  Icon: LucideIcon
  title: string
  subtitle: string
  description: string

  style?: StyleProp<ViewStyle>
}

export const ScreenBanner = (props: ScreenBannerProps) => {
  const { Icon, title, subtitle, description, style } = props

  return (
    <Container style={[styles.container, style]}>
      <View style={styles.iconBox}>
        <Icon size={22} color="rgba(0.9, 0.8, 0.7, 1)" strokeWidth={1.4} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <Text style={styles.description}>
        {description.trim()}
      </Text>
    </Container>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',


    backgroundColor: "#F9FAFB",
    borderColor: "rgba(0,0,0,0.1)",
    shadowColor: "rgba(0,0,0,0.1)",
  },
  iconBox: {
    borderRadius: 10,
    backgroundColor: '#EFCEC8',
    width: 50,
    height: 50,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },


  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#1C1C1C"
  },
  subtitle: {
    fontSize: 12,
    color: "#5A5A5A",
    textAlign: 'center',
  },
  description: {
    marginTop: 8,

    fontSize: 13,
    color: "#5A5A5A",
    textAlign: 'center',
  }
})
