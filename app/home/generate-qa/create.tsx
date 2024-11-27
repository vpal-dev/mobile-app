import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormLabel, FormSelect } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGenerateQA } from '@/services/generate-qa';

export default function CreateQAScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade: 10,
      noOfQuestions: 4,
      type: "mcq",
      topic: ""
    },
  })

  const router = useRouter()
  const { mutateAsync } = useGenerateQA()

  const onSubmit = async (data: any) => {
    const { grade, noOfQuestions, type, topic } = data;

    const id = await mutateAsync({ grade, topic, noOfQuestions, type })
    router.navigate(`/home/generate-qa/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/generate-qa">
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
                <FormLabel>No of Questions</FormLabel>
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
                      { label: "8", value: "8" }
                    ]}
                  />
                </FormControl>

                <FormFieldMessage>
                  {errors.grade && 'This is required.'}
                </FormFieldMessage>
              </FormField>
            )}
            name="noOfQuestions"
          />


          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>Type of Assessment</FormLabel>
                <FormControl>
                  <FormSelect
                    value={String(value)}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                      { label: "MCQ", value: "mcq" },
                      { label: "Quiz", value: "quiz" },
                      { label: "Long Form", value: "long form" },
                    ]}
                  />
                </FormControl>

                <FormFieldMessage>
                  {errors.grade && 'This is required.'}
                </FormFieldMessage>
              </FormField>
            )}
            name="type"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>What would you like to create for?</FormLabel>
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

          <SubmitButton style={styles.submitBtn} text='Generate Assessment' onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
}


const TopContent = () => {
  return (
    <>
      <ScreenBanner
        Icon={PencilRulerIcon}
        title={FEATURES_DATA.GENERATE_QA.title}
        subtitle={FEATURES_DATA.GENERATE_QA.subtitle}
        description={FEATURES_DATA.GENERATE_QA.description}
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

