import { StyleSheet, Text } from "react-native"
import { Container } from "../ui/container"

type SimpleCardProps = {
  title: string
  description: string
}

export const SimpleCard = ({ title, description }: SimpleCardProps) => {
  return (
    <Container style={styles.titleContainer}>
      <Text style={styles.title}>{title.trim()}</Text>
      <Text style={styles.shortDescription}>{description}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shortDescription: {
    fontSize: 12,
    color: '#5A5A5A'
  }
});

