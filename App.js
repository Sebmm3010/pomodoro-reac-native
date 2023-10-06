import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import { Header, Timer } from "./src/components";
import { colors } from "./src/constants";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60); //Segundos en 25 minutos
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  useEffect(() => {
    let interval = null;
    if (isWorking) {
      // Correr la aplicacion.
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsWorking(false);
      switch (currentTime) {
        case 0:
          setTime(25 * 60);
          break;
        case 1:
          setTime(5 * 60);
          break;
        case 2:
          setTime(15 * 60);
          break;
        default:
          break;
      }
    }
    // Clear
    return () => clearInterval(interval);
  }, [isWorking, time]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  };

  const handleStartAndStop = () => {
    setIsWorking(!isWorking);
    playSound();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartAndStop}>
          <Text
            style={{
              color: "#eee",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: 40,
            }}
          >
            {!isWorking ? "Iniciar" : "Parar"}
          </Text>
        </TouchableOpacity>
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
    color: "#eee",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "white",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
