import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

const StackLayout = () => {

  const options = {
    headerShown: false
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={options}
      />
    </Stack>
  );
}

const RootLayout = () => {
  return (
    <PaperProvider>
      <StackLayout />
    </PaperProvider>
  );
};

export default RootLayout;