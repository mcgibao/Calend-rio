import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';


const CadastroScreen = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleCadastro = () => {
    if (senha !== confirmacaoSenha) {
      alert('As senhas não coincidem.');
      return;
    } 
    if(senha === '' || nome === '' || email === ''){
      alert('Cadastro incorreto');
    }
   localStorage.setItem('usuario',email);
   localStorage.setItem('senha',senha);
   localStorage.setItem('nome',nome);
   alert('Cadastrado com sucesso')
   navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={(text) => setSenha(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmação de Senha"
        value={confirmacaoSenha}
        onChangeText={(text) => setConfirmacaoSenha(text)}
        secureTextEntry={true}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
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
  input: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default CadastroScreen;
