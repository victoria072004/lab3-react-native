import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function MealDetails() {
  const { id } = useLocalSearchParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setMeal(data.meals[0]);
    })();
  }, [id]);

  if (!meal) return <Text>Se încarcă...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.section}>Instrucțiuni:</Text>
      <Text>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 250, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  section: { fontWeight: '600', fontSize: 18, marginVertical: 5 },
});