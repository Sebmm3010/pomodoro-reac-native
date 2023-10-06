import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Inicio", "Descanso corto", "Descanso largo"];

export const Header = ({ currentTime, setCurrentTime, setTime }) => {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };
  return (
    <View style={styles.container}>
      {options.map((option, i) => (
        <TouchableOpacity
          style={[
            styles.items,
            currentTime !== i && { borderColor: "transparent" },
          ]}
          onPress={() => handlePress(i)}
          key={option}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  items: {
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#eee",
    padding: 5,
    marginVertical: 20,
    borderRadius: 3,
  },
  text: {
    color: "#eee",
    fontWeight: "bold",
  },
});
