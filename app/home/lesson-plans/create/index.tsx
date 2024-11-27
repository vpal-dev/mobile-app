import RNPickerSelect from 'react-native-picker-select';
import { ActionBanner } from '@/components/action-banner';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, IconButton, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormInput, FormInputAction, FormLabel } from '@/components/ui/form';
import { Link } from 'expo-router';
import { ArrowDownToDotIcon, PencilRulerIcon } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Container } from '@/components/ui/container';

export default function CreateLessonPlanScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/lesson-plans">
            <Button text='History' />
          </Link>
        </View>

        <ActionBanner
          title='Personalize Lesson Plans'
          Description={(({ fontSize, color }) => {
            return (
              <Text style={{ fontSize, color }}>Get Lessons plans to the way you write! Upload some examples and Vpal will create lesson plans as you do.</Text>
            )
          })}
          buttonText='Upload Lesson Plans'
          onPress={() => console.log('Upload Lesson Plans')}
        />


        <ScreenBanner
          Icon={PencilRulerIcon}
          title='Create lesson plans in 2 mins '
          subtitle='12k users'
          description={
            `
Simply input your topic and requirements, 
and Vpal generates detailed lesson plans with objectives, activities, and assessments. 
Customise as needed and save your preferred templates.
          `
          }
        />

        <FormField>
          <FormLabel>Grade</FormLabel>
          <FormControl>

            <Container style={{ width: '100%', paddingVertical: 0 }}>
              <Picker
                mode='dialog'
                selectedValue={selectedLanguage}
                // style={{ height: 200, width: '100%' }}
                numberOfLines={1}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Container>
          </FormControl>
        </FormField>


        <FormField>
          <FormLabel>What would you like to teach?</FormLabel>
          <FormControl>
            <FormInput placeholder="quadratic equations" />
            {/*
          <FormInputAction>
            <IconButton Icon={ArrowDownToDotIcon} style={{ paddingHorizontal: 8 }} />
          </FormInputAction>
          */}
          </FormControl>
        </FormField>



        <SubmitButton style={styles.submitBtn} text='Create Lesson Plan' onPress={() => console.log('Create Lesson Plan')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    gap: 12,


    paddingBottom: 20,

    height: '100%',
  },
  topActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 14,
    marginHorizontal: 'auto'
  }
});

