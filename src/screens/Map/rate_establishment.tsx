import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

interface NPSDialogProps {
  onClose: () => void;
  onSubmit: (score: number) => void;
}

const NPSDialog: React.FC<NPSDialogProps> = ({ onClose, onSubmit }) => {
  const [score, setScore] = useState<number | null>(null);

  const handleRating = (rating: number) => {
    setScore(rating);
  };

  const handleSubmit = () => {
    if (score !== null) {
      onSubmit(score);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How likely are you to recommend us?</Text>
      <View style={styles.ratingContainer}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.ratingButton, score === num ? styles.selected : null]}
            onPress={() => handleRating(num)}
          >
            <Text style={styles.ratingText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selected: {
    backgroundColor: '#007bff',
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NPSDialog;
