import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  const searchMeals = async () => {
    const url = query.trim()
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    const res = await fetch(url);
    const data = await res.json();
    setMeals(data.meals || []);
  };

  // se ruleaza doar odata la incarcarea ecranului
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await res.json();
      setMeals(data.meals || []); // meals il seteaza cu toate retetele
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Caută o rețetă..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if (text.trim() === "") searchMeals();
        }}
        style={styles.input}
      />

      <Button title="Caută" onPress={searchMeals} />

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/explore/${item.idMeal}`)}>
            <View style={styles.card}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.name}>{item.strMeal}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderRadius: 6, padding: 8, marginBottom: 10 },
  card: {
    padding: 16,
    backgroundColor: "#fff8e1",
    marginBottom: 14,
    borderRadius: 16,
    shadowColor: "#ffa726",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ffd54f",
  },
  image: { width: "100%", height: 150, borderRadius: 12 },
  name: { marginTop: 6, fontWeight: "bold", fontSize: 16 },
});
