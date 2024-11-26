import { Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { BellIcon, SearchIcon, SlidersHorizontalIcon } from "~/lib/icons";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      bottomOffset={8}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className='min-h-full bg-neutral-50 dark:bg-gray-950 px-5'>
        <View className='mt-[60px] flex flex-row justify-between items-center'>
          <View className='flex flex-col'>
            <Text className='text-xl font-extrabold'>Hai, Jhony Kemod</Text>
            <Text>Great to see you again</Text>
          </View>
          <Pressable
            className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'
            onPress={() => console.log("Notification")}
          >
            <BellIcon
              size={16}
              className='text-gray-400 dark:text-gray-400 rounded-full'
            />
          </Pressable>
        </View>
        <View className='mt-6 flex flex-row justify-between items-center gap-5'>
          <View className='flex-grow'>
            <SearchIcon
              size={16}
              className='text-gray-400 dark:text-gray-400 absolute left-3 top-1/3 z-10'
            />
            <Input
              placeholder='Search here...'
              className='pl-10'
              enterKeyHint='search'
            />
          </View>
          <Button variant='outline'>
            <SlidersHorizontalIcon
              size={16}
              className='text-gray-400 dark:text-gray-400 rounded-md'
            />
          </Button>
        </View>
        <View className='mt-5'>
          <Text className='text-lg font-bold'>Recent</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
