import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import reservaService from '../services/ReservaService';

const MiComponente = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  // Suponiendo que tengas un ID de reserva y una cantidad a vender definidos,
  // por ejemplo, podrían ser parte del estado o podrían venir de props.
  const [idDeLaReserva, setIdDeLaReserva] = useState(null);
  const [cantidadAVender, setCantidadAVender] = useState(0);

  const handleVenta = async () => {
    if (idDeLaReserva && cantidadAVender) {
      const ventaExitosa = await reservaService.venderProducto(idDeLaReserva, cantidadAVender);
      if (!ventaExitosa) {
        setModalVisible(true); // Mostrar modal si no hay suficiente stock
      }
      // Aquí puedes manejar lo que sucede si la venta es exitosa
    }
  };

  return (
    <View>
      {/* Aquí va el resto de tu UI */}
      <Button title="Realizar Venta" onPress={handleVenta} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>No hay suficiente stock para la venta.</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MiComponente;
