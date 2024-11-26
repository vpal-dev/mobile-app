import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { Container } from "../ui/container";
import { ButtonRaw } from "../ui/button";

type ActionBannerProps = {
  title: string;
  Description: (props: { fontSize: number, color: string }) => React.ReactNode;
  buttonText: string;
  onPress: () => void;

  style?: StyleProp<ViewStyle>
}

export const ActionBanner = (props: ActionBannerProps) => {
  const { title, Description, buttonText, onPress, style } = props;

  return (
    <Container style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Description fontSize={12} color="#5A5A5A" />
      <ButtonRaw onPress={onPress} style={styles.actionBtn}>
        <Text style={{ color: "#EEF2FF", fontFamily: "Itim", }}>{buttonText}</Text>
      </ButtonRaw>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    backgroundColor: "#E0E7FF",
    borderColor: "#C7D2FE",
    shadowColor: "#6366F1",

    display: "flex",
    flexDirection: 'column',
    gap: 8
  },
  title: {
    fontWeight: "600",
  },
  actionBtn: {
    marginTop: 12,

    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
    shadowColor: "#A7A8F2",
  }
})
