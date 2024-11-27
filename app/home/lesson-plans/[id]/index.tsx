import { BackButton } from '@/components/back-button/back-button';
import { Button, ButtonRaw } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useGetLessonPlan } from '@/services/lesson-plans';
import { Link, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function LessonID() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: _data, isLoading } = useGetLessonPlan(parseInt(id))

  const data = useMemo(() => {
    const { title = "", shortDescription = "", content = "" } = JSON.parse(_data?.content || "{}")

    return {
      title,
      shortDescription,
      content,
    }
  }, [_data])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView style={{ height: '100%' }} contentContainerStyle={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/lesson-plans/create">
          <Button text='New' />
        </Link>
      </View>

      <Container style={styles.titleContainer}>
        <Text style={styles.title}>{data.title.trim()}</Text>
        <Text style={styles.shortDescription}>{data.shortDescription}</Text>
      </Container>


      <Markdown style={{
        body: {
          // fontFamily: "Satoshi-500",
        },
        heading1: {
          display: 'none',
        },
        heading2: {
          fontSize: 16,
          fontWeight: 700,
          marginVertical: 10,
          marginTop: 20
        }
      }}>
        {data.content}
      </Markdown>


      <View style={styles.seperator} />

      <ButtonRaw style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, paddingVertical: 16 }}>
        <Text style={{ fontWeight: 600, fontSize: 16, textDecorationStyle: "dotted", textDecorationLine: 'underline' }}>questionner</Text>
        <Text>create homework assignment, small quiz question paper for this.</Text>
      </ButtonRaw>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
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
  },
  markdown: {
    fontFamily: "Itim",
  },
  seperator: {
    marginVertical: 20,
    marginTop: 50,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)'
  }
});

