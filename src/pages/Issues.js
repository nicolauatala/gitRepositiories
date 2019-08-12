import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import EmptyList from '../components/EmptyList';

import CustomListview from '../components/CustomListview';
import api from "../services/api";

export default class Lista extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            filterList: [],
            filter: false
        };
    }

    async componentDidMount() {
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
        try {
            const response = await api.get(`/repos/${owner}/${name}/issues?per_page=100&state=all`);
            if (response) {
                this.setState({issues: response.data});
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    filterList(filter) {
        switch (filter){
            case 'abertas': {
                this.setState({filterList: this.state.issues.filter(issue => issue.state === 'open')});
                this.setState({filter: true});
                break;
            }
            case 'fechadas': {
                this.setState({filterList: this.state.issues.filter(issue => issue.state === 'closed')});
                this.setState({filter: true});
                break;
            }
            default: {
                this.setState({filter: false});
                break
            }
        }
    }


    render() {

        onClickItem = (title, description, issue) => {
            if (issue.html_url) {
                Linking.openURL(issue.html_url).catch((err) => console.error('An error occurred', err));
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.filter}>
                    <TouchableOpacity
                        onPress={() => this.filterList('todas')}
                        style={styles.filterButton}>
                        <Text style={[styles.filterButtonText, styles.selected]}>Todas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.filterList('abertas')}
                        style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Abertas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.filterList('fechadas')}
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
                        itemList={this.state.filter ? this.state.filterList : this.state.issues} />
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