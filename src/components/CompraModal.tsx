import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Alert } from 'react-native';

const CompraModal = ({ onClose, onConfirm }) => {
  const [idProducto, setIdProducto] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleConfirm = () => {
    // Convertir los valores a números
    const idNum = parseInt(idProducto, 10);
    const cantidadNum = parseInt(cantidad, 10);

    // Validar la entrada
    if (isNaN(idNum) || isNaN(cantidadNum)) {
      Alert.alert('Error', 'Por favor, ingrese valores válidos.');
      return;
    }

    if (cantidadNum <= 0) {
      Alert.alert('Error', 'La cantidad debe ser mayor que cero.');
      return;
    }

    // Si todo está bien, llamar a onConfirm y manejar la promesa
    onConfirm(idProducto, cantidad)
  .then((mensajeExito) => {
    // Si todo sale bien, muestra una alerta de éxito:
    Alert.alert('Éxito', mensajeExito);
  })
  .catch((error) => {
    // Si hay un error, muestra una alerta de error:
    Alert.alert('Error', error.message);
  });
};
  return (
    <Modal
      visible={true}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>ID del Producto:</Text>
          <TextInput
            value={idProducto}
            onChangeText={setIdProducto}
            keyboardType="numeric"
            placeholder="Ingrese el ID del producto"
            style={styles.input}
          />

          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad a comprar"
            style={styles.input}
          />

          <View style={styles.buttonGroup}>
            <Button title="Confirmar Compra" onPress={handleConfirm} />
            <Button title="Cancelar" onPress={onClose} color="#ff5c5c" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Agrega estilos aquí para mejorar la presentación del modal
import { StyleSheet } from 'react-native';
import CompraService from '../services/CompraService';

// Resto de tu código...

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CompraModal;
