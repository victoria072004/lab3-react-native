import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../database';

export default function Layout() {
  useEffect(() => {
    (async () => {
      await initDatabase();
    })();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="add-recipe" options={{ title: 'Add Recipe' }} />
      <Tabs.Screen name="recipes-list" options={{ title: 'My Recipes' }} />
    </Tabs>
  );
}