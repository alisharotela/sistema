import * as React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

export const FilterModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </View>
  );
};
