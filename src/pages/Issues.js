import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import EmptyList from '../components/EmptyList';

import CustomListview from '../components/CustomListview';
import api from "../services/api";

export default class Lista extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            issues: []
        };
    }

    async componentDidMount() {
        console.log('componentDidMount');
        const { navigation } = this.props;
        let owner = navigation.getParam('owner');
        let name = navigation.getParam('name');

        this.getIssues(owner, name);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('owner'),
        };
    }

    getIssues = async (owner, name) => {
        console.log('owner', owner);
        console.log('name', name);

        try {
            const response = await api.get(`/repos/${owner}/${name}/issues`);
            if (response) {
                console.log('response.data', response.data);
                this.setState({issues: response.data});
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.filter}>
                    <TouchableOpacity
                        style={styles.filterButton}>
                        <Text style={[styles.filterButtonText, styles.selected]}>Todas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Abertas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Fechadas</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.issues.length === 0 ?
                        <EmptyList
                            title={'0'}
                            description={'Issues here'} />
                    :  <CustomListview 
                        itemList={this.state.issues} />
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    filter: {
        flexDirection: 'row',
        backgroundColor: '#F000',
        height: 46,
        marginVertical: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },

    filterButton: {
        flex: 2,
        backgroundColor: '#d4d4d4',
        alignContent: 'center',
        justifyContent: 'center',
    },

    filterButtonText: {
        alignSelf: 'center',
        color: '#999'
    },

    selected: {
        fontWeight: 'bold',
        color: '#666'
    }
});