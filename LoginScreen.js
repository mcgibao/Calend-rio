import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet,StatusBar, SafeAreaView, } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoginPress = () => {
  if(login == "guilherme@teste.com" && senha == "123" || "vitor@teste.com" && senha == "123" || "artur@teste.com" && senha == "123" || "luis@teste.com" && senha == "123"){
    navigation.navigate('Principal');
  }
    else alert("Login ou senha incorreta");

    if(login === '' || senha === '' ){
      alert('Login incorreto');
    }
  };
  
  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <Button color='lightgreen' title="Entrar" onPress={handleLoginPress}/> 
      <Button color='lightgreen' title="Registrar" onPress={handleCadastroPress} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  
});

export default LoginScreen;
