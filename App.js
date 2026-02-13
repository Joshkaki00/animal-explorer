import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './store';
import AnimalListScreen from './screens/AnimalListScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { setFavorites } from './features/animals/animalsSlice';

const Tab = createBottomTabNavigator();

/**
 * RootNav is separated so we can use hooks (dispatch/select) after Provider.
 */
function RootNav() {
  // NOTE: In Signpost 7 you will hydrate favorites here.
  // TODO (Signpost 7): load favorites from AsyncStorage and dispatch(setFavorites(...))
  // Hint:
  // React.useEffect(() => {
  //   const load = async () => {
  //     const stored = await AsyncStorage.getItem('favorites');
  //     if (stored) dispatch(setFavorites(JSON.parse(stored)));
  //   };
  //   load();
  // }, []);

  const favoritesCount = useSelector((state) => state.animals.favorites.length);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              Explore: focused ? 'paw' : 'paw-outline',
              Favorites: focused ? 'heart' : 'heart-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Explore" component={AnimalListScreen} />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            // Optional badge: show count when > 0
            tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RootNav />
    </Provider>
  );
}