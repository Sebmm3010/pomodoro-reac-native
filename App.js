import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { colors } from "./src/constants";
import { Header } from "./src/components";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Text style={styles.text}>{time}</Text>
        <Header
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
          setTime={setTime}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
