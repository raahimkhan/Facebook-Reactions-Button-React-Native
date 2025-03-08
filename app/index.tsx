import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import ReactionButton from "@components/ReactionButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Index = () => {

  return (
    <SafeAreaView style={styles.rootContainer}>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <ReactionButton />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  gestureContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
