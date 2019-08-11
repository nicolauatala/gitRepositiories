import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text, Platform } from 'react-native';
import CustomRow from './CustomRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const CustomListview = ({ itemList }) => (
    
    <View style={styles.container}>
        <FlatList
            data={itemList}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({ item }) => <CustomRow
                title={item.title}
                description={item.description || item.user.login}
                image_url={item.image_url || item.user.avatar_url}
                issue={item}
            />}
        />

    </View>
);

export default CustomListview;