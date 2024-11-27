import { LucideIcon } from 'lucide-react-native';
import { forwardRef } from 'react';
import { Pressable, View, StyleSheet, Text, StyleProp, ViewStyle, Platform } from 'react-native';

type ButtonProps = {
  text: string;
  Icon?: LucideIcon;

  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button = forwardRef<View, ButtonProps>(({ style, text, Icon, onPress }, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
        style
      ]}
    >
      {Icon && <Icon color="black" size={14} />}
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </Pressable>
  );
});

type ButtonRawProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const ButtonRaw = forwardRef<View, ButtonRawProps>(({ style, onPress, children }, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
        style
      ]}
    >
      {children}
    </Pressable>
  );
})

export const IconButton = forwardRef<View, Omit<ButtonProps, 'text'>>(({ style, Icon, onPress }, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
        {
          paddingHorizontal: 8,
        },
        style
      ]}
    >
      {Icon && <Icon color="black" size={14} />}
    </Pressable>
  );
})


export const SubmitButton = forwardRef<View, ButtonProps>(({ style, text, Icon, onPress }, ref) => {
  return (
    <ButtonRaw
      ref={ref}
      style={[styles.submitBtn, style]}
      onPress={onPress}
    >
      {Icon && <Icon color="black" size={14} />}
      {text ? <Text style={[styles.text, { color: "#F8FAFC" }]}>{text}</Text> : null}
    </ButtonRaw>
  )
})

const styles = StyleSheet.create({
  container: {
    // boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 8,
    paddingHorizontal: 16,

    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(210, 210, 210, 1)',
    backgroundColor: 'white',

    borderBottomWidth: 4,

    alignSelf: 'flex-start',
  },
  pressedContainer: {
    transform: [{ translateY: 4 }],
    borderBottomWidth: 2,
    marginBottom: 2,
  },
  text: {
    fontFamily: 'Itim',
    fontSize: 14,
    color: 'black',
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 14,
    marginHorizontal: 'auto',

    backgroundColor: "#1455FE",
    borderColor: "rgba(20, 85, 254, 0.2)",
  }
});

