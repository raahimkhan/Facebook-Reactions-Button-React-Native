import {
  SafeAreaView,
  StyleSheet
} from "react-native";
import CustomButton from "@components/CustomButton";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton />
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
