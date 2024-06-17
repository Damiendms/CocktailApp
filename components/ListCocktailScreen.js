import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ListCocktailScreen = ({ navigation }) => {
    const [cocktails, setCocktails] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCocktails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
            setCocktails(prevCocktails => [...prevCocktails, ...response.data.drinks]);
        } catch (error) {
            console.error("Pas de cocktail", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCocktails();
    }, [page]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailCocktailScreen', { id: item.idDrink })}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                <Text style={styles.title}>{item.strDrink}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={cocktails}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink.toString()}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <Text>Loading...</Text>}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontSize: 18,
        marginLeft: 10,
        alignSelf: 'center',
    },
});

export default ListCocktailScreen;
