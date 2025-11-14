import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { addRecipe } from '../../database';

export default function AddRecipeScreen() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleAdd = async () => {
    if (!title || !ingredients || !instructions) {
      Alert.alert('Eroare', 'Completează toate câmpurile!');
      return;
    }
    
    await addRecipe(title, ingredients, instructions);
    
    Alert.alert('Succes', 'Rețetă adăugată cu succes!');
    
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Nume rețetă" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Ingrediente" value={ingredients} onChangeText={setIngredients} style={styles.input} multiline />
      <TextInput placeholder="Instrucțiuni" value={instructions} onChangeText={setInstructions} style={styles.input} multiline />
      <Button title="Adaugă rețetă" onPress={handleAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderRadius: 6, padding: 8, marginBottom: 10 },
});