import React from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import EmptyList from '../components/EmptyList';
import { isInterfaceDeclaration } from '@babel/types';

export default class Lista extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            owner: ''
        };
    }

    async componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        const owner = navigation.getParam('owner');
        
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.filter}>
                    <Text>Tela Issues aqui {owner}</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    filter: {
        backgroundColor: '#F000'
    }
});