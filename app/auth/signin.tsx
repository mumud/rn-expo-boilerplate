import { useState } from "react";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { LogInIcon, EyeIcon, EyeOffIcon } from "~/lib/icons";

import SigninSvg from "~/assets/svg/mobile_login.svg";
import { Label } from "~/components/ui/label";

export default function Signin() {
  const insets = useSafeAreaInsets();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const onChange = (k: "username" | "password", v: string) => {
    setValue({
      ...value,
      [k]: v,
    });
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={8}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className='flex min-h-full justify-center items-center gap-8 bg-neutral-50 dark:bg-gray-950'>
        <SigninSvg width={200} height={200} />
        <View className='w-full max-w-sm p-[20px] mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <View className='flex justify-center items-center'>
            <Text className='text-2xl font-bold'>Welcome</Text>
          </View>
          <View className='pt-8'>
            <View>
              <Label nativeID='username'>Username</Label>
              <Input
                placeholder='Enter your username'
                value={value.username}
                onChangeText={(value) => onChange("username", value)}
                aria-labelledby='usernameLabel'
                aria-errormessage='usernameError'
                className='mt-2'
              />
            </View>
            <View className='mt-4'>
              <Label nativeID='password'>Password</Label>
              <View>
                <Input
                  placeholder='Enter your password'
                  value={value.password}
                  onChangeText={(value) => onChange("password", value)}
                  aria-labelledby='passwordLabel'
                  aria-errormessage='passwordError'
                  className='mt-2 pr-11'
                  secureTextEntry={secureTextEntry}
                />
                <Pressable
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  className='absolute right-0 top-1/2 transform -translate-y-1/3 px-4'
                >
                  {secureTextEntry ? (
                    <EyeIcon
                      size={16}
                      className='text-gray-400 dark:text-gray-400'
                    />
                  ) : (
                    <EyeOffIcon
                      size={16}
                      className='text-gray-400 dark:text-gray-400'
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
          <View className='mt-4'>
            <View className='flex flex-row items-center justify-end'>
              <Text
                className='text-gray-600 dark:text-gray-400 hover:underline'
                onPress={() => console.log("Forgot password")}
              >
                Forgot Password ?
              </Text>
            </View>
          </View>
          <View className='mt-4'>
            <Button
              className='w-full flex flex-row justify-center items-center gap-2'
              onPress={() => console.log("Login")}
            >
              <LogInIcon size={14} className='text-white dark:text-gray-500' />
              <Text>Sign In</Text>
            </Button>
          </View>
          <View className='mt-5'>
            <View className='flex flex-row items-center justify-between'>
              <Text className='text-gray-600 dark:text-gray-400'>
                Don't have an account ?
              </Text>
              <Link href='/auth/signup' asChild>
                <Text className='text-gray-600 dark:text-gray-400 hover:underline'>
                  Sign up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
