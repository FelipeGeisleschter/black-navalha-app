import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "../firebase";

const AdminScreen = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barber, setBarber] = useState("");

  const handleSchedule = () => {
    firebase
      .firestore()
      .collection("schedules")
      .add({
        date,
        time,
        barber,
      })
      .then(() => alert("Horário marcado com sucesso!"))
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marcar Horário</Text>
      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        style={styles.input}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Hora (HH:MM)"
        style={styles.input}
        onChangeText={setTime}
      />
      <TextInput
        placeholder="Barbeiro"
        style={styles.input}
        onChangeText={setBarber}
      />
      <Button title="Marcar" onPress={handleSchedule} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default AdminScreen;
