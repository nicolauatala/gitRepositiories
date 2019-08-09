import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function functionEmptyList() {

    return (
        <View style={styles.container}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.descriptionText}>No repository added : (</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },

    plus: {
        alignSelf: 'center',
        fontSize: 64,
        fontWeight: 'bold',
        color: '#666'
    },

    descriptionText: {
        alignSelf: 'center',
        color: '#999'
    }
})