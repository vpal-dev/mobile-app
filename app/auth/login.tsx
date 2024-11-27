import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import { FormControl, FormField, FormInput, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneno: "",
    },
  })

  const onSubmit = async (data: any) => {
    const phoneNo = '+91' + data.phoneno;
    console.log("Phone no", phoneNo);

    const { data: otpData, error } = await supabase.auth.signInWithOtp({
      phone: phoneNo,
      options: {
        channel: 'sms'
      }
    })

    if (error) {
      Alert.alert(error.message)
      return
    }

    router.navigate({
      pathname: '/auth/otp-verify',
      params: { phoneNo }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={[formStyles.container, { paddingBottom: bottom }]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField>
              <FormLabel>Phone no (+91)</FormLabel>
              <FormControl style={formStyles.control}>
                <Container style={{ height: '100%' }}>
                  <Text style={{ fontFamily: 'Itim' }}>+91</Text>
                </Container>
                <FormInput
                  style={{ flex: 1 }}
                  placeholder="7207159628"
                  inputMode='tel'
                  keyboardType='phone-pad'
                  maxLength={10}
                  autoComplete='tel'

                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </FormControl>
            </FormField>
          )}
          name="phoneno"
          rules={{ required: "Phone no is required" }}
        />
        {errors.phoneno && <Text>{errors.phoneno.message}</Text>}

        <Button style={formStyles.loginBtn} text='Request otp' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    display: 'flex',
  },
  title: {
    fontFamily: 'Itim',
    fontSize: 24
  }

});

const formStyles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  loginBtn: {
    width: '100%',
    paddingVertical: 12,
    marginHorizontal: 'auto'
  }
});

