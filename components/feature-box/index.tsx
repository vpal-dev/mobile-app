import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { ButtonRaw } from "../ui/button";
import { Link } from "expo-router";

export type FeatureBoxProps = {
  path: string;
  color: string;

  title: string;
  subtitle: string;
  description: string;

  Icon: LucideIcon;
}

export const FeatureBox = ({ path, color, title, subtitle, description, Icon }: FeatureBoxProps) => {
  return (
    <Link asChild href={path as any}>
      <ButtonRaw style={featureBox.container}>
        <View style={featureBox.titleContainer}>
          <View style={[featureBox.iconBox, { backgroundColor: color }]}>
            <Icon size={22} color="rgba(0.9, 0.8, 0.7, 1)" strokeWidth={1.4} />
          </View>

          <View style={featureBox.textContainer}>
            <Text style={featureBox.title}>{title}</Text>
            <Text style={featureBox.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <Text style={featureBox.description}>
          {description.trim()}
        </Text>
      </ButtonRaw>
    </Link>
  )
}


const featureBox = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,

    width: '100%',
    height: 'auto',

    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  description: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 16
  }
})


