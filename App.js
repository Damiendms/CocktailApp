import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ListCocktailScreen from './components/ListCocktailScreen';
import DetailCocktailScreen from './components/DetailCocktailScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Accueil" component={HomeScreen} options={{ title: 'Accueil' }} />
                <Stack.Screen name="DetailCocktailScreen" component={DetailCocktailScreen} options={{ title: 'DetailCocktail' }} />
                <Stack.Screen name="ListCocktailScreen" component={ListCocktailScreen} options={{ title: 'ListCocktail' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
