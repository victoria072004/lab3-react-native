import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync('recipes.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL
    );
  `);

  console.log('Database initialized successfully');
  return db;
};

export const addRecipe = async (title, ingredients, instructions) => {
  if (!db) db = await SQLite.openDatabaseAsync('recipes.db');

  const result = await db.runAsync(
    'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)',
    title,
    ingredients,
    instructions
  );

  console.log('Inserted recipe with ID:', result.lastInsertRowId);
  return result.lastInsertRowId;
};

export const getAllRecipes = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('recipes.db');
  const rows = await db.getAllAsync('SELECT * FROM recipes');
  console.log('Fetched recipes:', rows);
  return rows;
};

export const deleteRecipe = async (id) => {
  if (!db) db = await SQLite.openDatabaseAsync('recipes.db');
  const result = await db.runAsync('DELETE FROM recipes WHERE id = ?', id);
  console.log('Deleted rows:', result.changes);
  return result.changes;
};
