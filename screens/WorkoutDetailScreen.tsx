import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.workoutName}</Text>
      <Text style={styles.label}>Açıklama</Text>
      <Text style={styles.text}>{workout.description}</Text>
      <Text style={styles.label}>Tekrar</Text>
      <Text style={styles.text}>{workout.repetitions}</Text>
      <Text style={styles.label}>Süre (dk)</Text>
      <Text style={styles.text}>{workout.duration}</Text>
      
      {workout.imageUri ? (
        <Image source={{ uri: workout.imageUri }} style={styles.media} />
      ) : null}
      {workout.videoUri ? (
        <Text style={styles.mediaText}>Video: {workout.videoUri}</Text>
      ) : null}
      
      <Button title="Geri" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  mediaText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default WorkoutDetailScreen;
