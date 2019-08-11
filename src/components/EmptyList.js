import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const functionEmptyList = ({title, description}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.plus}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
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
});

export default functionEmptyList;

