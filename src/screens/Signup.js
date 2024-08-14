import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../constants';

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            console.log('User signed up:', userCredential.user);
          
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <View style={{ height: '15%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.primary, fontStyle: 'italic', fontSize: 35, fontWeight: 'bold' }}>Pocket Pulse </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <View>
                            <Text style={{ color: COLORS.white, fontSize: 25, fontWeight: 'bold' }}> Sign Up </Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Name'
                                    value={name}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Email'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Password'
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, right: 10 }}>
                            Already Have an Account?
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Signin') }}>
                            <Text style={{ color: COLORS.secondary, fontWeight: 'bold', fontSize: 20 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '85%',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 0,
        borderTopRightRadius: 150,
        borderBottomLeftRadius: 150,
    },
    title: {},
    input: {
        backgroundColor: COLORS.white,
        height: 43,
        marginTop: 20,
        textAlignVertical: 'center',
        width: 250,
        justifyContent: 'space-between',
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 5,
        paddingLeft: 10

    },
    signupButton: {
        backgroundColor: COLORS.secondary,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
});

export default Signup;
