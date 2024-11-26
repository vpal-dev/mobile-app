import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeLayout() {
  return (
    <Stack
      layout={(props) => <View style={styles.container} {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home Dashboard',
        }}
      />


      {/* Generate QA Routes */}
      <Stack.Screen
        name="generate-qa/index"
        options={{
          title: 'Generate QA',
        }}
      />

      {/* Lesson Plans Routes */}
      <Stack.Screen
        name="lesson-plans/index"
        options={{
          title: 'Lesson Plans',
        }}
      />

      <Stack.Screen
        name="lesson-plans/[id]/index"
        options={{
          title: 'Lesson Plan Details',
        }}
      />

      <Stack.Screen
        name="lesson-plans/create/index"
        options={{
          title: 'Lesson Create',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
})
