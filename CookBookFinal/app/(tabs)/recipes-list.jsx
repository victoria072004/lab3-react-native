import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getAllRecipes, deleteRecipe } from '../../database';

export default function RecipesListScreen() {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadRecipes();
    }
  }, [isFocused]);

  const loadRecipes = async () => {
    const data = await getAllRecipes();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    loadRecipes(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rețetele mele</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
  <Text style={styles.name}>{item.title}</Text>

  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Ingrediente</Text>
    <Text style={styles.sectionText}>{item.ingredients}</Text>
  </View>

  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Instrucțiuni</Text>
    <Text style={styles.sectionText}>{item.instructions}</Text>
  </View>

  <View style={styles.deleteContainer}>
    <Button title="Șterge" onPress={() => handleDelete(item.id)} />
  </View>
</View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  padding: 16,
  backgroundColor: '#ffecadff', 
  marginBottom: 14,
  borderRadius: 16,
  shadowColor: '#e36414', 
  shadowOpacity: 0.15,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 5,
  borderWidth: 1,
  borderColor: '#e6c55aff', 
},

name: {
  fontWeight: '700',
  fontSize: 18,
  marginBottom: 10,
  color: '#333',
},

section: {
  marginBottom: 12,
  backgroundColor: '#fafafa',
  padding: 8,
  borderRadius: 8,
},

sectionTitle: {
  fontSize: 15,
  fontWeight: '600',
  marginBottom: 4,
  color: '#8d8b8bff',
},

sectionText: {
  fontSize: 14,
  lineHeight: 20,
  color: '#444',
},

deleteContainer: {
  alignItems: 'flex-start',
}
 
});