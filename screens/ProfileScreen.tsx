import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, route }: any) => {
  const { username, email, firstname, lastname } = route.params || {};
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newFirstname, setNewFirstname] = useState(firstname);
  const [newLastname, setNewLastname] = useState(lastname);

  useEffect(() => {
    if (route.params) {
      setNewUsername(route.params.username);
      setNewEmail(route.params.email);
      setNewFirstname(route.params.firstname);
      setNewLastname(route.params.lastname);
    }
  }, [route.params]);

  const handleSave = async () => {
    const updatedData = {
      username: newUsername,
      email: newEmail,
      firstname: newFirstname,
      lastname: newLastname,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedData));
      Alert.alert('Başarılı', 'Profil bilgileri güncellendi!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Hata', 'Bilgiler güncellenirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Kaydet" onPress={handleSave} color="#0066CC" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
