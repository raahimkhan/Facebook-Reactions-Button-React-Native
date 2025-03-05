import React from 'react';
import { Stack } from 'expo-router';

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
  return <StackLayout />;
};

export default RootLayout;