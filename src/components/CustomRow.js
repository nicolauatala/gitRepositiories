import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';



const CustomRow = ({ title, description, image_url }) => (
    <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text numberOfLines={ 1 } style={styles.description}>
                {description}
            </Text>
        </View>

    </View>
);

export default CustomRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: 2
        }
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    container_text: {
        flex: 1,
        marginLeft: 12,
        height: 70,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    description: {
        fontSize: 14,
        color: '#999',
        marginTop: 4
    },
    photo: {
        marginTop: 5,
        marginLeft: 10,
        height: 55,
        width: 55,
        borderRadius: 28
    },
});