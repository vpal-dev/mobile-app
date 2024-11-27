import { ComponentProps } from "react"
import { Platform, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native"

type BasicProps<T> = {
  children: React.ReactNode
  style?: StyleProp<T>
}

export const FormField = (props: BasicProps<ViewStyle>) => {
  return (
    <View style={[styles.field, props.style]}>
      {props.children}
    </View>
  )
}

export const FormLabel = (props: BasicProps<TextStyle>) => {
  return (
    <Text style={[styles.label, props.style]}>
      {props.children}
    </Text>
  )
}

export const FormControl = (props: BasicProps<ViewStyle>) => {
  return (
    <View style={[styles.control, props.style]}>
      {props.children}
    </View>
  )
}

export const FormInputAction = (props: BasicProps<ViewStyle>) => {
  return (
    <View style={[styles.inputAction, props.style]}>
      {props.children}
    </View>
  )
}

type FormInputProps = ComponentProps<typeof TextInput> & {}
export const FormInput = (props: FormInputProps) => {
  const { style, ...rest } = props

  return (
    <TextInput
      style={[styles.input, style]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontFamily: 'Itim',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.8)',

    marginLeft: 8
  },
  control: {
    position: 'relative',
    paddingBottom: 10
  },
  inputAction: {
    position: 'absolute',
    right: 10,
    top: 7,
  },
  input: {
    width: '100%',
    padding: 16,

    borderRadius: 9,
    backgroundColor: 'white',

    borderColor: 'rgba(210, 210, 210, 1)',
    borderWidth: 1,
    borderBottomWidth: 4,

    alignSelf: 'flex-start',

    fontFamily: 'Itim',
    fontSize: 16,
  }
})
