import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Workout List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutListScreen;
