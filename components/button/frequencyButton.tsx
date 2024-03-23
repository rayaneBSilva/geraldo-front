import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

interface SelectProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

const FrequencyButton: React.FC<SelectProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(title);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedTitle(option);
    onSelect(option);
    toggleOptions();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleOptions}>
        <Text style={styles.buttonText}>
          {selectedTitle} {isOpen ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelectOption(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 2,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default FrequencyButton;
