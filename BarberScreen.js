import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firebase from "../firebase";

const BarberScreen = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("schedules")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedules(data);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Horários</Text>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Data: ${item.date} | Hora: ${item.time}`}</Text>
            <Text>{`Barbeiro: ${item.barber}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default BarberScreen;
