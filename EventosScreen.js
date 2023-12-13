import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MeuCalendario = () => {
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [novoEvento, setNovoEvento] = useState('');
  const [horaEvento, setHoraEvento] = useState('');
  const [eventos, setEventos] = useState({});
  const [eventosModalVisible, setEventosModalVisible] = useState(false);

  const handleDataPress = (data) => {
    setDataSelecionada(data.dateString);
  };
  const formatarData = (data) => {
    const date = new Date(data);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const formatarHora = (hora) => {
    const horaFormatada = hora.replace(/\D/g, '').replace(/^(\d{0,2})/, '$1:');
    setHoraEvento(horaFormatada);
  };

  const adicionarEvento = () => {
    if (novoEvento.trim() !== '' && horaEvento.trim() !== '') {
      const novoEventoObj = {
        id: Date.now(),
        evento: novoEvento,
        hora: horaEvento,
      };
      const novosEventos = {
        ...eventos,
        [dataSelecionada]: [...(eventos[dataSelecionada] || []), novoEventoObj],
      };
      setEventos(novosEventos);
      setNovoEvento('');
      setHoraEvento('');
      setModalVisible(false);
    }
  };

  const excluirEvento = (evento) => {
    const eventosAtualizados = eventos[dataSelecionada].filter((item) => item.id !== evento.id);
    setEventos({ ...eventos, [dataSelecionada]: eventosAtualizados });
  };

  const toggleEventosModal = () => {
    setEventosModalVisible(!eventosModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar
        onDayPress={(day) => handleDataPress(day)}
        markedDates={{
          [dataSelecionada]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      {dataSelecionada && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginTop: 20, backgroundColor: 'lightblue', padding: 10, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 16 }}>Adicionar Evento</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={toggleEventosModal}
        style={{ marginTop: 20, backgroundColor: 'lightgreen', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ fontSize: 16 }}>Eventos</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <TextInput
              placeholder="Digite o evento"
              value={novoEvento}
              onChangeText={(texto) => setNovoEvento(texto)}
              style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
            />
            <TextInput
              placeholder="Digite a hora do evento (HH:MM)"
              value={horaEvento}
              onChangeText={(texto) => formatarHora(texto)}
              keyboardType="numeric"
              style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
            />
            <Button title="Adicionar Evento" onPress={adicionarEvento} />
            <Button title="Cancelar" onPress={() => {
              setModalVisible(false);
              setNovoEvento('');
              setHoraEvento('');
            }} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={eventosModalVisible}
        onRequestClose={() => {
          setEventosModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Eventos</Text>
            {Object.keys(eventos).map((data) => (
              <View key={data}>
                <Text>{formatarData(data)}</Text>
                <FlatList
                  data={eventos[data]}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <Text>{item.evento}</Text>
                        <Text>{item.hora}</Text>
                      </View>
                      {index !== eventos[data].length - 1 && (
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 5 }} />
                      )}
                    </View>
                  )}
                />
              </View>
            ))}
            <Button title="Fechar" onPress={toggleEventosModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeuCalendario;