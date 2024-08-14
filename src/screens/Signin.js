import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { COLORS, FONTS, SIZES, icons} from '../constants';

const Signin = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const handleSignIn = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in:', userCredential.user);

           
            navigation.navigate('Home'); 
        } catch (error) {
            console.error('Signin error:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                    <Text style={{ color: COLORS.white, fontSize: 25, fontWeight: 'bold', marginLeft:'8%' }}> Sign In </Text>
                    <View style={{justifyContent:'center' }}>
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
                    <View style={{ marginTop: 50 }}>
                        <TouchableOpacity style={styles.signupButton} onPress={handleSignIn}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, right: 10 }}>
                            Don't Have an Account?
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                            <Text style={{ color: COLORS.secondary, fontWeight: 'bold', fontSize: 20 }}>Sign up</Text>
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
        justifyContent: 'center',
        padding: 30,
        paddingTop: 0,
        borderTopRightRadius: 150,
        borderBottomLeftRadius: 150,
    },
    input: {
        backgroundColor: COLORS.white,
        height: 43,
        marginTop: 20,
        textAlignVertical: 'center',
        width: '80%',
        justifyContent: 'space-between',
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 5,
        paddingLeft: 10,
        alignSelf:'center'

    },
    signupButton: {
        backgroundColor: COLORS.secondary,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf:'center',
        borderRadius: 10,
    },
});

export default Signin;
