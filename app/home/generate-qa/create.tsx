import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGenerateQA } from '@/services/generate-qa';
import { ControlledGradeInput, ControlledSelectInput, ControlledTextInput } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';

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
  const { mutateAsync, isPending } = useGenerateQA()

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
          <ControlledGradeInput control={control} errors={errors} name="grade" />
          <ControlledSelectInput
            control={control}
            rules={{
              required: true,
            }}
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
            name="noOfQuestions"
            errors={errors}
            label='Number of Questions'
          />
          <ControlledSelectInput
            control={control}
            rules={{
              required: true,
            }}
            label="Type of Assessment"
            options={[
              { label: "MCQ", value: "mcq" },
              { label: "Quiz", value: "quiz" },
              { label: "Long Form", value: "long form" },
            ]}
            name="type"
            errors={errors}
          />
          <ControlledTextInput
            control={control}
            rules={{
              required: true,
            }}
            name="topic"
            label='Topic'
            placeholder='quadratic equations'
            errors={errors}
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Generate Assessment' onPress={handleSubmit(onSubmit)} />
          </AuthButtonWrapper>
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

