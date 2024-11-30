import { Controller, FieldErrors, FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { FormControl, FormField, FormFieldMessage, FormInput, FormInputAction, FormLabel, FormSelect } from "../ui/form"
import { ComponentProps } from "react"
import { Button, IconButton } from "../ui/button";
import { CameraIcon, UploadIcon } from "lucide-react-native";
import { Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

type Props<T extends FieldValues> = Omit<ComponentProps<typeof Controller<T>>, 'render'> & {
  errors: FieldErrors<T>;
};

type SelectProps = {
  label: string;
  options: { label: string, value: string }[];
}

type InputProps = {
  label: string;
  placeholder: string;
}

type ImageProps<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

export const ControlledSelectInput = <T extends Record<string, any>>({
  errors, name, label, options, ...props
}: Props<T> & SelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormField>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FormSelect
              value={String(value)}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
            />
          </FormControl>

          <FormFieldMessage>
            {errors[name] && 'This is required.'}
          </FormFieldMessage>
        </FormField>
      )}
      {...props}
    />
  )
}

export const ControlledTextInput = <T extends Record<string, any>>({
  errors, name, label, placeholder, ...props
}: Props<T> & InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormField>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FormInput placeholder={placeholder} value={value} onBlur={onBlur} onChangeText={onChange} />
          </FormControl>
          <FormFieldMessage>
            {errors[name] && 'This is required.'}
          </FormFieldMessage>
        </FormField>
      )}
      {...props}
    />
  )
}

export const ControlledPhotoUpload = <T extends Record<string, any>>({
  errors, name, watch, setValue, ...props
}: Props<T> & ImageProps<T>) => {
  const photos = watch(name)

  const onPhotosUploadPress = async (type: 'camera' | 'gallery') => {
    let result = null;

    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        base64: true
      });
    }

    if (type === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        base64: true
      });
    }

    if (result && !result?.canceled) {
      setValue(name, result.assets);
    }
  }

  return (
    <Controller
      name={name}
      render={() => (
        <FormField style={{ marginBottom: 20 }}>
          <FormLabel>Upload</FormLabel>
          <FormControl style={{ flexDirection: 'row', gap: 10 }}>
            <Button
              onPress={() => onPhotosUploadPress('camera')}
              style={{ flex: 1, paddingVertical: 16 }}
              text="Camera"
            />

            <Button
              onPress={() => onPhotosUploadPress('gallery')}
              style={{ flex: 1, paddingVertical: 16 }}
              text="Gallery"
            />
            <FormInputAction>
              <IconButton Icon={UploadIcon} />
            </FormInputAction>

            <FormInputAction style={{ right: '55%' }}>
              <IconButton Icon={CameraIcon} />
            </FormInputAction>
          </FormControl>

          {photos.length > 0 ? photos.map((photo: any) => {
            return (
              <Image
                key={photo.uri}
                style={{ width: '100%', height: 200, marginVertical: 10 }}
                source={{ uri: photo.uri }}
              />
            )
          }) : null}
        </FormField>

      )}
      {...props}
    />
  )
}

/* ******************************************************** */
/* ******************************************************** */

export const ControlledGradeInput = <T extends Record<string, any>>({
  errors, name, ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
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
            {errors[name] && 'This is required.'}
          </FormFieldMessage>
        </FormField>
      )}
      {...props}
    />
  )
}


