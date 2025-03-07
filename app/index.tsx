import {
  SafeAreaView,
  StyleSheet
} from "react-native";
import ReactionButton from "@components/ReactionButton";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ReactionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
