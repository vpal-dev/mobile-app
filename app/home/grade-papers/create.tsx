import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, IconButton, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInputAction, FormLabel, FormSelect } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon, UploadIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGradePaper } from '@/services/grade-papers';
import * as ImagePicker from 'expo-image-picker';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, },
  } = useForm<{ grade: number, photos: ImagePicker.ImagePickerAsset[] }>({
    defaultValues: {
      grade: 10,
      photos: [],
    },
  })

  const router = useRouter()
  const { mutateAsync } = useGradePaper()

  const photos = watch('photos')

  const onPhotosUploadPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setValue('photos', result.assets);
    }
  }


  const onSubmit = async (data: any) => {
    const { grade, photos } = data;

    if (!photos.length) {
      alert('Please upload papers.')
      return;
    }

    const id = await mutateAsync({ grade, photos })
    router.navigate(`/home/grade-papers/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/grade-papers">
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


          <FormField>
            <FormLabel>Upload Papers</FormLabel>
            <FormControl>
              <Button
                onPress={onPhotosUploadPress}
                style={{ width: '100%', paddingVertical: 16 }}
                text={photos.length ? "Photo Uploaded!" : 'Upload'}
              />
              <FormInputAction>
                <IconButton Icon={UploadIcon} />
              </FormInputAction>
            </FormControl>

            {photos.length > 0 ? photos.map((photo) => {
              return (
                <Image
                  key={photo.uri}
                  style={{ width: '100%', height: 200, marginVertical: 10 }}
                  source={{ uri: photo.uri }}
                />
              )
            }) : null}
          </FormField>


          <SubmitButton style={styles.submitBtn} text='Grade Papers' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.GRADE_PAPERS.title}
        subtitle={FEATURES_DATA.GRADE_PAPERS.subtitle}
        description={FEATURES_DATA.GRADE_PAPERS.description}
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
    marginTop: 20,
    marginHorizontal: 'auto'
  }
});

