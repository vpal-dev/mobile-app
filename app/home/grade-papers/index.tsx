import { BackButton } from '@/components/back-button/back-button';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useGetAllGradedPapers } from '@/services/grade-papers';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function IndexScreen() {
  const { data } = useGetAllGradedPapers()

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/grade-papers/create">
          <Button text='New' />
        </Link>
      </View>

      <Text style={styles.title}>All Graded Papers</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {!data?.length ? <Text>No papers have been graded.</Text> : data?.map((d) => {
          const { title, shortDescription } = JSON.parse(d.content);

          return (
            <Link href={`/home/grade-papers/${d.id}`} key={d.id}>
              <Container style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
                <Text style={{ fontSize: 14, color: '#5A5A5A' }}>{shortDescription}</Text>
              </Container>
            </Link>
          )
        })}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

    marginVertical: 20,
    marginTop: 40
  },
  scrollView: {
    gap: 10
  }
});

