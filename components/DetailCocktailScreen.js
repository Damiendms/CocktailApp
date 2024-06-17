import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const DetailCocktailScreen = ({ route }) => {
    const { id } = route.params;
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                setCocktail(response.data.drinks[0]);
            } catch (error) {
                console.error("Pas de cocktail details", error);
            }
            setLoading(false);
        };
        fetchCocktailDetails();
    }, [id]);

    if (loading) return <Text>Chargement ...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{cocktail.strDrink}</Text>
            <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
            <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {Object.keys(cocktail)
                .filter(key => key.startsWith('strIngredient') && cocktail[key])
                .map(key => (
                    <Text key={key} style={styles.ingredient}>{cocktail[key]}</Text>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    instructions: {
        fontSize: 16,
        marginTop: 10,
    },
    ingredientsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    ingredient: {
        fontSize: 16,
    },
});

export default DetailCocktailScreen;
