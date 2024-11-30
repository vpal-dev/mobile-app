import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type SeparatorProps = {
  style?: StyleProp<ViewStyle>;
}

export const Separator = (props: SeparatorProps) => {
  return (
    <View style={[styles.seperator, props.style]} />
  )
}

const styles = StyleSheet.create({
  seperator: {
    marginVertical: 20,
    marginTop: 50,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)'
  },
})

