import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { ControlledSelectInput, ControlledTextInput } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';
import { useGenerateDifferentlyAbledLesson } from '@/services/differently-abled';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "Gifted",
      student_description: "",
      topic: ""
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useGenerateDifferentlyAbledLesson()

  const onSubmit = async (data: any) => {
    const id = await mutateAsync(data)
    router.navigate(`/home/differently-abled/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/differently-abled">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <ControlledSelectInput
            name="type"
            control={control}
            label="Type"
            options={[
              { label: 'Gifted', value: "Gifted" },
              { label: 'Autism', value: "Autism" },
              { label: "Dyscalculia", value: "Dyscalculia" },
              { label: 'Down Syndrome', value: "Down Syndrome" },
              { label: 'Cerebral Palsy', value: "Cerebral Palsy" },
              { label: 'Dyslexia', value: "Dyslexia" },
              { label: 'ADHD', value: "ADHD" },
            ]}
            errors={errors}
          />
          <ControlledTextInput
            name="student_description"
            control={control}
            rules={{
              required: true,
            }}
            label="Description of Student"
            placeholder="6th class, highly gifted, really anxious, etc.."
            errors={errors}
          />

          <ControlledTextInput
            name="topic"
            control={control}
            rules={{
              required: true,
            }}
            label="Content (lesson-plan/assessment)"
            placeholder="quadratic equations, world war 2, etc.."
            errors={errors}
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Generate content Gifted Students' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.DIFFERENTLY_ABLED.title}
        subtitle={FEATURES_DATA.DIFFERENTLY_ABLED.subtitle}
        description={FEATURES_DATA.DIFFERENTLY_ABLED.description}
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

