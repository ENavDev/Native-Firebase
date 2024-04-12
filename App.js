import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgrjCk3gNJPIyDrePsULHFOj5ATJmvSf8",
  authDomain: "tareamoviles-5fa22.firebaseapp.com",
  projectId: "tareamoviles-5fa22",
  storageBucket: "tareamoviles-5fa22.appspot.com",
  messagingSenderId: "515047937070",
  appId: "1:515047937070:web:17608bb259983e4350bbbf",
  measurementId: "G-MVCB2KGXKL",
  databaseURL: "https://console.firebase.google.com/u/0/project/tareamoviles-5fa22/database/tareamoviles-5fa22-default-rtdb/data/~2F?hl=es-419"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default function App() {

  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  // Example usage of writeUserData
  writeUserData('123', 'John Doe', 'john.doe@example.com', 'jotchua.jpg');

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
