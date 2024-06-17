import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { username, email, firstname, lastname } = route.params || {}; // Değerlerin tanımlı olup olmadığını kontrol et
  const [newUsername, setNewUsername] = useState(username || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newFirstname, setNewFirstname] = useState(firstname || '');
  const [newLastname, setNewLastname] = useState(lastname || '');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [sportsHistory, setSportsHistory] = useState('');
  const [branch, setBranch] = useState('');

  useEffect(() => {
    if (height && weight) {
      const bmiValue = (parseFloat(weight) / (parseFloat(height) / 100) ** 2).toFixed(2);
      setBmi(bmiValue);
    }
  }, [height, weight]);

  const handleSave = async () => {
    const updatedUserData = {
      username: newUsername,
      email: newEmail,
      firstname: newFirstname,
      lastname: newLastname,
      age,
      height,
      weight,
      bmi,
      sportsHistory,
      branch
    };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
      Alert.alert('Başarılı', 'Profil bilgileriniz kaydedildi!', [
        { text: 'Tamam', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Bilgiler kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
        value={newUsername}
        onChangeText={setNewUsername}
        style={styles.input}
      />
      <Text style={styles.label}>E-posta</Text>
      <TextInput
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Ad</Text>
      <TextInput
        value={newFirstname}
        onChangeText={setNewFirstname}
        style={styles.input}
      />
      <Text style={styles.label}>Soyad</Text>
      <TextInput
        value={newLastname}
        onChangeText={setNewLastname}
        style={styles.input}
      />
      <Text style={styles.label}>Yaş</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Boy (cm)</Text>
      <TextInput
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Kilo (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Vücut Kitle Endeksi (VKİ)</Text>
      <TextInput
        value={bmi}
        editable={false}
        style={[styles.input, styles.disabledInput]}
      />
      <Text style={styles.label}>Spor Geçmişi (yıl)</Text>
      <TextInput
        value={sportsHistory}
        onChangeText={setSportsHistory}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Branş</Text>
      <TextInput
        value={branch}
        onChangeText={setBranch}
        style={styles.input}
      />
      <Button title="Kaydet" onPress={handleSave} color="#0066CC" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#eee',
  },
});

export default ProfileScreen;
