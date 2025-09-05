/**
 * Example Tab Component
 * Displays various examples of available UI components usage
 */

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Input,
  Label,
  Text,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Checkbox,
  Switch,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Skeleton,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";
import {
  AlertCircleIcon,
  InfoIcon,
  UserIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExampleScreen() {
  const insets = useSafeAreaInsets();
  // State for various components
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState<
    { value: string; label: string } | undefined
  >(undefined);
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <View
      className='flex-1 bg-neutral-50 dark:bg-gray-950'
      style={{ paddingTop: insets.top }}
    >
      <ScrollView className='flex-1'>
        <View className='p-4 space-y-6'>
          {/* Header */}
          <View className='mb-6'>
            <Text className='text-2xl font-bold text-foreground mb-2'>
              UI Components Example
            </Text>
            <Text className='text-muted-foreground'>
              Examples of various available UI components usage
            </Text>
          </View>

          {/* 1. Form Components */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800'>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Input, Select, TextArea, Checkbox, and Switch
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Input */}
              <View>
                <Label>Input Field</Label>
                <Input
                  placeholder='Enter text here...'
                  value={inputValue}
                  onChangeText={setInputValue}
                  className='mt-2'
                />
              </View>

              {/* Select */}
              <View className='mt-4'>
                <Label>Select Dropdown</Label>
                <Select
                  value={selectValue}
                  onValueChange={setSelectValue}
                  className='mt-2'
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Choose option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='option1' label='Option 1'>
                      <Text>Option 1</Text>
                    </SelectItem>
                    <SelectItem value='option2' label='Option 2'>
                      <Text>Option 2</Text>
                    </SelectItem>
                    <SelectItem value='option3' label='Option 3'>
                      <Text>Option 3</Text>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </View>

              {/* Textarea */}
              <View className='mt-4'>
                <Label>Text Area</Label>
                <Textarea
                  placeholder='Enter long text here...'
                  value={textareaValue}
                  onChangeText={setTextareaValue}
                  numberOfLines={4}
                  className='mt-2'
                />
              </View>

              {/* Checkbox */}
              <View className='flex-row items-center gap-2 mt-2'>
                <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
                <Label>Checkbox Example</Label>
              </View>

              {/* Switch */}
              <View className='flex-row items-center justify-between mt-2'>
                <Label>Switch Toggle</Label>
                <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn} />
              </View>
            </CardContent>
          </Card>

          {/* 2. Button Components */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Various types and sizes of buttons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className='flex-row flex-wrap gap-2'>
                <Button variant='default'>
                  <Text>Default</Text>
                </Button>
                <Button variant='secondary'>
                  <Text>Secondary</Text>
                </Button>
                <Button variant='destructive'>
                  <Text>Destructive</Text>
                </Button>
                <Button variant='outline'>
                  <Text>Outline</Text>
                </Button>
                <Button variant='ghost'>
                  <Text>Ghost</Text>
                </Button>
                <Button variant='link'>
                  <Text>Link</Text>
                </Button>
              </View>

              <View className='flex-row flex-wrap gap-2 mt-2'>
                <Button size='sm'>
                  <Text>Small</Text>
                </Button>
                <Button size='default'>
                  <Text>Default</Text>
                </Button>
                <Button size='lg'>
                  <Text>Large</Text>
                </Button>
                <Button size='icon'>
                  <UserIcon className='h-4 w-4' />
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* 3. Dialog */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Dialog Example</CardTitle>
              <CardDescription>
                Modal dialog with trigger button
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Text>Open Dialog</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is an example dialog. You can add any content
                      here.
                    </DialogDescription>
                  </DialogHeader>
                  <View className='mt-4'>
                    <Button onPress={() => setIsDialogOpen(false)}>
                      <Text>Close</Text>
                    </Button>
                  </View>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* 4. Tabs */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Tabs Example</CardTitle>
              <CardDescription>
                Tab navigation with different content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value='tab1'>
                    <Text>Tab 1</Text>
                  </TabsTrigger>
                  <TabsTrigger value='tab2'>
                    <Text>Tab 2</Text>
                  </TabsTrigger>
                  <TabsTrigger value='tab3'>
                    <Text>Tab 3</Text>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='tab1' className='mt-4'>
                  <Text className='text-foreground'>
                    Content for Tab 1. This is example content that
                    is displayed when the first tab is selected.
                  </Text>
                </TabsContent>
                <TabsContent value='tab2' className='mt-4'>
                  <Text className='text-foreground'>
                    Content for Tab 2. Each tab can have different
                    content.
                  </Text>
                </TabsContent>
                <TabsContent value='tab3' className='mt-4'>
                  <Text className='text-foreground'>
                    Content for Tab 3. Tabs are very useful for organizing
                    information.
                  </Text>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* 5. Skeleton */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Skeleton Loading</CardTitle>
              <CardDescription>
                Placeholder for content that is loading
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-col gap-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
              <View className='flex-row gap-2 mt-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <View className='flex-1 gap-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </View>
              </View>
            </CardContent>
          </Card>

          {/* 6. Alert */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Alert Components</CardTitle>
              <CardDescription>
                Alert messages with various variants
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-col gap-4'>
              <Alert icon={InfoIcon} variant='default'>
                <AlertTitle>Info Alert</AlertTitle>
                <AlertDescription>
                  This is an example alert with default variant for
                  displaying information.
                </AlertDescription>
              </Alert>

              <Alert icon={AlertCircleIcon} variant='destructive'>
                <AlertTitle>Error Alert</AlertTitle>
                <AlertDescription>
                  This is an example alert with destructive variant for
                  displaying errors.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 7. Avatar */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Avatar Components</CardTitle>
              <CardDescription>
                Avatar with image and fallback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className='flex-row gap-4 items-center'>
                <Avatar alt='Avatar'>
                  <AvatarImage
                    source={{ uri: "https://github.com/shadcn.png" }}
                  />
                  <AvatarFallback>
                    <Text>CN</Text>
                  </AvatarFallback>
                </Avatar>

                <Avatar className='h-12 w-12' alt='Avatar'>
                  <AvatarImage
                    source={{ uri: "https://github.com/vercel.png" }}
                  />
                  <AvatarFallback>
                    <Text>VC</Text>
                  </AvatarFallback>
                </Avatar>

                <Avatar className='h-16 w-16' alt='Avatar'>
                  <AvatarFallback>
                    <UserIcon className='h-8 w-8' />
                  </AvatarFallback>
                </Avatar>
              </View>
            </CardContent>
          </Card>

          {/* 8. Collapsible */}
          <Card className='border-0 shadow-md rounded-md dark:bg-gray-800 mt-4'>
            <CardHeader>
              <CardTitle>Collapsible Content</CardTitle>
              <CardDescription>
                Content that can be expanded and collapsed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant='outline' className='w-full justify-between'>
                    <Text>Toggle Collapsible</Text>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${
                        isCollapsibleOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-4'>
                  <View className='p-4 bg-muted rounded-md'>
                    <Text className='text-foreground mb-2 font-medium'>
                      Collapsible Content
                    </Text>
                    <Text className='text-muted-foreground'>
                      This is content that can be expanded and collapsed.
                      Very useful for FAQ, accordion, or content that
                      you want to hide by default.
                    </Text>
                    <View className='mt-3 gap-2'>
                      <Text className='text-sm text-foreground'>• Item 1</Text>
                      <Text className='text-sm text-foreground'>• Item 2</Text>
                      <Text className='text-sm text-foreground'>• Item 3</Text>
                    </View>
                  </View>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Footer spacing */}
          <View className='h-8' />
        </View>
      </ScrollView>
    </View>
  );
}
