import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';

const MasterLayout = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>App Header</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>App Footer</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 60,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    headerText: {
        fontSize: 20,
    },
    content: {
        flex: 1,
    },
    footer: {
        height: 50,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#dedede'
    },
    footerText: {
        fontSize: 16,
    }
});

export default MasterLayout;
 