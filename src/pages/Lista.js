import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CustomListview from '../components/CustomListview';

import api from "../services/api";
import EmptyList from '../components/EmptyList';
export default class Lista extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            repositories: []
        };
    }

    static navigationOptions = {
        title: 'GitIssues',
    };

    async componentDidMount() {
        // await AsyncStorage.clear();
        const repos = await AsyncStorage.getItem('@Store:repositories');
        if (repos) {
            this.setState({repositories: JSON.parse(repos)})
        }
    }

    render() {

        const saveRepository = async (repository) => {
            
            try {
                AsyncStorage.getItem('@Store:repositories')
                    .then((repositories) => {
                        const newRepositories = repositories ? JSON.parse(repositories) : [];
                        newRepositories.push(repository);
                    AsyncStorage.setItem('@Store:repositories', JSON.stringify(newRepositories));
                });    
            } catch (error) {
                console.log('error', error);
            }
        }

        const searchRepository = async () => {
            const response = await api.get(`/repos/${this.state.searchInput}`);
            if (response.data) {
                const { id, name, owner } = response.data;
                const newelement = {
                    id: id,
                    title: name,
                    description: owner.login,
                    image_url: owner.avatar_url
                }
                this.setState(prevState => ({
                    repositories: [...prevState.repositories, newelement]
                }));
                saveRepository(newelement);
                this.setState({searchInput : ''});
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput 
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite seu usuário no Github"
                        style={styles.search}
                        value={this.state.searchInput}
                        onChangeText={(text) => this.setState({searchInput : text})}/>
                    <TouchableOpacity
                        onPress={searchRepository}
                        style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                
                {
                    this.state.repositories.length === 0 ?
                        <EmptyList />
                    :  <CustomListview itemList={this.state.repositories} />
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    empty: {
        fontSize: 22
    },  

    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomColor: '#CCC',
        marginHorizontal: 16,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 8
    },

    search: {
        flex: 5,
        height: 46,
        marginBottom: 10,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        marginTop: 20,
        paddingHorizontal: 15,
        
    },

    searchButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchButtonText: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    
    repositoryItem: {
        backgroundColor: '#FFF',
        height: 74,
        borderRadius: 8,
        marginBottom: 20,
        marginHorizontal: 20
    }

});