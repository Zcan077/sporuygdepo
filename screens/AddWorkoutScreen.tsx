import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddWorkoutScreen = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [duration, setDuration] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri);
    }
  };

  const handleSave = async () => {
    const newWorkout = {
      workoutName,
      description,
      repetitions,
      duration,
      imageUri,
      videoUri,
    };

    try {
      const existingWorkouts = await AsyncStorage.getItem('workouts');
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(newWorkout);
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      Alert.alert('Başarılı', 'Antreman kaydedildi!', [
        { text: 'Tamam', onPress: () => navigation.navigate('WorkoutList') }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Antreman kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Antreman Adı</Text>
      <TextInput
        value={workoutName}
        onChangeText={setWorkoutName}
        style={styles.input}
      />
      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text style={styles.label}>Tekrar</Text>
      <TextInput
        value={repetitions}
        onChangeText={setRepetitions}
        keyboardType='numeric'
        style={styles.input}
      />
      <Text style={styles.label}>Süre (dk)</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        keyboardType='numeric'
        style={styles.input}
      />

      <View style={styles.mediaContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.mediaBox}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.media} />
          ) : (
            <Text style={styles.mediaText}>Resim Ekle</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={pickVideo} style={styles.mediaBox}>
          {videoUri ? (
            <Text style={styles.mediaText}>Video Seçildi</Text>
          ) : (
            <Text style={styles.mediaText}>Video Ekle</Text>
          )}
        </TouchableOpacity>
      </View>

      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mediaBox: {
    width: '48%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  mediaText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddWorkoutScreen;
