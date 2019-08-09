import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import CustomListview from '../components/CustomListview';

export default class Lista extends React.Component {

    getData() {
        return [
          {
            key: 1, title: 'Albert Einstein',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png'
          },
          {
            key: 2,
            title: 'Isaac newton',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
          },
        ];
    }

    static navigationOptions = {
        title: 'GitIssues',
    };
    render() {
        const {navigate} = this.props.navigation;

        return (
            <SafeAreaView style={styles.container}>
                <CustomListview
                itemList={this.getData()}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    
    repositoryItem: {
        backgroundColor: '#FFF',
        height: 74,
        borderRadius: 8,
        marginBottom: 20,
        marginHorizontal: 20
    }

});