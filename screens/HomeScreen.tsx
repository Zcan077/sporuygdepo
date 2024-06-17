import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Profil" onPress={() => navigation.navigate('Profile')} />
      <Button title="Antremanlar" onPress={() => navigation.navigate('WorkoutList')} />
      <Button title="Antreman Ekle" onPress={() => navigation.navigate('AddWorkout')} />
      <Button title="Beslenme" onPress={() => Alert.alert('Beslenme', 'Bu özellik henüz eklenmedi.')} />
      <Button title="Bülten" onPress={() => Alert.alert('Bülten', 'Bu özellik henüz eklenmedi.')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
