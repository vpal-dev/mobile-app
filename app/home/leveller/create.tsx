import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import * as ImagePicker from 'expo-image-picker';
import { useLevelAssignment } from '@/services/leveller';
import { ControlledGradeInput, ControlledPhotoUpload, ControlledTextInput } from '@/components/common-inputs';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, },
  } = useForm<{ grade: number, photos: ImagePicker.ImagePickerAsset[], description: '' }>({
    defaultValues: {
      grade: 10,
      photos: [],
      description: ''
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useLevelAssignment()

  const onSubmit = async (data: any) => {
    const { grade, photos, description } = data;

    if (!photos.length) {
      alert('Please upload papers.')
      return;
    }

    const id = await mutateAsync({ grade, photos, description })
    router.navigate(`/home/grade-papers/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/leveller">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <ControlledGradeInput control={control} errors={errors} name="grade" />
          <ControlledPhotoUpload control={control} errors={errors} name="photos" watch={watch} setValue={setValue} />
          <ControlledTextInput
            control={control}
            errors={errors}
            name="description"
            label="How would you like to modify the assignment?"
            placeholder='make it for a 6th standard ADHD student'
          />

          <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Generate Variation' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.LEVELLER.title}
        subtitle={FEATURES_DATA.LEVELLER.subtitle}
        description={FEATURES_DATA.LEVELLER.description}
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

  }
});

