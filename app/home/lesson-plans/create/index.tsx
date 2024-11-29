import React from 'react';
import { ActionBanner } from '@/components/action-banner';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormLabel, FormSelect } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useCreateLessonPlan } from '@/services/lesson-plans';
import { FEATURES_DATA } from '@/constants/features-data';

export default function CreateLessonPlanScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade: 10,
      topic: ""
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useCreateLessonPlan()

  const onSubmit = async (data: any) => {
    const { grade, topic } = data;

    const id = await mutateAsync({ grade, topic })
    router.navigate(`/home/lesson-plans/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/lesson-plans">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <FormSelect
                    value={String(value)}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" },
                      { label: "7", value: "7" },
                      { label: "8", value: "8" },
                      { label: "9", value: "9" },
                      { label: "10", value: "10" },
                      { label: "11", value: "11" },
                      { label: "12", value: "12" },
                    ]}
                  />
                </FormControl>

                <FormFieldMessage>
                  {errors.grade && 'This is required.'}
                </FormFieldMessage>
              </FormField>
            )}
            name="grade"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>What would you like to teach?</FormLabel>
                <FormControl>
                  <FormInput placeholder="quadratic equations" value={value} onBlur={onBlur} onChangeText={onChange} />
                </FormControl>
                <FormFieldMessage>
                  {errors.topic && 'This is required.'}
                </FormFieldMessage>
              </FormField>

            )}
            name="topic"
          />

          <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Create Lesson Plan' onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView >
  );
}


const TopContent = () => {
  return (
    <>
      {/*
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
    */}

      <ScreenBanner
        Icon={PencilRulerIcon}
        title={FEATURES_DATA.LESSON_PLANS.title}
        subtitle={FEATURES_DATA.LESSON_PLANS.subtitle}
        description={FEATURES_DATA.LESSON_PLANS.description}
      />
    </>
  )
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

