import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalTester from '../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CategoryScreens} from '../components/CategoryScreens'
const categories = [
    { name: 'Groceries', icon: 'cart' },
    { name: 'Transportation', icon: 'bus' },
    { name: 'Dining', icon: 'restaurant' },
    { name: 'Entertainment', icon: 'game-controller' },
    { name: 'Utilities', icon: 'flash' },
    { name: 'Others', icon: 'infinite' },
];

const HomeScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const toggleModal = () => {
        setModalVisible(true);
    };
    const onClose = () => {
        setModalVisible(false);
    };

    const fetchExpenses = async () => {
        try {
            const storedExpenses = await AsyncStorage.getItem('expenses');
            if (storedExpenses) {
                setExpenses(JSON.parse(storedExpenses));
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity  style={styles.categoryItem} onPress={() => navigation.navigate('CategoryScreens')}>
            <Icon name={item.icon} size={30} color="gray" />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderExpenseItem = ({ item }) => (
        <View style={{ backgroundColor: '#0B5345', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{item.Expensecategory}</Text>
            <View style={{ alignItems: item.category == 'Debit' ? 'center' : 'flex-end', flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>$ {item.amount}</Text>
            </View>
           
        </View>

    );


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pocket Pulse</Text>
            </View>

            <View style={{ paddingHorizontal: 10, backgroundColor: '#0B5345' }}>

                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.categoryList}
                    numColumns={2}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: '#0B5345' }}>
                <Text style={styles.headings}>
                    Expense Name
                </Text>

                <Text style={styles.headings}>
                    Debits
                </Text>
                <Text style={styles.headings}>
                    Credits
                </Text></View>
            <View style={{ flex: 1, padding: 5,backgroundColor: '#0B5345' }}>
                {expenses.length > 0 && (
                    <FlatList
                        data={expenses}
                        renderItem={renderExpenseItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.addButtonText}>Add Expense</Text>
            </TouchableOpacity>
            <ModalTester isVisible={isModalVisible} onClose={onClose} onAddExpense={fetchExpenses} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        height: 40,
        backgroundColor: '#4E9F4D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    categoryList: {
        paddingVertical: 10,
        
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 5,
        borderRadius: 5,
        elevation: 3,
        height:80,
        width:"70%"
    },
    addButton: {
        backgroundColor: '#0B5345',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryName: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
    },
    expenseItem: {


    },
    headings: {
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#0B5345',
        borderRadius: 2,

    }
});

export default HomeScreen;
